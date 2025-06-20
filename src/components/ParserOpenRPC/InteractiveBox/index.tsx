import React, { useContext, useEffect, useRef, useState } from 'react'
import Form from '@rjsf/core'
import clsx from 'clsx'
import { RJSFSchema, UiSchema, RegistryWidgetsType, RegistryFieldsType } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import $RefParser from '@apidevtools/json-schema-ref-parser'
import {
  MethodExample,
  MethodParam,
  SchemaComponents,
} from '@site/src/components/ParserOpenRPC/interfaces'
import styles from './styles.module.scss'
import global from '../global.module.scss'
import { BaseInputTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate'
import { ArrayFieldTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/ArrayFieldTemplate'
import { ObjectFieldTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/ObjectFieldTemplate'
import { ConditionalField } from '@site/src/components/ParserOpenRPC/InteractiveBox/fields/ConditionalField'
import { DropdownWidget } from '@site/src/components/ParserOpenRPC/InteractiveBox/widgets/DropdownWidget'
import { SelectWidget } from '@site/src/components/ParserOpenRPC/InteractiveBox/widgets/SelectWidget'
import { Tooltip } from '@site/src/components/Tooltip'
import { useColorMode } from '@docusaurus/theme-common'
import { ParserOpenRPCContext } from '@site/src/components/ParserOpenRPC'
import { MetamaskProviderContext } from '@site/src/theme/Root'
import * as isPlainObject from 'lodash.isplainobject'
import * as camelCase from 'lodash.camelcase'
import { RemoveButton } from '@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/RemoveButton'
import { AddButton } from '@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/AddButton'
import ClearIcon from '@site/static/img/icons/clear-icon.svg'
import ResetIcon from '@site/static/img/icons/reset-icon.svg'
import SubmitIcon from '@site/static/img/icons/submit-icon.svg'
import { WrapIfAdditionalTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/WrapIfAdditionalTemplate'

interface InteractiveBoxProps {
  params: MethodParam[]
  components: SchemaComponents
  examples: MethodExample[]
  onParamChange: (data) => void
  drawerLabel?: string | null
  closeComplexTypeView?: () => void
  isOpen?: boolean
  onModalClose?: () => void
}

type ObjectType = { [key: string]: any }
type KeyOrderType = { name: string }

function sortObjectKeysByArray(obj: ObjectType, orderArray: KeyOrderType[]): ObjectType {
  const result: ObjectType = {}
  for (const { name } of orderArray) {
    if (name in obj) {
      result[name] = obj[name]
    }
  }
  return result
}

function removeEmptyStrings(obj) {
  for (const key in obj) {
    if (obj[key] === '') {
      delete obj[key]
    }
  }
  return obj
}

function removeEmptyArrays(obj: any, params: any[]) {
  const newObj = JSON.parse(JSON.stringify(obj))
  for (const key in newObj) {
    const currentParam = params.find(item => item.name === key)
    if (newObj.hasOwnProperty(key)) {
      if (!Array.isArray(newObj[key]) && typeof newObj[key] === 'object') {
        newObj[key] = removeEmptyStrings(newObj[key])
      }
      if (currentParam && currentParam.required) {
        return newObj
      }
      if (Array.isArray(newObj[key]) && newObj[key].length === 0) {
        delete newObj[key]
      } else if (newObj[key] !== null && typeof newObj[key] === 'object') {
        newObj[key] = removeEmptyArrays(newObj[key], params)
      }
    }
  }
  return newObj
}

export default function InteractiveBox({
  params,
  components,
  examples,
  onParamChange,
  drawerLabel,
  closeComplexTypeView,
  isOpen = false,
  onModalClose,
}: InteractiveBoxProps) {
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(null)
  const [defaultFormData, setDefaultFormData] = useState<any>({})
  const [currentFormData, setCurrentFormData] = useState<any>({})
  const [isFormReseted, setIsFormReseted] = useState(false)
  const [currentSchemaId, setCurrentSchemaId] = useState('')
  const [objectPropertyBeforeEdit, setObjectPropertyBeforeEdit] = useState(null)
  const [objectValueBeforeEdit, setObjectValueBeforeEdit] = useState(null)
  const formRef = useRef(null)
  const { colorMode } = useColorMode()
  const { isComplexTypeView } = useContext(ParserOpenRPCContext)
  const { metaMaskAccount } = useContext(MetamaskProviderContext)
  const addWalletId = propName => ({ [propName]: metaMaskAccount })
  const getObjectWithAddress = value => {
    const addressField = 'address'
    const fromField = 'from'
    if (Object.keys(value).includes(addressField)) {
      return {
        ...value,
        ...addWalletId(addressField),
      }
    }
    if (Object.keys(value).includes(fromField)) {
      return {
        ...value,
        ...addWalletId(fromField),
      }
    }
    return value
  }

  const checkName = (name: string) => {
    if (name === 'requestPermissionObject') return 'requestPermissionsObject'
    return name.trim().split(/\s+/).length > 1 ? camelCase(name) : name
  }

  useEffect(() => {
    if (examples && examples.length > 0 && examples[0].params) {
      const defaultValues = Object.fromEntries(
        examples[0].params.map(({ name, value }) => {
          if (metaMaskAccount) {
            if (name === 'Address' || name === 'From') {
              return [checkName(name), metaMaskAccount]
            }
            if (isPlainObject(value)) {
              return [checkName(name), getObjectWithAddress(value)]
            }
          }
          if (isPlainObject(value)) {
            return [
              checkName(name),
              Object.fromEntries(
                Object.entries(value).map(([key, val]) => [
                  key,
                  isPlainObject(val) && val?.description ? val.value : val,
                ])
              ),
            ]
          }
          return [checkName(name), value]
        })
      )
      setDefaultFormData({ ...defaultValues })
      setCurrentFormData({ ...defaultValues })
      onParamChange({ ...defaultValues })
    }
  }, [examples, metaMaskAccount])

  // ---------------- CHECKPOINT 1 ----------------
  // Build the schema that will be supplied to RJSF.
  // If a parameter schema contains `patternProperties` but does not explicitly
  // allow additional properties, we inject `additionalProperties: true` so that
  // RJSF`s `canExpand` helper recognises it as dynamic and enables the "Add" UI.
  const schema: RJSFSchema = {
    components: {
      schemas: components,
    },
    type: 'object',
    // @ts-ignore – the OpenRPC param list isn't strictly typed for RJSF here.
    properties: Object.fromEntries(
      params.map(({ name, schema }) => {
        let patchedSchema: any = { ...schema }
        if (patchedSchema.patternProperties && patchedSchema.additionalProperties === undefined) {
          // Attempt to infer a sensible schema for additional properties. If the
          // sole patternProperty specifies an object, default to object {}; otherwise fallback to string.
          let inferredAdditional: any = { type: 'string', default: 'New Value' }
          const singlePattern: any = Object.values(patchedSchema.patternProperties)[0]
          if (singlePattern && singlePattern.type === 'object') {
            inferredAdditional = { type: 'object', default: {} }
          }
          patchedSchema = { ...patchedSchema, additionalProperties: inferredAdditional }
        }
        return [name, patchedSchema]
      })
    ),
  }

  // Dev-time visibility: print the schema before dereferencing so we can track
  // whether `additionalProperties` was injected as expected.
  /* eslint-disable no-console */
  console.debug('[Checkpoint Ⓐ] Initial schema passed to $RefParser', schema)
  /* eslint-enable no-console */
  const uiSchema: UiSchema = {
    'ui:globalOptions': {
      label: false,
    },
    'ui:widget': 'checkbox',
  }
  const templates = {
    BaseInputTemplate,
    ArrayFieldTemplate,
    WrapIfAdditionalTemplate,
    ObjectFieldTemplate,
    FieldErrorTemplate: () => null,
    ErrorListTemplate: () => null,
    ButtonTemplates: { AddButton, RemoveButton },
  }
  const widgets: RegistryWidgetsType = {
    CheckboxWidget: DropdownWidget,
    SelectWidget: SelectWidget,
  }
  const fields: RegistryFieldsType = {
    // @ts-ignore
    AnyOfField: ConditionalField,
    // @ts-ignore
    OneOfField: ConditionalField,
  }
  const handleResetForm = e => {
    e.preventDefault()
    setCurrentFormData({ ...defaultFormData })
    onParamChange({ ...defaultFormData })
    setIsFormReseted(true)
  }
  const handleClearForm = e => {
    e.preventDefault()
    if (formRef) {
      formRef?.current?.reset()
    }
  }
  const handleSubmitAndClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onParamChange(currentFormData)
    if (isComplexTypeView) {
      closeComplexTypeView()
    } else {
      onModalClose?.()
    }
  }
  const isLightTheme = colorMode === 'light'

  useEffect(() => {
    const dereferenceSchema = async () => {
      try {
        if (schema) {
          const deref = (await $RefParser.dereference(schema)) as RJSFSchema
          /* eslint-disable no-console */
          console.debug('[Checkpoint Ⓑ] Dereferenced schema ready for RJSF', deref)
          /* eslint-enable no-console */
          setParsedSchema(deref)
        }
      } catch (error) {
        console.error('Error of parsing schema:', error)
      }
    }
    dereferenceSchema()
  }, [])

  const onChangeHandler = data => {
    /* eslint-disable no-console */
    console.debug('[EVENT] onChange', { time: Date.now(), incoming: data.formData })
    /* eslint-enable no-console */

    // Keep raw form data during typing to preserve focus
    setCurrentFormData(data.formData)
  }

  const handleBlur = () => {
    /* eslint-disable no-console */
    console.debug('[EVENT] onBlur – cleaning & propagating', { time: Date.now() })
    /* eslint-enable no-console */

    const cleaned = removeEmptyArrays(currentFormData, params)
    setCurrentFormData(cleaned)
    onParamChange(cleaned)
  }

  const cloneAndSetNullIfExists = (obj, key) => {
    if (typeof obj !== 'object' || obj === null) return obj
    const newObj = Array.isArray(obj) ? [] : {}
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === key) {
          newObj[prop] = []
        } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          newObj[prop] = cloneAndSetNullIfExists(obj[prop], key)
        } else {
          newObj[prop] = obj[prop]
        }
      }
    }
    return newObj
  }

  const cloneObjectAndSetNullIfExists = (obj, key) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    let newObj = {}
    if (Object.keys(obj).length >= 1) {
      newObj = objectValueBeforeEdit
    } else {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (Object.keys(obj).length === 0) {
            newObj[prop] = {}
          } else if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            newObj[objectPropertyBeforeEdit] = cloneObjectAndSetNullIfExists(obj[prop], key)
          } else {
            newObj[prop] = obj[prop]
          }
        }
      }
    }
    return newObj
  }

  const handleCancelClick = () => {
    if (drawerLabel) {
      const currentKey = Object.keys(currentFormData)[0]
      if (objectPropertyBeforeEdit && currentKey) {
        const upData = cloneObjectAndSetNullIfExists(
          currentFormData[currentKey],
          objectPropertyBeforeEdit
        )
        setCurrentFormData({ [currentKey]: upData })
        setObjectPropertyBeforeEdit(null)
        setObjectValueBeforeEdit(null)
      } else {
        const upData = cloneAndSetNullIfExists(currentFormData, drawerLabel)
        setCurrentFormData(upData)
      }
    }
    closeComplexTypeView()
  }

  // DEV: trace each render of InteractiveBox to diagnose unintentional remounts
  /* eslint-disable no-console */
  console.debug('[RENDER] InteractiveBox', {
    time: Date.now(),
    isComplexTypeView,
    drawerLabel,
  })
  /* eslint-enable no-console */

  return parsedSchema ? (
    <>
      <div className={styles.tableHeadingRow}>
        <div className={clsx(styles.tableHeadingColumn, 'font-weight-medium')}>Parameter</div>
        <div className={clsx(styles.tableHeadingColumn, 'font-weight-medium')}>Value</div>
      </div>
      <Form
        schema={parsedSchema}
        formData={currentFormData}
        formContext={{
          currentSchemaId,
          isFormReseted,
          setCurrentSchemaId,
          objectPropertyBeforeEdit,
          setObjectPropertyBeforeEdit,
          setObjectValueBeforeEdit,
          currentFormData,
          setCurrentFormData,
          onParamChange,
        }}
        validator={validator}
        liveValidate={isOpen}
        noHtml5Validate
        onChange={onChangeHandler}
        onBlur={handleBlur}
        templates={templates}
        uiSchema={uiSchema}
        widgets={widgets}
        ref={formRef}
        fields={fields}>
        <div
          className={clsx(
            styles.tableFooterRow,
            isLightTheme ? styles.tableFooterRowLight : styles.tableFooterRowDark
          )}>
          <div className={clsx(styles.footerButtons, styles.footerButtonsLeft)}>
            <Tooltip message="Reset fields">
              <button className={styles.footerButtonLeft} onClick={handleResetForm}>
                <ResetIcon className={styles.footerButtonIcon} />
              </button>
            </Tooltip>
            <Tooltip message="Clear fields">
              <button className={styles.footerButtonLeft} onClick={handleClearForm}>
                <ClearIcon className={styles.footerButtonIcon} />
              </button>
            </Tooltip>
            <Tooltip message="Submit and close">
              <button className={styles.footerButtonLeft} onClick={handleSubmitAndClose}>
                <SubmitIcon className={styles.footerButtonIcon} />
              </button>
            </Tooltip>
          </div>
          {isComplexTypeView ? (
            <div className={clsx(styles.footerButtons)}>
              <button
                className={clsx(
                  global.secondaryBtn,
                  styles.footerButtonRight,
                  styles.footerButtonRightOutline
                )}
                onClick={handleCancelClick}>
                Cancel
              </button>
              <button
                className={clsx(global.primaryBtn, styles.footerButtonRight)}
                onClick={handleSubmitAndClose}>
                Save
              </button>
            </div>
          ) : null}
        </div>
      </Form>
    </>
  ) : null
}

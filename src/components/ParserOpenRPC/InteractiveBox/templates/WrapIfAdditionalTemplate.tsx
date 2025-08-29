import { useContext, useEffect } from 'react'
import { ADDITIONAL_PROPERTY_FLAG } from '@rjsf/utils'
import { BaseInputTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate'
import { ParserOpenRPCContext } from '@site/src/components/ParserOpenRPC'
import * as isPlainObject from 'lodash.isplainobject'

export const WrapIfAdditionalTemplate = props => {
  const {
    id,
    classNames,
    style,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    schema,
    children,
    registry,
    formContext,
    formData,
  } = props
  const { templates } = registry
  const { RemoveButton } = templates.ButtonTemplates
  const additional = ADDITIONAL_PROPERTY_FLAG in schema
  const { drawerLabel, isComplexTypeView, setIsComplexTypeView, setDrawerLabel } =
    useContext(ParserOpenRPCContext)
  const { currentSchemaId, setCurrentSchemaId } = formContext
  const onRemoveButtonClick = () => {
    if (isPlainObject(formData) && Object.keys(formData).length === 0) {
      setIsComplexTypeView(false)
      setDrawerLabel(null)
    }
  }

  if (!additional) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    )
  }

  useEffect(() => {
    if (!id.includes('_newKey')) {
      setCurrentSchemaId(id)
    }
  }, [])

  if (!id.includes(currentSchemaId)) {
    return null
  }

  return isComplexTypeView ? (
    <div className={classNames} style={style}>
      {drawerLabel === label && (
        <div>
          <div onClick={onRemoveButtonClick}>
            <RemoveButton
              disabled={disabled || readonly}
              onClick={onDropPropertyClick(label)}
              registry={registry}
            />
          </div>
          {/* @ts-ignore */}
          <BaseInputTemplate
            name="key"
            onChange={target => {
              onKeyChange(target)
              setDrawerLabel(target)
            }}
            schema={{ ...schema, ...{ type: 'string' } }}
            formContext={formContext}
            value={label}
          />
        </div>
      )}
      <div>{children}</div>
    </div>
  ) : null
}

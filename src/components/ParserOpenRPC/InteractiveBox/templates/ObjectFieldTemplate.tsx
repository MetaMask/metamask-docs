import React, { useContext, useState } from 'react'
import { canExpand } from '@rjsf/utils'
import { AddButton } from '@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/AddButton'
import styles from '@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.scss'
import clsx from 'clsx'
import { ParserOpenRPCContext } from '@site/src/components/ParserOpenRPC'
import { BaseInputTemplate } from '@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate'

export const ObjectFieldTemplate = props => {
  const { formData, formContext, idSchema, onAddClick, properties, schema, uiSchema } = props
  const [customFormData, setCustomFormData] = useState(formData)
  // Detect "dynamic" objects (patternProperties + additionalProperties) at runtime instead of relying on hard-coded IDs
  const isDynamicObject = schema?.additionalProperties === true
  const { isComplexTypeView, drawerLabel, setDrawerLabel, setIsComplexTypeView } =
    useContext(ParserOpenRPCContext)
  const {
    currentSchemaId,
    setCurrentSchemaId,
    setObjectPropertyBeforeEdit,
    setObjectValueBeforeEdit,
    currentFormData,
    setCurrentFormData,
    onParamChange,
  } = formContext
  const addNewObject = (name, schemaId) => {
    setIsComplexTypeView(true)
    setDrawerLabel(name)
    setCurrentSchemaId(schemaId)
    setObjectPropertyBeforeEdit(name)
    setObjectValueBeforeEdit(formData)
  }

  if (
    isComplexTypeView &&
    idSchema?.$id === currentSchemaId &&
    currentSchemaId.includes('root_TypedData_') &&
    true
  ) {
    const objectEntries = Object.entries(formData)
    return (
      <>
        {objectEntries.map(array => {
          const name = array[0]
          const value = array[1]
          if (typeof value === 'string' || typeof value === 'number') {
            const baseInputProps = {
              ...props,
              name,
              value,
              schema: {
                type: typeof value,
              },
            }
            return (
              <BaseInputTemplate
                {...baseInputProps}
                formData={customFormData}
                key={name}
                onChange={(val: number | string) => {
                  const newData = {
                    ...currentFormData,
                    TypedData: {
                      ...currentFormData.TypedData,
                      [`${drawerLabel}`]: { ...formData, [`${name}`]: val },
                    },
                  }
                  setCustomFormData({ ...formData, [`${name}`]: val })
                  setCurrentFormData(newData)
                  onParamChange(newData)
                }}
              />
            )
          }
          if (typeof value === 'object') {
            return (
              <div className={styles.tableRow} key={name}>
                <div className={styles.tableColumn}>
                  <label className={styles.tableColumnParam}>
                    <span>{name}</span>
                  </label>
                </div>
                <div className={styles.tableColumn}>
                  <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
                    <div className={styles.arrayFormDataWrap}>
                      {formData
                        ? JSON.stringify(
                            Object.fromEntries(
                              Object.entries(formData).filter(([key]) => key.includes(name))
                            ),
                            null,
                            ' '
                          )
                        : ''}
                    </div>
                    <span
                      className={clsx(styles.tableColumnType, styles.tableColumnTypeDropdown)}
                      onClick={() => addNewObject(name, idSchema?.$id)}>
                      <span className={styles.dropdown}>
                        {schema.type}
                        <span
                          className={clsx(
                            styles.tableColumnIcon,
                            styles.chevronIcon,
                            styles.chevronIconRight
                          )}
                        />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </>
    )
  }

  return (
    <>
      {properties.map(({ content, name }, i) => {
        if (content.props.schema.type === 'object') {
          return (
            <div key={i}>
              {!isComplexTypeView && idSchema?.$id !== 'root' ? (
                <div className={styles.tableRow}>
                  <div className={styles.tableColumn}>
                    <label className={styles.tableColumnParam}>
                      <span>{name}</span>
                    </label>
                  </div>
                  <div className={styles.tableColumn}>
                    <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
                      <div className={styles.arrayFormDataWrap}>
                        {formData
                          ? JSON.stringify(
                              Object.fromEntries(
                                Object.entries(formData).filter(([key]) => key.includes(name))
                              ),
                              null,
                              ' '
                            )
                          : ''}
                      </div>
                      <span
                        className={clsx(styles.tableColumnType, styles.tableColumnTypeDropdown)}
                        onClick={() => addNewObject(name, content.props.idSchema?.$id)}>
                        <span className={styles.dropdown}>
                          {schema.type}
                          <span
                            className={clsx(
                              styles.tableColumnIcon,
                              styles.chevronIcon,
                              styles.chevronIconRight
                            )}
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
              {content}
            </div>
          )
        }
        return (!isComplexTypeView && content?.key !== 'EIP712Domain') ||
          !currentSchemaId.includes('root_TypedData_')
          ? content
          : null
      })}
      {(() => {
        const canAdd = canExpand(schema, uiSchema, formData)
        const inScope = isComplexTypeView ? idSchema?.$id === currentSchemaId : true // root view – always allow
        const shouldShow = canAdd && inScope && (isDynamicObject || schema?.type === 'object')

        return shouldShow ? <AddButton onClick={onAddClick(schema)} /> : null
      })()}
    </>
  )
}

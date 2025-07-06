import React from 'react'
import clsx from 'clsx'
import { SchemaProperty } from './SchemaProperty'
import { CollapseBox } from '../CollapseBox/CollapseBox'
import { MDContent } from './MDContent'
import styles from './styles.module.scss'
import { SchemaPropertyType } from '@site/src/components/ParserOpenRPC/interfaces'

const getRefSchemaFromComponents = (initRef, components) => {
  const ref = initRef.replace('#/components/schemas/', '')
  return components[ref]
}

const getArrayTypeDescription = (items, schemas) => {
  if (!items) return 'array'

  // Handle reference types - default to just "array"
  if (items.$ref || items.schema?.$ref) {
    return 'array'
  }

  // Handle nested arrays - show as "multidimensional array"
  if (items.type === 'array' || items.schema?.type === 'array') {
    return 'multidimensional array'
  }

  // Handle object types
  if (items.type === 'object' || items.schema?.type === 'object') {
    return 'array of objects'
  }

  // Handle combination types
  if (items.oneOf || items.schema?.oneOf) {
    return 'array'
  }
  if (items.allOf || items.schema?.allOf) {
    return 'array'
  }
  if (items.anyOf || items.schema?.anyOf) {
    return 'array'
  }

  // Handle enum types
  if (items.enum || items.schema?.enum) {
    return 'array'
  }

  // Handle basic types with lookup table
  const typeLabels: Record<string, string> = {
    string: 'array of strings',
    number: 'array of numbers',
    integer: 'array of integers',
    boolean: 'array of booleans',
    null: 'array of null values',
  }

  const type = typeof items === 'string' ? items : items.type || items.schema?.type
  return typeLabels[type] || 'array'
}

const renderSchema = (
  schemaItem,
  schemas,
  name,
  showRequired = true,
  isExpandedByDefault = true
) => {
  if (!schemaItem) return <div>Invalid schema</div>

  const resolveRef = (ref, originalItem) => {
    const newSchema = getRefSchemaFromComponents(ref, schemas)
    // Preserve the original parameter's description when resolving references
    const resolvedSchema = {
      ...newSchema,
      description: originalItem?.description || newSchema.description || newSchema.title || '',
    }
    return renderSchema(resolvedSchema, schemas, name, showRequired, isExpandedByDefault)
  }

  if (schemaItem?.schema?.$ref) return resolveRef(schemaItem.schema.$ref, schemaItem)
  if (schemaItem?.$ref) return resolveRef(schemaItem.$ref, schemaItem)

  const renderObject = (item, itemName) => {
    const requiredFields = Array.isArray(item.required) ? item.required : []
    return (
      <div>
        <SchemaProperty
          title={itemName || item.title}
          type="object"
          required={schemaItem.required || !!item.required}
          description={item.description || item.title || ''}
          pattern={item.pattern}
          defaultVal={item.default}
          showRequired={showRequired}
        />
        <div className="padding-bottom--md">
          <CollapseBox isInitExpanded={isExpandedByDefault}>
            <>
              {Object.entries(item.properties).map(([key, value]: [string, SchemaPropertyType]) => (
                <div key={key} className={styles.paramItemWrapper}>
                  {renderSchema(
                    {
                      ...value,
                      required: requiredFields.includes(key),
                    },
                    schemas,
                    key,
                    showRequired,
                    isExpandedByDefault
                  )}
                </div>
              ))}
            </>
          </CollapseBox>
        </div>
      </div>
    )
  }

  if (schemaItem?.schema?.type === 'object' && schemaItem?.schema?.properties) {
    return renderObject(schemaItem.schema, name || schemaItem?.schema?.title)
  }

  if (schemaItem.type === 'object' && schemaItem.properties) {
    return renderObject(schemaItem, name || schemaItem.title)
  }

  const renderArray = (item, itemName) => {
    const arrayType = getArrayTypeDescription(item.items, schemas)

    // Simple array types that don't need dropdown details
    const simpleArrayTypes = [
      'array of strings',
      'array of numbers',
      'array of integers',
      'array of booleans',
      'array of null values',
    ]

    const shouldShowDetails = !simpleArrayTypes.includes(arrayType)

    // Helper function to render object properties directly (flatter structure)
    const renderObjectProperties = objectSchema => {
      if (!objectSchema || !objectSchema.properties) return null

      const requiredFields = Array.isArray(objectSchema.required) ? objectSchema.required : []

      return (
        <>
          {Object.entries(objectSchema.properties).map(
            ([key, value]: [string, SchemaPropertyType]) => (
              <div key={key} className={styles.paramItemWrapper}>
                {renderSchema(
                  {
                    ...value,
                    required: requiredFields.includes(key),
                  },
                  schemas,
                  key,
                  showRequired,
                  isExpandedByDefault
                )}
              </div>
            )
          )}
        </>
      )
    }

    return (
      <div>
        <SchemaProperty
          title={itemName || item.title}
          type={arrayType}
          required={schemaItem.required || !!item.required}
          description={schemaItem.description || item.description || item.title || ''}
          pattern={schemaItem.pattern}
          defaultVal={schemaItem.default}
          showRequired={showRequired}
        />
        {shouldShowDetails && (
          <div className="padding-bottom--md">
            <CollapseBox isInitExpanded={isExpandedByDefault}>
              {(() => {
                // Check if array items are objects - if so, render properties directly (flatter structure)
                if (arrayType === 'array of objects') {
                  // Handle referenced objects
                  if (item.items?.$ref) {
                    const refSchema = getRefSchemaFromComponents(item.items.$ref, schemas)
                    const objectProperties = renderObjectProperties(refSchema)
                    if (objectProperties) return objectProperties
                  }
                  // Handle inline objects
                  else if (item.items?.type === 'object' && item.items.properties) {
                    const objectProperties = renderObjectProperties(item.items)
                    if (objectProperties) return objectProperties
                  }
                }

                // For all other array types, use the original rendering approach
                return (
                  <div className={styles.paramItemWrapper}>
                    {renderSchema(item.items, schemas, '', showRequired, isExpandedByDefault)}
                  </div>
                )
              })()}
            </CollapseBox>
          </div>
        )}
      </div>
    )
  }

  if (schemaItem.type === 'array' && schemaItem.items) {
    return renderArray(schemaItem, name || schemaItem.title)
  }

  if (schemaItem?.schema?.type === 'array' && schemaItem?.schema?.items) {
    return renderArray(schemaItem.schema, name || schemaItem.schema.title)
  }

  const renderCombinations = (item, itemName, type) => (
    <div>
      <SchemaProperty
        title={itemName || item.title}
        type={type}
        required={schemaItem.required || !!item.required}
        description={item.description || item.title || ''}
        pattern={item.pattern}
        defaultVal={item.default}
        showRequired={showRequired}
      />
      <div className="padding-bottom--md">
        <CollapseBox isInitExpanded={false}>
          {item[type].map((option, index) => (
            <div key={`${index}`} className={styles.paramItemWrapper}>
              {renderSchema(option, schemas, option.title, showRequired, isExpandedByDefault)}
            </div>
          ))}
        </CollapseBox>
      </div>
    </div>
  )

  if (schemaItem?.schema?.oneOf) return renderCombinations(schemaItem.schema, name, 'oneOf')
  if (schemaItem?.schema?.allOf) return renderCombinations(schemaItem.schema, name, 'allOf')
  if (schemaItem?.schema?.anyOf) return renderCombinations(schemaItem.schema, name, 'anyOf')

  if (schemaItem.oneOf) return renderCombinations(schemaItem, name, 'oneOf')
  if (schemaItem.allOf) return renderCombinations(schemaItem, name, 'allOf')
  if (schemaItem.anyOf) return renderCombinations(schemaItem, name, 'anyOf')

  const renderEnum = enumValues => {
    const formattedValues = enumValues.map(value => `\`${value}\``).join(', ')
    return (
      <div className={styles.propItemWrapper}>
        <p className={clsx(styles.description, 'margin--none type-paragraph-m')}>
          <MDContent content={`Valid options are: ${formattedValues}`} />
        </p>
      </div>
    )
  }

  if (schemaItem?.schema) {
    return (
      <div className={styles.borderTopLine}>
        <SchemaProperty
          title={name || schemaItem.schema.title}
          type={
            schemaItem.schema.enum
              ? 'enum'
              : schemaItem.schema.type === 'array'
                ? getArrayTypeDescription(schemaItem.schema.items, schemas)
                : schemaItem.schema.type
          }
          required={!!schemaItem.required}
          description={
            schemaItem.description || schemaItem.schema.description || schemaItem.schema.title || ''
          }
          pattern={schemaItem.schema.pattern || schemaItem.pattern}
          defaultVal={schemaItem.schema.default || schemaItem.default}
          showRequired={showRequired}
        />
        {schemaItem.schema.enum && renderEnum(schemaItem.schema.enum)}
      </div>
    )
  }

  return (
    <div className={styles.borderTopLine}>
      <SchemaProperty
        title={name || schemaItem.title}
        type={
          schemaItem.enum
            ? 'enum'
            : schemaItem.type === 'array'
              ? getArrayTypeDescription(schemaItem.items, schemas)
              : schemaItem.type
        }
        required={!!schemaItem.required}
        description={schemaItem.description || schemaItem.title}
        pattern={schemaItem.pattern}
        defaultVal={schemaItem.default}
        showRequired={showRequired}
      />
      {schemaItem.enum && renderEnum(schemaItem.enum)}
    </div>
  )
}

export const renderParamSchemas = (inputSchema, schemas) => {
  return (
    <>
      {inputSchema.map((item, i) => {
        return (
          <div key={`${i}`}>
            {renderSchema(item, schemas, item.name, true, true)}
            {i < inputSchema.length - 1 && <hr className={styles.paramSeparator} />}
          </div>
        )
      })}
    </>
  )
}

export const renderResultSchemas = (inputSchema, schemas) => {
  const customResult = inputSchema?.schema?.maxPriorityFeePerGas
  if (customResult) {
    return <>{renderSchema(customResult, schemas, inputSchema.name, false, false)}</>
  }
  return <>{renderSchema(inputSchema, schemas, inputSchema.name, false, false)}</>
}

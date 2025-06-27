import { useContext, useEffect, useState } from 'react'
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

  // Local copy of the key being edited; prevents RJSF from renaming the
  // property on every keystroke (which causes remounts).
  const [pendingKey, setPendingKey] = useState(label)

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

  // No-op useEffect now; kept to satisfy linter but does nothing.
  useEffect(() => {}, [])

  // In non-complex view we still want to show the additional rows so users can
  // edit the newly-added key/value immediately. Editing the *key* itself should
  // remain within the complex view flow.

  if (!isComplexTypeView) {
    return (
      <div className={classNames} style={style}>
        {children}
      </div>
    )
  }

  return (
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
            value={pendingKey}
            onChange={(val: string) => {
              setPendingKey(val)
            }}
            onBlur={() => {
              if (pendingKey !== label) {
                // Delegate renaming to RJSF, which will update formData and invoke onChange.
                onKeyChange(pendingKey)
                // Keep the drawer open but update its label to the new key.
                setDrawerLabel(pendingKey)
              }
            }}
            schema={{ ...schema, type: 'string' }}
            formContext={formContext}
          />
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

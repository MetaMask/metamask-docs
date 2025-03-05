import React, { useCallback, useContext, useEffect, useState } from 'react'
import { BaseInputTemplateProps } from '@rjsf/utils'
import clsx from 'clsx'
import styles from '@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.scss'
import { Tooltip } from '@site/src/components/Tooltip'
import debounce from 'lodash.debounce'
import { ParserOpenRPCContext } from '@site/src/components/ParserOpenRPC'

interface ExtendedInputProps extends BaseInputTemplateProps {
  isArray?: boolean
}

export const BaseInputTemplate = ({
  schema,
  id,
  name,
  value = '',
  disabled,
  onChange,
  rawErrors,
  hideError,
  required,
  formContext,
  isArray,
}: ExtendedInputProps) => {
  const isNumber = schema.type === 'number' || schema.type === 'integer'
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(isNumber ? 0 : '')

  const { isFormReseted, currentFormData } = formContext
  const { isComplexTypeView } = useContext(ParserOpenRPCContext)
  const hasErrors = rawErrors?.length > 0 && !hideError && value !== ''
  const debouncedOnChange = useCallback(
    debounce((e, isInputNumber = false) => {
      onChange(isInputNumber ? e : e?.target?.value)
    }, 300),
    []
  )
  const onInputChange = e => {
    const value = isNumber ? Number(+e?.target?.value || 0) : e?.target?.value
    setInputValue(value)
    isNumber ? debouncedOnChange(value, true) : debouncedOnChange(e)
  }
  const onInputNumberChange = value => {
    setInputValue(value)
    debouncedOnChange(value, true)
  }

  useEffect(() => {
    if (isComplexTypeView && Object.keys(currentFormData).includes(name)) {
      setInputValue(currentFormData[name])
    } else {
      setInputValue(value)
    }
  }, [value, isFormReseted, currentFormData])

  return (
    <div className={isArray ? styles.arrayItemRow : styles.tableRow}>
      {!isArray && (
        <div className={styles.tableColumn}>
          <label
            className={clsx(
              styles.tableColumnParam,
              isFocused && styles.tableColumnParamFocused,
              hasErrors && styles.tableColumnParamError
            )}>
            <span>
              {name}
              {required && '*'}
            </span>
          </label>
        </div>
      )}
      <div className={!isArray ? styles.tableColumn : ''}>
        <Tooltip message={hasErrors ? rawErrors[0] : ''} disabled={!hasErrors}>
          <div className={styles.tableValueRow}>
            {hasErrors && !isNumber ? <span className={styles.tableLabelIconError} /> : null}
            <input
              id={id}
              value={inputValue}
              disabled={disabled}
              className={clsx(styles.formControl, hasErrors && styles.formControlError)}
              type={isNumber ? 'number' : (schema.type as string)}
              pattern={schema.pattern}
              onChange={onInputChange}
              onFocus={() => {
                setIsFocused(true)
              }}
              onBlur={() => {
                setIsFocused(false)
              }}
            />
            <span className={styles.tableColumnType}>
              {schema.type}
              {isNumber ? (
                <>
                  <span
                    className={clsx(
                      styles.tableColumnIcon,
                      styles.chevronIcon,
                      styles.formControlNumberUp
                    )}
                    onClick={() => {
                      onInputNumberChange(Number((+inputValue || 0) + 1))
                    }}
                  />
                  <span
                    className={clsx(
                      styles.tableColumnIcon,
                      styles.chevronIcon,
                      styles.chevronIconDown,
                      styles.formControlNumberDown
                    )}
                    onClick={() => {
                      // @ts-ignore
                      inputValue >= 1 && onInputNumberChange(Number((+inputValue || 0) - 1))
                    }}
                  />
                </>
              ) : null}
            </span>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

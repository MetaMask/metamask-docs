import React from 'react'
import clsx from 'clsx'

import styles from './input.module.scss'

interface IInput {
  onChange?: (string) => void
  disabled?: boolean
  label?: string
  className?: string
  error?: string
  placeholder?: string
  value?: string
}

export default function Input({
  className,
  onChange,
  label,
  disabled = false,
  error,
  placeholder,
  value,
}: IInput) {
  return (
    <label className={clsx(styles.container, className)}>
      <p className={styles.label}>{label}</p>
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(styles.input, error && styles.error)}
        onChange={e => onChange(e?.target?.value)}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </label>
  )
}

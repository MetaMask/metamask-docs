import React, { useState, useRef, useEffect } from 'react'
import styles from './CustomSelect.module.css'

export interface OptionType {
  label: string
  value: string
}

interface CustomSelectProps {
  options: OptionType[]
  placeholder: string
  onChange: (selectedOptions: OptionType[]) => void
  value?: OptionType[]
  isMulti?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
  onChange,
  value = [],
  isMulti = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(value)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSelectedOptions(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option: OptionType) => {
    let newSelectedOptions: OptionType[]

    if (isMulti) {
      const isSelected = selectedOptions.some(selected => selected.value === option.value)
      if (isSelected) {
        newSelectedOptions = selectedOptions.filter(selected => selected.value !== option.value)
      } else {
        newSelectedOptions = [...selectedOptions, option]
      }
    } else {
      newSelectedOptions = [option]
      setIsOpen(false)
    }

    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const handleRemoveOption = (optionToRemove: OptionType, event: React.MouseEvent) => {
    event.stopPropagation()
    const newSelectedOptions = selectedOptions.filter(
      selected => selected.value !== optionToRemove.value
    )
    setSelectedOptions(newSelectedOptions)
    onChange(newSelectedOptions)
  }

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedOptions([])
    onChange([])
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const isOptionSelected = (option: OptionType) => {
    return selectedOptions.some(selected => selected.value === option.value)
  }

  const hasMultipleSelections = selectedOptions.length >= 2

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <div
        className={`${styles.control} ${isOpen ? styles.controlFocused : ''} ${hasMultipleSelections ? styles.controlExpanded : ''}`}
        onClick={toggleDropdown}>
        <div
          className={`${styles.valueContainer} ${hasMultipleSelections ? styles.valueContainerExpanded : ''}`}>
          {selectedOptions.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <div className={styles.multiValueContainer}>
              {selectedOptions.map(option => (
                <div key={option.value} className={styles.multiValue}>
                  <span className={styles.multiValueLabel}>{option.label}</span>
                  <button
                    className={styles.multiValueRemove}
                    onClick={e => handleRemoveOption(option, e)}
                    type="button"
                    aria-label={`Remove ${option.label}`}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`${styles.indicatorsContainer} ${hasMultipleSelections ? styles.indicatorsContainerExpanded : ''}`}>
          {selectedOptions.length > 0 && (
            <button
              className={styles.clearIndicator}
              onClick={handleClearAll}
              type="button"
              aria-label="Clear all">
              ×
            </button>
          )}
          <span
            className={`${styles.dropdownIndicator} ${isOpen ? styles.dropdownIndicatorRotated : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.menuList}>
            {options.map(option => (
              <div
                key={option.value}
                className={`${styles.option} ${isOptionSelected(option) ? styles.optionSelected : ''}`}
                onClick={() => handleOptionClick(option)}>
                <span className={styles.optionLabel}>{option.label}</span>
                {isOptionSelected(option) && (
                  <button
                    className={styles.optionRemove}
                    onClick={e => {
                      e.stopPropagation()
                      handleOptionClick(option)
                    }}
                    type="button"
                    aria-label={`Remove ${option.label}`}>
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomSelect

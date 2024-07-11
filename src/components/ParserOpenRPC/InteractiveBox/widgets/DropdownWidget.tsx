import React, { useState } from "react"
import { WidgetProps } from "@rjsf/utils"
import clsx from "clsx"
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css"

export const DropdownWidget = ({
  name,
  value,
  onChange,
  schema,
  options,
}: WidgetProps) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableColumn}>
        <label className={styles.tableColumnParam}>{name}</label>
      </div>
      <div className={styles.tableColumn}>
        <div
          className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}
        >
          {value === undefined ? "" : String(value)}
          <span className={clsx(styles.tableColumnType, styles.tableColumnTypeDropdown)} onClick={() => { setIsOpened(!isOpened); }}>
            <span className={styles.dropdown}>
              {schema.type}
              <span
                className={clsx(
                  styles.tableColumnIcon,
                  styles.chevronIcon,
                  styles.dropdownChevronIcon,
                  !isOpened && styles.chevronIconDown
                )}
              />
              <span
                className={clsx(
                  styles.chevronIcon,
                  styles.dropdownChevronIcon,
                  !isOpened && styles.chevronIconDown
                )}
              />
            </span>
            <ul
              className={clsx(
                styles.dropdownList,
                !isOpened && styles.dropdownListClosed
              )}
            >
              {options.enumOptions.map(({ value }, index) => (
                <li
                  className={styles.dropdownItem}
                  key={index}
                  onClick={() => {
                    onChange(value)
                    setIsOpened(false)
                  }}
                >
                  {String(value)}
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  )
}

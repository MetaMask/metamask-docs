import React, { useState } from "react";
import { WidgetProps } from "@rjsf/utils";
import clsx from "clsx";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.scss";

export const SelectWidget = ({
  value,
  onChange,
  schema,
  options,
  label,
}: WidgetProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const emptyValue =
    value === undefined ||
    !options?.enumOptions.some(({ label }) => label === value);

  return (
    <div className={styles.tableRow}>
      <div className={styles.tableColumn}>
        <label className={styles.tableColumnParam}>{label}</label>
      </div>
      <div className={styles.tableColumn}>
        <div
          className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}
        >
          {emptyValue ? "" : String(value)}
          <span
            className={clsx(
              styles.tableColumnType,
              styles.tableColumnTypeDropdown,
            )}
            onClick={() => {
              setIsOpened(!isOpened);
            }}
          >
            <span className={styles.dropdown}>
              {schema?.enum ? "enum" : schema?.type}
              <span
                className={clsx(
                  styles.tableColumnIcon,
                  styles.chevronIcon,
                  styles.dropdownChevronIcon,
                  !isOpened && styles.chevronIconDown,
                )}
              />
              <span
                className={clsx(
                  styles.chevronIcon,
                  styles.dropdownChevronIcon,
                  !isOpened && styles.chevronIconDown,
                )}
              />
            </span>
            <ul
              className={clsx(
                styles.dropdownList,
                !isOpened && styles.dropdownListClosed,
              )}
            >
              {options?.enumOptions?.map(({ label, value }, index) => (
                <li
                  className={styles.dropdownItem}
                  key={index}
                  onClick={() => {
                    onChange(value);
                    setIsOpened(false);
                  }}
                >
                  {String(label)}
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

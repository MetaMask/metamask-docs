import React from "react";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, canAdd, onAddClick, title, value, schema, formData } = props;
  const isStringArray = schema?.items?.type === "string";

  return title !== "accessList1" ? (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>{title}</label>
        </div>
        <div className={styles.tableColumn}>
          <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
            {/*{formData.length > 0 ? formData.toString() : ""}*/}
            <span className={styles.tableColumnType}>
            <span className={styles.dropdown}>
              {schema.type}
              <span className={clsx(styles.chevronIcon, isStringArray ? styles.chevronIconDown : styles.chevronIconRight)}/>
            </span>
          </span>
          </div>
        </div>
      </div>
      {items.map((element) => element.children)}
      {canAdd && <button onClick={onAddClick}>{isStringArray ? "Add array item" : `Add ${title}`}</button>}
    </div>
  ) : null;
}

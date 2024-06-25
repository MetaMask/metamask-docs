import React, {useEffect} from "react";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, canAdd, onAddClick, title, value, schema, formData } = props;
  console.log("schema", schema);
  // console.log("items", items);
  const isStringArray = schema?.items?.type === "string";

  useEffect(() => {
    if (canAdd) {
      onAddClick();
    }
  }, [])

  // console.log("formData", formData);

  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>{title}</label>
        </div>
        <div className={styles.tableColumn}>
          <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
            {/*{formData.length > 0 ? JSON.stringify(formData, null, 2) : ""}*/}
            <span className={styles.tableColumnType}>
              <span className={styles.dropdown}>
                {schema.type}
                <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, isStringArray ? styles.chevronIconDown : styles.chevronIconRight)}/>
              </span>
            </span>
          </div>
        </div>
      </div>
      {!isStringArray ? items.map((element) => {
        console.log("element", element);
        return element.children
      }) : null}
      {canAdd && !isStringArray ?
        <button className={clsx(styles.tableButton, styles.tableButtonAddArrayItem)} onClick={onAddClick}>
          <img src="/img/icons/plus-icon.svg" alt={`Add ${title}`} width="16px" height="16px" />
          <span className={styles.tableButtonAddArrayItemName}>Add {title}</span>
        </button> :
        null
      }
    </div>
  );
}

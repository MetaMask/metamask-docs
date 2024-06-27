import React, { Fragment, useContext, useEffect, useState } from "react";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";

export const ArrayFieldTemplate = (props: ArrayFieldTemplateProps) => {
  const { items, canAdd, onAddClick, title, schema, formData, formContext } = props;
  const { setIsDrawerContentFixed, setDrawerLabel } = useContext(ParserOpenRPCContext);
  const itemsType = schema?.items?.type;
  const isSimpleArray = itemsType === "string" || itemsType === "boolean" || itemsType === "number" || itemsType === "integer";

  const { setIsComplexTypeView, isComplexTypeView } = formContext;
  const addComplexArray = () => {
    onAddClick();
    setDrawerLabel(title);
    setIsDrawerContentFixed(true);
    setIsComplexTypeView(true);
  }

  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>{title}</label>
        </div>
        <div className={styles.tableColumn}>
          <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
            {JSON.stringify(formData, null, " ")}
            <span className={styles.tableColumnType} onClick={!isSimpleArray ? addComplexArray : null}>
              <span className={styles.dropdown}>
                {schema.type}
                <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, isSimpleArray ? styles.chevronIconDown : styles.chevronIconRight)}/>
              </span>
            </span>
          </div>
        </div>
      </div>
      {isComplexTypeView && !isSimpleArray ?
        <div className={styles.tableComplexType}>
          {items.map(({ children, index, onDropIndexClick, hasRemove }) => (
              <div className={styles.tableComplexTypeItem} key={index}>
                {children}
                {hasRemove && (
                  <span
                    onClick={onDropIndexClick(index)}
                    className={clsx(styles.deleteIcon, styles.deleteIconComplex)}
                  >
                      </span>
                )}
              </div>
          ))}
          {canAdd ?
            <button className={clsx(styles.tableButton, styles.tableButtonAddNewArray)} onClick={onAddClick}>
              <img src="/img/icons/plus-icon.svg" alt={`Add ${title}`} width="16px" height="16px" />
              <span className={styles.tableButtonAddArrayItemName}>Add {title}</span>
            </button> :
            null
          }
        </div> :
        null
      }
    </div>
  );
}

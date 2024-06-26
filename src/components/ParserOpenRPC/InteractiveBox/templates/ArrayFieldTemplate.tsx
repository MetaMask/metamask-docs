import React from "react";
import { useCollapsible, Collapsible } from "@docusaurus/theme-common";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import clsx from "clsx";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";

export const ArrayFieldTemplate = ({
  title,
  formData,
  items,
  canAdd,
  onAddClick
}: ArrayFieldTemplateProps) => {
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true });
  return (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>
            {title}
          </label>
        </div>
        <div className={styles.tableColumn}>
          <div className={styles.arrayParentRow}>
            <div className={styles.arrayFormDataWrap}>
              {JSON.stringify(formData, null, " ")}
            </div>
            <span
              className={styles.arrayColumnType}
              onClick={toggleCollapsed}
            >
              array
              <span className={clsx(styles.chevronIcon, collapsed && styles.chevronIconDown)}>
              </span>
            </span>
          </div>
        </div>
      </div>
      <Collapsible lazy collapsed={collapsed}>
        <>
          {items.map((el, i) => {
            const props = {
              ...el.children.props,
              isArray: true
            }
            const { index, hasRemove, onDropIndexClick, schema } = el;
            const isNumber = schema.type === "number" || schema.type === "integer";
            return (
              <div key={`${i}`} className={styles.arrayItemRowWrap} style={{ paddingRight: `${isNumber ? "25px" : "0"}` }}>
                <span className={clsx(styles.addItemIcon, styles.arrayItemIcon)}>{i+1}</span>
                <BaseInputTemplate {...props} />
                {hasRemove && (
                  <span
                    onClick={onDropIndexClick(index)}
                    className={styles.deleteIcon}
                  >
                  </span>
                )}
              </div>
            )
          })}
          {canAdd && (
            <div className={styles.addItemBtnWrap}>
              <button
                type="button"
                onClick={onAddClick}
                className={styles.addItemBtn}
              >
                <span className={styles.addItemIcon}>+</span>
                Add array item
              </button>
            </div>
          )}
        </>
      </Collapsible>
    </>
  );
};

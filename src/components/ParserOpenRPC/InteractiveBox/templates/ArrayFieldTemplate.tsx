import React, { useContext, useState } from "react"
import { useCollapsible, Collapsible } from "@docusaurus/theme-common"
import { ArrayFieldTemplateProps } from "@rjsf/utils"
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate"
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css"
import clsx from "clsx"
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC"

export const ArrayFieldTemplate = ({
  items,
  canAdd,
  onAddClick,
  title,
  schema,
  formData,
  formContext,
}: ArrayFieldTemplateProps) => {
  const [isComplexArrayEditView, setIsComplexArrayEditView] = useState(false)
  const {
    setIsDrawerContentFixed,
    setDrawerLabel,
    isComplexTypeView,
    setIsComplexTypeView,
  } = useContext(ParserOpenRPCContext)
  const { collapsed, toggleCollapsed } = useCollapsible({ initialState: true })
  const itemsType = schema?.items?.type
  const isSimpleArray =
    itemsType === "string" ||
    itemsType === "boolean" ||
    itemsType === "number" ||
    itemsType === "integer"
  const addComplexArray = () => {
    onAddClick()
    setDrawerLabel(title)
    setIsDrawerContentFixed(true)
    setIsComplexArrayEditView(true)
    setIsComplexTypeView(true)
  }

  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>{title}</label>
        </div>
        <div className={styles.tableColumn}>
          <div
            className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}
          >
            <div className={styles.arrayFormDataWrap}>
              {JSON.stringify(formData, null, " ")}
            </div>
            <span
              className={styles.tableColumnType}
              onClick={isSimpleArray ? toggleCollapsed : addComplexArray}
            >
              <span className={styles.dropdown}>
                {schema.type}
                <span
                  className={clsx(
                    styles.tableColumnIcon,
                    styles.chevronIcon,
                    isSimpleArray
                      ? collapsed && styles.chevronIconDown
                      : styles.chevronIconRight
                  )}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
      {isComplexTypeView && isComplexArrayEditView && !isSimpleArray ? (
        <div className={styles.tableComplexType}>
          {items.map(({ children, index, onDropIndexClick, hasRemove }) => (
            <div className={styles.tableComplexTypeItem} key={index}>
              {children}
              {hasRemove && (
                <span
                  onClick={onDropIndexClick(index)}
                  className={clsx(styles.deleteIcon, styles.deleteIconComplex)}
                ></span>
              )}
            </div>
          ))}
          {canAdd ? (
            <button
              className={clsx(
                styles.tableButton,
                styles.tableButtonAddNewArray
              )}
              onClick={onAddClick}
            >
              <img
                src="/img/icons/plus-icon.svg"
                alt={`Add ${title}`}
                width="16px"
                height="16px"
              />
              <span className={styles.tableButtonAddArrayItemName}>
                Add {title}
              </span>
            </button>
          ) : null}
        </div>
      ) : (
        <Collapsible lazy collapsed={collapsed}>
          <>
            {items.map((el, i) => {
              const baseInputTemplateProps = {
                ...el.children.props,
                isArray: true,
                value: formData,
              }
              const { index, hasRemove, onDropIndexClick, schema } = el
              const isNumber =
                schema.type === "number" || schema.type === "integer"
              return (
                <div
                  key={`${i}`}
                  className={styles.arrayItemRowWrap}
                  style={{ paddingRight: `${isNumber ? "25px" : "0"}` }}
                >
                  <span
                    className={clsx(styles.addItemIcon, styles.arrayItemIcon)}
                  >
                    {i + 1}
                  </span>
                  <BaseInputTemplate {...baseInputTemplateProps} />
                  {hasRemove && (
                    <span
                      onClick={onDropIndexClick(index)}
                      className={clsx(
                        styles.deleteIcon,
                        styles.deleteIconCentered
                      )}
                    ></span>
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
      )}
    </div>
  )
}

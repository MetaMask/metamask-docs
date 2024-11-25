import React, { useContext, useEffect, useState } from "react";
import { FieldTemplateProps } from "@rjsf/utils";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { SelectWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/SelectWidget";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.scss";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";
import clsx from "clsx";

export const ConditionalField = (props: FieldTemplateProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedTypeSchema, setSelectedTypeSchema] = useState(null);
  const [isEditView, setIsEditView] = useState(false);
  const {
    setIsDrawerContentFixed,
    setDrawerLabel,
    isComplexTypeView,
    setIsComplexTypeView,
  } = useContext(ParserOpenRPCContext);
  // @ts-ignore
  const { formData, schema, name, onChange } = props;
  const listItems = schema?.anyOf ? schema?.anyOf : schema?.oneOf;
  const checkForNullTypeSchema = (type) => type === "null";
  const showComplexTypeView = () => {
    setDrawerLabel(name);
    setIsDrawerContentFixed(true);
    setIsEditView(true);
    setIsComplexTypeView(true);
  };
  const onDropdownOptionClick = (e) => {
    const selectedSchema = listItems.find(
      // @ts-ignore
      ({ title }) => title === e.target.dataset.value,
    );
    // @ts-ignore
    const isNullTypeSchema = checkForNullTypeSchema(selectedSchema?.type);
    if (isNullTypeSchema) {
      onChange(null);
    } else {
      setSelectedTypeSchema(
        // @ts-ignore
        listItems.find(({ title }) => title === e.target.dataset.value),
      );
      showComplexTypeView();
    }
    setIsOpened(false);
  };
  const selectWidgetProps = {
    ...props,
    schema: selectedTypeSchema,
    label: name,
    value: formData,
    ...(selectedTypeSchema?.enum && {
      options: {
        enumOptions: selectedTypeSchema?.enum.map((item) => ({
          label: item,
          value: item,
        })),
      },
    }),
  };
  const baseInputProps = {
    ...props,
    schema: selectedTypeSchema,
  };

  useEffect(() => {
    if (!isComplexTypeView) {
      setIsEditView(false);
      setSelectedTypeSchema(null);
    }
  }, [isComplexTypeView]);

  return listItems?.length > 0 ? (
    <>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>{name}</label>
        </div>
        <div className={styles.tableColumn}>
          <div
            className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}
          >
            <div className={styles.tableValueConditionalField}>{formData === undefined ? "" : String(formData)}</div>
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
                {schema?.anyOf ? "anyOf" : "oneOf"}
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
                {listItems?.map((listItem, index) => (
                  <li
                    className={styles.dropdownItem}
                    key={index}
                    onClick={onDropdownOptionClick}
                    // @ts-ignore
                    data-value={listItem.title}
                  >
                    {/* @ts-ignore */}
                    {listItem.title}
                  </li>
                ))}
              </ul>
            </span>
          </div>
        </div>
      </div>
      {isComplexTypeView &&
      isEditView &&
      selectedTypeSchema &&
      selectedTypeSchema.type !== "null" ? (
        <div className={styles.tableComplexType}>
          {selectedTypeSchema?.enum ? (
            // @ts-ignore
            <SelectWidget {...selectWidgetProps} />
          ) : (
            // @ts-ignore
            <BaseInputTemplate {...baseInputProps} />
          )}
        </div>
      ) : null}
    </>
  ) : null;
};

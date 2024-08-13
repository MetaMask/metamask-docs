import React, {useContext, useEffect, useState} from "react";
import { canExpand } from '@rjsf/utils';
import { AddButton } from "@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/AddButton";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";


export const ObjectFieldTemplate = (props) => {
  const {
    formData,
    formContext,
    idSchema,
    onAddClick,
    properties,
    schema,
    uiSchema,
  } = props;
  const objectSchemaIds = ["root_requestPermissionsObject", "root_revokePermissionObject", "eth_signTypedData_v4"]
  const { isComplexTypeView, setDrawerLabel, setIsComplexTypeView } = useContext(ParserOpenRPCContext);
  const { currentSchemaId, setCurrentSchemaId } = formContext;
  const addNewObject = (name, schemaId) => {
    setIsComplexTypeView(true);
    setDrawerLabel(name);
    setCurrentSchemaId(schemaId);
  };

  return (
    <>
      {properties.map(({ content, name }, i) => {
        if (content.props.schema.type === 'object') {
          return (
            <div key={`${i}`}>
              {!isComplexTypeView && idSchema?.$id !== "root" ?
                <div className={styles.tableRow}>
                  <div className={styles.tableColumn}>
                    <label className={styles.tableColumnParam}>
                      <span>{name}</span>
                    </label>
                  </div>
                  <div className={styles.tableColumn}>
                    <div className={clsx(styles.tableValueRow, styles.tableValueRowPadding)}>
                      <div className={styles.arrayFormDataWrap}>
                        {formData ?
                          JSON.stringify(Object.fromEntries(Object.entries(formData).filter(([key]) => key.includes(name))), null, " ") :
                          ""
                        }
                      </div>
                      <span
                        className={clsx(styles.tableColumnType, styles.tableColumnTypeDropdown)}
                        onClick={() => addNewObject(name, content.props.idSchema?.$id)}
                      >
                          <span className={styles.dropdown}>
                            {schema.type}
                            <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconRight)} />
                          </span>
                        </span>
                    </div>
                  </div>
                </div> :
                null
              }
              {content}
            </div>
          )
        }
        if (!isComplexTypeView) {
          return content;
        }
        return isComplexTypeView && idSchema?.$id === currentSchemaId ? content : null;
      })}
      {
        (
          (isComplexTypeView && idSchema?.$id === currentSchemaId) ||
          !isComplexTypeView && objectSchemaIds.includes(idSchema?.$id)
        ) && canExpand(schema, uiSchema, formData) ?
          <AddButton onClick={onAddClick(schema)} /> :
          null
      }
    </>
  )
}
import React, { useContext, useState } from "react";
import { ObjectFieldTemplateProps } from "@rjsf/utils";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  console.log("ObjectFieldTemplate props", props);
  const [isEditView, setIsEditView] = useState(false);
  const { schema, required, properties, formContext, onAddClick, title } = props;
  // const newOnAddClick = () => {
  //   console.log('newOnAddClick');
  //   onAddClick(schema)
  // }
  const { isComplexTypeView, setIsComplexTypeView, setIsDrawerContentFixed, setDrawerLabel } = useContext(ParserOpenRPCContext);
  const addObject = () => {
    // setDrawerLabel(properties[0]?.name);
    setIsDrawerContentFixed(true);
    setIsEditView(true);
    setIsComplexTypeView(true);
  }

  return (
    <div>
      <div className={styles.tableRow}>
        <div className={styles.tableColumn}>
          <label className={styles.tableColumnParam}>
            {title}
            {/*<span>{properties[0]?.name}{required && "*"}</span>*/}
          </label>
        </div>
        <div className={styles.tableColumn}>
          <div className={styles.tableValueRow}>
          <span className={styles.tableColumnType} onClick={addObject}>
            <span className={styles.dropdown}>
              {schema.type}
              <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconRight)} />
            </span>
          </span>
          </div>
        </div>
      </div>
      {properties?.length > 0 ? properties[0].content : null}
      <button
        className={clsx(
          styles.tableButton,
          styles.tableButtonAddNewArray
        )}
        onClick={() => {
          console.log('schema 123', schema);
          onAddClick(schema.properties.requestPermissionsObject)
        }}
      >
        <img
          src="/img/icons/plus-icon.svg"
          alt={`Add ${title}`}
          width="16px"
          height="16px"
        />
        <span className={styles.tableButtonAddArrayItemName}>
          Add
        </span>
      </button>
      {isComplexTypeView && isEditView ?
        <div className={styles.tableComplexType}>
          <div>
            {props.properties.map((element) => (
              <div>{element.content}</div>
            ))}
          </div>
        </div> :
        null
      }
    </div>
  )
  // return (
  //   <div>
  //     {props.properties.map((element) => (
  //       <div className='property-wrapper'>{element.content}</div>
  //     ))}
  //   </div>
  // );
}
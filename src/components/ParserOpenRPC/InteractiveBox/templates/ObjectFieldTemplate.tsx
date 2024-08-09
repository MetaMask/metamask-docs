import React from "react";
import { canExpand } from '@rjsf/utils';
import { AddButton } from "@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/AddButton";
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";


export const ObjectFieldTemplate = (props) => {
  const {
    disabled,
    formData,
    onAddClick,
    properties,
    readonly,
    registry,
    schema,
    uiSchema,
  } = props;
  console.log('props', props);
  // const schema = oldSchema.properties.requestPermissionsObject
  return (
    <>
      {properties.map((prop, i) => {
        return (
          <div key={`${i}`}>
            {prop.name}
            {prop.content}
          </div>
        )
      })}
      {canExpand(schema, uiSchema, formData) && (
        <button type="button" onClick={onAddClick(schema)}>
          Add prop
        </button>
      )}
    </>
  );
}
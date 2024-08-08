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
      {properties.map((prop) => prop.content)}
      {/*{properties.map(({ content }) => (*/}
      {/*  <div className={styles.tableRow}>*/}
      {/*    <div className={styles.tableColumn}>*/}
      {/*      <label className={styles.tableColumnParam}>*/}
      {/*        <span>{content.props.name}</span>*/}
      {/*      </label>*/}
      {/*    </div>*/}
      {/*    <div className={styles.tableColumn}>*/}
      {/*      <div className={styles.tableValueRow}>*/}
      {/*      <span className={styles.tableColumnType}>*/}
      {/*        <span className={styles.dropdown}>*/}
      {/*          {schema.type}*/}
      {/*          <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconRight)} />*/}
      {/*        </span>*/}
      {/*      </span>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*))}*/}
      {canExpand(schema, uiSchema, formData) && (
        <AddButton
          className='object-property-expand'
          onClick={onAddClick(schema)}
          disabled={disabled || readonly}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </>
  );
}
import { FieldTemplateProps, RJSFSchema } from '@rjsf/utils';
import styles from "@site/src/components/ParserOpenRPC/InteractiveBox/styles.module.css";
import clsx from "clsx";
import React, {useContext, useState} from "react";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";
import {ObjectFieldTemplate} from "./ObjectFieldTemplate";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";

export const FieldTemplate = (props: FieldTemplateProps) => {
  console.log('props', props);
  const { id, label, help, required, description, errors, children, schema, formContext } = props;
  const [isEditView, setIsEditView] = useState(false);
  const { isComplexTypeView, setIsComplexTypeView, setIsDrawerContentFixed, setDrawerLabel } = useContext(ParserOpenRPCContext);
  const addObject = () => {
    // setDrawerLabel(properties[0]?.name);
    setIsDrawerContentFixed(true);
    setIsEditView(true);
    setIsComplexTypeView(true);
  }

  // const propName = Object.keys(schema.properties)[0]
  // const parentObject = schema.properties[propName]

  // if (parentObject?.type === 'object') {
  //     return (
  //       <div>
  //         <div className={styles.tableRow}>
  //           <div className={styles.tableColumn}>
  //             <label className={styles.tableColumnParam}>
  //               <span>{schema.properties[propName].title}</span>
  //             </label>
  //           </div>
  //           <div className={styles.tableColumn}>
  //             <div className={styles.tableValueRow}>
  //             <span className={styles.tableColumnType} onClick={addObject}>
  //               <span className={styles.dropdown}>
  //                 {parentObject.type}
  //                 <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconRight)} />
  //               </span>
  //             </span>
  //             </div>
  //           </div>
  //         </div>
  //         {isComplexTypeView && isEditView ?
  //           <div className={styles.tableComplexType}>
  //             <div>
  //               <BaseInputTemplate schema={schema} formContext={formContext} />
  //             </div>
  //           </div> :
  //           null
  //         }
  //       </div>
  //     )
  // }

  // if (schema.properties[0]?.type === 'object') {
  //   return (
  //     <div>
  //       <div className={styles.tableRow}>
  //         <div className={styles.tableColumn}>
  //           <label className={styles.tableColumnParam}>
  //             <span>{label}{required && "*"}</span>
  //           </label>
  //         </div>
  //         <div className={styles.tableColumn}>
  //           <div className={styles.tableValueRow}>
  //           <span className={styles.tableColumnType} onClick={addObject}>
  //             <span className={styles.dropdown}>
  //               {schema.type}
  //               <span className={clsx(styles.tableColumnIcon, styles.chevronIcon, styles.chevronIconRight)} />
  //             </span>
  //           </span>
  //           </div>
  //         </div>
  //       </div>
  //       {/*{isComplexTypeView && isEditView ?*/}
  //       {/*  <div className={styles.tableComplexType}>*/}
  //       {/*    <div>*/}
  //       {/*      {props.properties.map((element) => (*/}
  //       {/*        <div>{element.content}</div>*/}
  //       {/*      ))}*/}
  //       {/*    </div>*/}
  //       {/*  </div> :*/}
  //       {/*  null*/}
  //       {/*}*/}
  //     </div>
  //   )
  // }

  return (
    <div className={styles.formControl}>
      {label}
      {children}
    </div>
  );
}
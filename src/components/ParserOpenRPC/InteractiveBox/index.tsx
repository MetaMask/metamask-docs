import React, { useContext, useEffect, useRef, useState } from 'react'
import Form from '@rjsf/core'
import clsx from 'clsx'
import { RJSFSchema, UiSchema, RegistryWidgetsType, RegistryFieldsType } from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import $RefParser from '@apidevtools/json-schema-ref-parser'
import {
  MethodExample,
  MethodParam,
  SchemaComponents,
} from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.scss";
import global from "../global.module.scss";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { ArrayFieldTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/ArrayFieldTemplate";
import { ObjectFieldTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/ObjectFieldTemplate";
import { WrapIfAdditionalTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/WrapIfAdditionalTemplate";
import { ConditionalField } from "@site/src/components/ParserOpenRPC/InteractiveBox/fields/ConditionalField";
import { DropdownWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/DropdownWidget";
import { SelectWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/SelectWidget";
import { Tooltip } from "@site/src/components/Tooltip";
import { useColorMode } from "@docusaurus/theme-common";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import * as isPlainObject from "lodash.isplainobject";
import { RemoveButton } from "@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/RemoveButton";
import { AddButton } from "@site/src/components/ParserOpenRPC/InteractiveBox/buttonTemplates/AddButton";
import ClearIcon from '@site/static/img/icons/clear-icon.svg'
import ResetIcon from '@site/static/img/icons/reset-icon.svg'

interface InteractiveBoxProps {
  params: MethodParam[];
  components: SchemaComponents;
  examples: MethodExample[];
  onParamChange: (data) => void;
  drawerLabel?: string | null;
  closeComplexTypeView?: () => void;
  isOpen?: boolean;
}

type ObjectType = { [key: string]: any };
type KeyOrderType = { name: string };

function sortObjectKeysByArray(
  obj: ObjectType,
  orderArray: KeyOrderType[]
): ObjectType {
  const result: ObjectType = {};
  for (const { name } of orderArray) {
    if (name in obj) {
      result[name] = obj[name];
    }
  }
  return result;
}

function removeEmptyArrays<T extends Record<string, any>>(obj: T): T {
  const newObj = JSON.parse(JSON.stringify(obj));
  for (const key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      if (Array.isArray(newObj[key]) && newObj[key].length === 0) {
        delete newObj[key];
      } else if (newObj[key] !== null && typeof newObj[key] === "object") {
        newObj[key] = removeEmptyArrays(newObj[key]);
      }
    }
  }
  return newObj;
}

export default function InteractiveBox({
  params,
  components,
  examples,
  onParamChange,
  drawerLabel,
  closeComplexTypeView,
  isOpen = false
}: InteractiveBoxProps) {
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(null);
  const [defaultFormData, setDefaultFormData] = useState<any>({});
  const [currentFormData, setCurrentFormData] = useState<any>({});
  const [isFormReseted, setIsFormReseted] = useState(false);
  const [currentSchemaId, setCurrentSchemaId] = useState("");
  const [objectPropertyBeforeEdit, setObjectPropertyBeforeEdit] = useState(null);
  const [objectValueBeforeEdit, setObjectValueBeforeEdit] = useState(null);
  const formRef = useRef(null);
  const { colorMode } = useColorMode();
  const { isComplexTypeView } = useContext(ParserOpenRPCContext);
  const { metaMaskAccount } = useContext(MetamaskProviderContext);
  const addWalletId = (propName) => ({[propName]: metaMaskAccount})
  const getObjectWithAddress = (value) => {
    const addressField = "address"
    const fromField = "from"
    if (Object.keys(value).includes(addressField)) {
      return {
        ...value,
        ...addWalletId(addressField)
      }
    }
    if (Object.keys(value).includes(fromField)) {
      return {
        ...value,
        ...addWalletId(fromField)
      }
    }
    return value
  }

  const checkName = (name: string) => {
    if (name === "requestPermissionObject") return "requestPermissionsObject";
    return name;
  }

  useEffect(() => {
    if (examples && examples.length > 0 && examples[0].params) {
      const defaultValues = Object.fromEntries(
        examples[0].params.map(({ name, value }) => {
          if (metaMaskAccount) {
            if (name === "Address" || name === "From") {
              return [checkName(name), metaMaskAccount];
            }
            if (isPlainObject(value)) {
              return [checkName(name), getObjectWithAddress(value)];
            }
          }
          if (isPlainObject(value)) {
            return [
              checkName(name),
              Object.fromEntries(Object.entries(value).map(([key, val]) => [key, isPlainObject(val) && val?.description ? val.value : val]))
            ];
          }
          return [checkName(name), value];
        })
      );
      setDefaultFormData({ ...defaultValues });
      setCurrentFormData({ ...defaultValues });
      onParamChange({ ...defaultValues });
    }
  }, [examples, metaMaskAccount]);

  const schema: RJSFSchema = {
    components: {
      schemas: components,
    },
    type: "object",
    // @ts-ignore
    properties: Object.fromEntries(
      params.map(({ name, schema }) => [name, schema])
    ),
  };
  const uiSchema: UiSchema = {
    "ui:globalOptions": {
      label: false,
    },
    "ui:widget": "checkbox",
  };
  const templates = {
    BaseInputTemplate,
    ArrayFieldTemplate,
    WrapIfAdditionalTemplate,
    ObjectFieldTemplate,
    FieldErrorTemplate: () => null,
    ErrorListTemplate: () => null,
    ButtonTemplates: { AddButton, RemoveButton },
  };
  const widgets: RegistryWidgetsType = {
    CheckboxWidget: DropdownWidget,
    SelectWidget: SelectWidget,
  };
  const fields: RegistryFieldsType = {
    // @ts-ignore
    AnyOfField: ConditionalField,
    // @ts-ignore
    OneOfField: ConditionalField,
  };
  const handleResetForm = (e) => {
    e.preventDefault();
    setCurrentFormData({ ...defaultFormData });
    onParamChange({ ...defaultFormData });
    setIsFormReseted(true);
  };
  const handleClearForm = (e) => {
    e.preventDefault();
    if (formRef) {
      formRef?.current?.reset();
    }
  };
  const isLightTheme = colorMode === "light";

  useEffect(() => {
    const dereferenceSchema = async () => {
      try {
        if (schema) {
          setParsedSchema((await $RefParser.dereference(schema)) as RJSFSchema);
        }
      } catch (error) {
        console.error("Error of parsing schema:", error);
      }
    };
    dereferenceSchema();
  }, []);

  const onChangeHandler = (data) => {
    const validData = removeEmptyArrays(data);
    if (isOpen) {
      setCurrentFormData(validData);
      onParamChange(validData);
    }
  };

  const cloneAndSetNullIfExists = (obj, key) => {
    if (typeof obj !== "object" || obj === null) return obj;
    const newObj = Array.isArray(obj) ? [] : {};
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop === key) {
          newObj[prop] = [];
        } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
          newObj[prop] = cloneAndSetNullIfExists(obj[prop], key);
        } else {
          newObj[prop] = obj[prop];
        }
      }
    }
    return newObj;
  };

  const cloneObjectAndSetNullIfExists = (obj, key) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    let newObj = {};
    if (Object.keys(obj).length >= 1) {
      newObj = objectValueBeforeEdit;
    } else {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (Object.keys(obj).length === 0) {
            newObj[prop] = {};
          } else if (typeof obj[prop] === "object" && obj[prop] !== null) {
            newObj[objectPropertyBeforeEdit] = cloneObjectAndSetNullIfExists(
              obj[prop],
              key
            );
          } else {
            newObj[prop] = obj[prop];
          }
        }
      }
    }
    return newObj;
  };

  const handleCancelClick = () => {
    if (drawerLabel) {
      const currentKey = Object.keys(currentFormData)[0];
      if (objectPropertyBeforeEdit && currentKey) {
        const upData = cloneObjectAndSetNullIfExists(
          currentFormData[currentKey],
          objectPropertyBeforeEdit
        );
        setCurrentFormData({ [currentKey]: upData });
        setObjectPropertyBeforeEdit(null);
        setObjectValueBeforeEdit(null);
      } else {
        const upData = cloneAndSetNullIfExists(currentFormData, drawerLabel);
        setCurrentFormData(upData);
      }
    }
    closeComplexTypeView();
  };

  return parsedSchema ? (
    <>
      <div className={styles.tableHeadingRow}>
        <div className={clsx(styles.tableHeadingColumn, 'font-weight-medium')}>Parameter</div>
        <div className={clsx(styles.tableHeadingColumn, 'font-weight-medium')}>Value</div>
      </div>
      <Form
        schema={parsedSchema}
        formData={currentFormData}
        formContext={{
          currentSchemaId,
          isFormReseted,
          setCurrentSchemaId,
          objectPropertyBeforeEdit,
          setObjectPropertyBeforeEdit,
          setObjectValueBeforeEdit,
          currentFormData,
          setCurrentFormData,
          onParamChange,
        }}
        validator={validator}
        liveValidate={isOpen}
        noHtml5Validate
        onChange={(data) => {
          const orderData = sortObjectKeysByArray(data.formData, params);
          onChangeHandler(orderData);
        }}
        templates={templates}
        uiSchema={uiSchema}
        widgets={widgets}
        ref={formRef}
        fields={fields}
      >
        <div
          className={clsx(
            styles.tableFooterRow,
            isLightTheme
              ? styles.tableFooterRowLight
              : styles.tableFooterRowDark
          )}
        >
          <div className={clsx(styles.footerButtons, styles.footerButtonsLeft)}>
            <Tooltip message="Reset fields">
              <button className={styles.footerButtonLeft} onClick={handleResetForm}>
                <ResetIcon className={styles.footerButtonIcon} />
              </button>
            </Tooltip>
            <Tooltip message="Clear fields">
              <button className={styles.footerButtonLeft} onClick={handleClearForm}>
                <ClearIcon className={styles.footerButtonIcon} />
              </button>
            </Tooltip>
          </div>
          {isComplexTypeView ? (
            <div className={clsx(styles.footerButtons)}>
              <button
                className={clsx(
                  global.secondaryBtn,
                  styles.footerButtonRight,
                  styles.footerButtonRightOutline
                )}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className={clsx(global.primaryBtn, styles.footerButtonRight)}
                onClick={closeComplexTypeView}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </Form>
    </>
  ) : null;
}

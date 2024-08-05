import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "@rjsf/core";
import clsx from "clsx";
import {
  RJSFSchema,
  UiSchema,
  RegistryWidgetsType,
  RegistryFieldsType,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import {
  MethodExample,
  MethodParam,
  SchemaComponents,
} from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { ArrayFieldTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/ArrayFieldTemplate";
import { ConditionalField } from "@site/src/components/ParserOpenRPC/InteractiveBox/fields/ConditionalField";
import { DropdownWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/DropdownWidget";
import { SelectWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/SelectWidget";
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";
import { useColorMode } from "@docusaurus/theme-common";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";

interface InteractiveBoxProps {
  params: MethodParam[];
  components: SchemaComponents;
  examples: MethodExample[];
  onParamChange: (data) => void;
  drawerLabel?: string | null;
  closeComplexTypeView?: () => void;
}

export default function InteractiveBox({
  params,
  components,
  examples,
  onParamChange,
  drawerLabel,
  closeComplexTypeView,
}: InteractiveBoxProps) {
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(null);
  const [defaultFormData, setDefaultFormData] = useState<any>({});
  const [currentFormData, setCurrentFormData] = useState<any>({});
  const [isFormReseted, setIsFormReseted] = useState(false);
  const formRef = useRef(null);
  const { colorMode } = useColorMode();
  const { isComplexTypeView } = useContext(ParserOpenRPCContext);

  useEffect(() => {
    if (examples && examples.length > 0 && examples[0].params) {
      const defaultValues = Object.fromEntries(examples[0].params.map(({ name, value }) => [name, value]));
      setDefaultFormData({...defaultValues});
      setCurrentFormData({...defaultValues});
      onParamChange({...defaultValues});
    }
  }, [examples]);

  const schema: RJSFSchema = {
    components: {
      schemas: components,
    },
    type: "object",
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
    FieldErrorTemplate: () => null,
    ErrorListTemplate: () => null,
  };
  const widgets: RegistryWidgetsType = {
    CheckboxWidget: DropdownWidget,
    SelectWidget: SelectWidget,
  };
  const fields: RegistryFieldsType = {
    AnyOfField: ConditionalField,
    OneOfField: ConditionalField,
  };
  const handleResetForm = (e) => {
    e.preventDefault();
    setCurrentFormData({...defaultFormData});
    onParamChange({...defaultFormData});
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
    setCurrentFormData({...data});
    onParamChange({...data});
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

  const handleCancelClick = () => {
    if (drawerLabel) {
      const upData = cloneAndSetNullIfExists(currentFormData, drawerLabel);
      setCurrentFormData(upData);
    }
    closeComplexTypeView();
  };

  return parsedSchema ? (
    <>
      <div className={styles.tableHeadingRow}>
        <div className={styles.tableHeadingColumn}>Parameter</div>
        <div className={styles.tableHeadingColumn}>Value</div>
      </div>
      <Form
        schema={parsedSchema}
        formData={currentFormData}
        formContext={{ isFormReseted }}
        validator={validator}
        liveValidate
        noHtml5Validate
        onChange={(data) => {
          onChangeHandler(data.formData);
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
              <button
                className={styles.footerButtonLeft}
                onClick={handleResetForm}
              >
                <img
                  className={styles.footerButtonIcon}
                  src="/img/icons/reset-icon.svg"
                />
              </button>
            </Tooltip>
            <Tooltip message="Clear fields">
              <button
                className={styles.footerButtonLeft}
                onClick={handleClearForm}
              >
                <img
                  className={styles.footerButtonIcon}
                  src="/img/icons/clear-icon.svg"
                />
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

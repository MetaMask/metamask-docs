import React, { useContext, useEffect, useRef, useState } from "react";
import Form from "@rjsf/core";
import clsx from "clsx";
import { RJSFSchema, UiSchema, RegistryWidgetsType } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { MethodExample, MethodParam, SchemaComponents } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { DropdownWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/DropdownWidget";
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";
import { useColorMode } from "@docusaurus/theme-common";
import { ArrayFieldTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/ArrayFieldTemplate";
import { ParserOpenRPCContext } from "@site/src/components/ParserOpenRPC";

interface InteractiveBoxProps {
  params: MethodParam[];
  components: SchemaComponents;
  examples: MethodExample[];
  onParamChange: (data) => void;
}

export default function InteractiveBox({ params, components, examples, onParamChange }: InteractiveBoxProps) {
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(null);
  const [defaultFormData, setDefaultFormData] = useState<any>({});
  const [isFormReseted, setIsFormReseted] = useState(false);
  const [isComplexTypeView, setIsComplexTypeView] = useState(false);
  const formRef = useRef(null);
  const { colorMode } = useColorMode();
  const { setIsDrawerContentFixed, setDrawerLabel } = useContext(ParserOpenRPCContext);

  const defaultExampleFormData = examples ? Object.fromEntries(examples[0].params.map(({ name, value }) => [name, value])) : {};
  const schema: RJSFSchema = {
    "components": {
      "schemas": components,
    },
    "type": "object",
    "properties": Object.fromEntries(params.map(({ name, schema }) => [name, schema])),
  };
  const uiSchema: UiSchema = {
    "ui:globalOptions": {
      label: false,
    },
    "ui:widget": "checkbox",
  };
  const widgets: RegistryWidgetsType = {
    CheckboxWidget: DropdownWidget,
  };
  const log = (type) => console.log.bind(console, type);
  const handleResetForm = (e) => {
    e.preventDefault();
    setDefaultFormData(defaultExampleFormData);
    setIsFormReseted(true);
  };
  const handleClearForm = (e) => {
    e.preventDefault();
    if (formRef) {
      formRef?.current?.reset();
    }
  };
  const isLightTheme = colorMode === "light"

  useEffect(() => {
    const dereferenceSchema = async () => {
      try {
        if (schema) {
          setParsedSchema(await $RefParser.dereference(schema) as RJSFSchema);
        }
      } catch (error) {
        console.error("Error of parsing schema:", error);
      }
    };
    dereferenceSchema();
    if (examples) {
      setDefaultFormData(defaultExampleFormData);
      onParamChange(defaultExampleFormData);
    }
  }, []);

  const onChangeHandler = (data) => {
    onParamChange(data);
  };

  const closeComplexTypeView = () => {
    setIsComplexTypeView(false);
    setIsDrawerContentFixed(false);
    setDrawerLabel(null);
  }

  const handleCancelClick = () => {
    closeComplexTypeView();
  }

  return parsedSchema ? (
    <>
      <div className={styles.tableHeadingRow}>
        <div className={styles.tableHeadingColumn}>
          Parameter
        </div>
        <div className={styles.tableHeadingColumn}>
          Value
        </div>
      </div>
      <Form
        schema={parsedSchema}
        formData={defaultFormData}
        formContext={{ isFormReseted, setIsComplexTypeView, isComplexTypeView }}
        validator={validator}
        liveValidate
        noHtml5Validate
        onChange={(data) => {
          console.log('changed', data);
          onChangeHandler(data.formData);
          setDefaultFormData(data.formData);
        }}
        onSubmit={() => {log("submitted");}}
        onError={log("errors")}
        templates={{
          BaseInputTemplate,
          ArrayFieldTemplate,
          FieldErrorTemplate: () => null,
          ErrorListTemplate: () => null,
        }}
        uiSchema={uiSchema}
        widgets={widgets}
        ref={formRef}
      >
        <div className={clsx(styles.tableFooterRow, isLightTheme ? styles.tableFooterRowLight : styles.tableFooterRowDark)}>
          <div className={clsx(styles.footerButtons, styles.footerButtonsLeft)}>
            <Tooltip message="Reset fields" theme={isLightTheme ? "dark" : "light"}>
              <button className={styles.footerButtonLeft} onClick={handleResetForm}>
                <img className={styles.footerButtonIcon} src="/img/icons/reset-icon.svg"/>
              </button>
            </Tooltip>
            <Tooltip message="Clear fields" theme={isLightTheme ? "dark" : "light"}>
              <button
                className={styles.footerButtonLeft}
                onClick={handleClearForm}
              >
                <img className={styles.footerButtonIcon} src="/img/icons/clear-icon.svg"/>
              </button>
            </Tooltip>
          </div>
          {isComplexTypeView ?
            <div className={clsx(styles.footerButtons)}>
              <button className={clsx(styles.footerButtonRight, styles.footerButtonRightOutline)} onClick={handleCancelClick}>
                Cancel
              </button>
              <button className={clsx(global.primaryBtn, styles.footerButtonRight)} onClick={closeComplexTypeView}>
                Back
              </button>
            </div> :
            null
          }
        </div>
      </Form>
    </>
  ) : null;
}

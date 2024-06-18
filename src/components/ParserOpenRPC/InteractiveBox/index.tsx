import React, { useEffect, useRef, useState } from "react";
import Form from "@rjsf/core";
import { RJSFSchema, UiSchema, RegistryWidgetsType } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import { MethodExample, MethodParam, SchemaComponents } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import { BaseInputTemplate } from "@site/src/components/ParserOpenRPC/InteractiveBox/templates/BaseInputTemplate";
import { DropdownWidget } from "@site/src/components/ParserOpenRPC/InteractiveBox/widgets/DropdownWidget";
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";


interface InteractiveBoxProps {
  method: string;
  params: MethodParam[];
  components: SchemaComponents;
  examples: MethodExample[];
}

export default function InteractiveBox({ method, params, components, examples }: InteractiveBoxProps) {
  console.log("method_name___", method);
  console.log("method_params___", params);
  console.log("examples", examples);
  const [parsedSchema, setParsedSchema] = useState<RJSFSchema>(null);
  const [defaultFormData, setDefaultFormData] = useState<any>({});
  const [isFormReseted, setIsFormReseted] = useState(false);
  const formRef = useRef(null);

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

  useEffect(() => {
    const dereferenceSchema = async () => {
      try {
        if (schema) {
          setParsedSchema(await $RefParser.dereference(schema));
        }
      } catch (error) {
        console.error("Error of parsing schema:", error);
      }
    };
    dereferenceSchema();
    if (examples) {
      setDefaultFormData(defaultExampleFormData);
    }
  }, []);

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
        formContext={{ isFormReseted }}
        validator={validator}
        liveValidate
        noHtml5Validate
        onChange={log("changed")}
        onSubmit={() => {log("submitted");}}
        onError={log("errors")}
        templates={{
          BaseInputTemplate,
          FieldErrorTemplate: () => null,
          ErrorListTemplate: () => null,
        }}
        uiSchema={uiSchema}
        widgets={widgets}
        ref={formRef}
      >
        <div className={styles.tableFooterRow}>
          <div className={styles.footerButtons}>
            <Tooltip message="Reset fields">
              <button className={styles.footerButton} onClick={handleResetForm}>
                <img className={styles.footerButtonIcon} src="/img/icons/reset-icon.svg"/>
              </button>
            </Tooltip>
            <Tooltip message="Clear fields">
              <button
                className={styles.footerButton}
                onClick={handleClearForm}
              >
                <img className={styles.footerButtonIcon} src="/img/icons/clear-icon.svg"/>
              </button>
            </Tooltip>
          </div>
        </div>
      </Form>
    </>
  ) : null;
}

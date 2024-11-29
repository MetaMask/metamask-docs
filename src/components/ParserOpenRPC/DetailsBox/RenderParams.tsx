import React from "react";
import { SchemaProperty } from "./SchemaProperty";
import { CollapseBox } from "../CollapseBox/CollapseBox";
import styles from "./styles.module.css";

const getRefSchemaFromComponents = (initRef, components) => {
  const ref = initRef.replace("#/components/schemas/", "");
  return components[ref];
};

const renderSchema = (schemaItem, schemas, name, mainDescr = "") => {
  if (!schemaItem) return <div>Invalid schema</div>;

  const resolveRef = (ref) => {
    const mainDescr = schemaItem.description;
    const newSchema = getRefSchemaFromComponents(ref, schemas);
    return renderSchema(newSchema, schemas, name, mainDescr);
  };

  if (schemaItem?.schema?.$ref) return resolveRef(schemaItem.schema.$ref);
  if (schemaItem?.$ref) return resolveRef(schemaItem.$ref);

  const renderObject = (item, itemName) => (
    <div>
      <SchemaProperty
        title={itemName || item.title}
        type="object"
        required={schemaItem.required || !!item.required}
        description={mainDescr || schemaItem.description || item.description || item.title || ""}
        pattern={item.pattern}
        defaultVal={item.default}
      />
      <div className="padding-bottom--md">
        <CollapseBox>
          <>
            {Object.entries(item.properties).map(([key, value]) => (
              <div key={key} className={styles.paramItemWrapper}>
                {renderSchema(value, schemas, key)}
              </div>
            ))}
          </>
        </CollapseBox>
      </div>
    </div>
  );

  if (schemaItem?.schema?.type === "object" && schemaItem?.schema?.properties) {
    return renderObject(schemaItem.schema, name || schemaItem?.schema?.title);
  }

  if (schemaItem.type === "object" && schemaItem.properties) {
    return renderObject(schemaItem, name || schemaItem.title);
  }

  const renderArray = (item, itemName) => (
    <div>
      <SchemaProperty
        title={itemName || item.title}
        type="array"
        required={schemaItem.required || !!item.required}
        description={schemaItem.description || item.description || item.title || ""}
        pattern={schemaItem.pattern}
        defaultVal={schemaItem.default}
      />
      <div className="padding-bottom--md">
        <CollapseBox>
          <div className={styles.paramItemWrapper}>
            {renderSchema(item.items, schemas, "")}
          </div>
        </CollapseBox>
      </div>
    </div>
  );

  if (schemaItem.type === "array" && schemaItem.items) {
    return renderArray(schemaItem, name || schemaItem.title);
  }

  if (schemaItem?.schema?.type === "array" && schemaItem?.schema?.items) {
    return renderArray(schemaItem.schema, name || schemaItem.schema.title);
  }

  const renderCombinations = (item, itemName, type) => (
    <div>
      <SchemaProperty
        title={itemName || item.title}
        type={type}
        required={schemaItem.required || !!item.required}
        description={item.description || item.title || ""}
        pattern={item.pattern}
        defaultVal={item.default}
      />
      <div className="padding-bottom--md">
        <CollapseBox>
          {item[type].map((option, index) => (
            <div key={`${index}`} className={styles.paramItemWrapper}>
              {renderSchema(option, schemas, option.title)}
            </div>
          ))}
        </CollapseBox>
      </div>
    </div>
  );

  if (schemaItem?.schema?.oneOf) return renderCombinations(schemaItem.schema, name, "oneOf");
  if (schemaItem?.schema?.allOf) return renderCombinations(schemaItem.schema, name, "allOf");
  if (schemaItem?.schema?.anyOf) return renderCombinations(schemaItem.schema, name, "anyOf");

  if (schemaItem.oneOf) return renderCombinations(schemaItem, name, "oneOf");
  if (schemaItem.allOf) return renderCombinations(schemaItem, name, "allOf");
  if (schemaItem.anyOf) return renderCombinations(schemaItem, name, "anyOf");

  const renderEnum = (enumValues) => {
    return (
      <div className={styles.enumWrapper}>
        <span className={styles.propItemLabel}>Enum:</span>
        {enumValues.map((value, index) => (
          <div key={index} className={styles.propItemValue}>
            {`"${value}"`}
          </div>
        ))}
      </div>
    );
  };

  if (schemaItem?.schema) {
    return (
      <div>
        <SchemaProperty
          title={name || schemaItem.schema.title}
          type={schemaItem.schema.enum ? "enum" : schemaItem.schema.type}
          required={!!schemaItem.required}
          description={
            mainDescr || schemaItem.description || schemaItem.schema.description || schemaItem.schema.title || ""
          }
          pattern={schemaItem.schema.pattern || schemaItem.pattern}
          defaultVal={schemaItem.schema.default || schemaItem.default}
        />
        {schemaItem.schema.enum && renderEnum(schemaItem.schema.enum)}
      </div>
    );
  }

  return (
    <div>
      <SchemaProperty
        title={name || schemaItem.title}
        type={schemaItem.enum ? "enum" : schemaItem.type}
        required={!!schemaItem.required}
        description={mainDescr || schemaItem.description || schemaItem.title}
        pattern={schemaItem.pattern}
        defaultVal={schemaItem.default}
      />
      {schemaItem.enum && renderEnum(schemaItem.enum)}
    </div>
  );
};

export const renderParamSchemas = (inputSchema, schemas) => {
  return (
    <>
      {inputSchema.map((item, i) => {
        return (
          <div key={`${i}`}>
            {renderSchema(item, schemas, item.name)}
            {i < inputSchema.length - 1 && <hr className={styles.paramSeparator} />}
          </div>
        );
      })}
    </>
  );
};

export const renderResultSchemas = (inputSchema, schemas) => {
  const customResult = inputSchema?.schema?.maxPriorityFeePerGas;
  if (customResult) {
    return <>{renderSchema(customResult, schemas, inputSchema.name)}</>
  }
  return <>{renderSchema(inputSchema, schemas, inputSchema.name)}</>;
};

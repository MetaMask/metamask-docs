import { SchemaProperty, renderEnum } from "./SchemaProperty";
import { CollapseBox } from "../CollapseBox/CollapseBox";
import styles from "./styles.module.css";

const getRefSchemaFromComponents = (initRef, components) => {
  const ref = initRef.replace("#/components/schemas/", "");
  return components[ref];
};

const renderSchema = (schemaItem, schemas, name) => {
  if (!schemaItem) return <div>Invalid schema</div>;

  const resolveRef = (ref) => {
    const newSchema = getRefSchemaFromComponents(ref, schemas);
    return renderSchema(newSchema, schemas, name);
  };

  if (schemaItem?.schema?.$ref) return resolveRef(schemaItem.schema.$ref);
  if (schemaItem?.$ref) return resolveRef(schemaItem.$ref);

  const renderObject = (item, itemName) => (
    <div>
      <SchemaProperty
        title={itemName || item.title}
        type="object"
        required={!!item.required}
        description={item.description || item.title || ""}
      />
      <div className="padding-bottom--md">
        <CollapseBox>
          {Object.entries(item.properties).map(([key, value]) => (
            <div key={key} className={styles.paramItemWrapper}>
              {renderSchema(value, schemas, value.title)}
            </div>
          ))}
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
        required={!!item.required}
        description={item.description || item.title || ""}
      />
      <div className="padding-bottom--md">
        <CollapseBox>
          <div className={styles.paramItemWrapper}>
            {renderSchema(item.items, schemas)}
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
        required={!!item.required}
        description={item.description || item.title || ""}
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

  if (schemaItem.oneOf) return renderCombinations(schemaItem, name, "oneOf");
  if (schemaItem.allOf) return renderCombinations(schemaItem, name, "allOf");
  if (schemaItem.anyOf) return renderCombinations(schemaItem, name, "anyOf");

  if (schemaItem?.schema) {
    return (
      <div>
        <SchemaProperty
          title={name || schemaItem.schema.title}
          type={schemaItem.schema.type}
          required={!!schemaItem.required}
          description={schemaItem.schema.description || schemaItem.schema.title || ""}
        />
        {schemaItem.schema.enum && renderEnum(schemaItem.schema.enum)}
      </div>
    );
  }

  return (
    <div>
      <SchemaProperty
        title={name || schemaItem.title}
        type={schemaItem.type}
        required={!!schemaItem.required}
        description={schemaItem.description || schemaItem.title || ""}
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
          <div key={`${i}`} className={styles.borderTopLine}>
            {renderSchema(item, schemas, item.name)}
          </div>
        );
      })}
    </>
  );
};

export const renderResultSchemas = (inputSchema, schemas) => {
  return (
    <>
      {renderSchema(inputSchema, schemas, inputSchema.name)}
    </>
  );
};

import { SchemaProperty, renderEnum } from "./SchemaProperty";
import { CollapseBox } from "../CollapseBox/CollapseBox";
import styles from "./styles.module.css";

export const parseSchema = (inputSchema, schemas) => {
  const renderSchema = (schema, schemas) => {
    if (!schema) return <div>Invalid schema</div>;

    if (schema.$ref) {
      const ref = schema.$ref.replace("#/components/schemas/", "");
      const referencedSchema = schemas[ref];
      return renderSchema(referencedSchema, schemas);
    }

    if (schema.type === "object" && schema.properties) {
      return (
        <div key={schema.title} className={styles.paramItemWrapper}>
          <SchemaProperty
            title={schema.title}
            type={schema.type}
            required={!!schema.required}
            description={schema.description || ""}
          />
          <div className="padding-bottom--md">
            <CollapseBox>
              {Object.entries(schema.properties).map(([key, value]) => {
                const schemaRef = value?.$ref?.replace("#/components/schemas/", "");
                const newRef = () => {
                  if (schemaRef) {
                    return schemas[schemaRef.replace("#/components/schemas/", "")];
                  }
                  return undefined;
                };
                const updatedSchema = newRef();

                return (
                  <div key={key}>
                    {value && value.title && (
                      <div className={styles.paramItemWrapper}>
                        <SchemaProperty
                          title={value.title}
                          type={updatedSchema ? updatedSchema.type : value.type}
                          required={schema.required ? schema.required.includes(key) : false}
                          description={updatedSchema ? updatedSchema.title : value.description}
                        />
                        {/* {value.$ref && schemas[value.$ref.replace('#/components/schemas/', '')] && (
                          <>
                            {renderSchema(schemas[value.$ref.replace('#/components/schemas/', '')], schemas)}
                          </>
                        )} */}
                      </div>
                    )}
                    {value && !value.title && value.description && (
                      <div className={styles.paramItemWrapper}>
                        <SchemaProperty
                          title={key}
                          type={updatedSchema ? updatedSchema.type : value.type}
                          required={schema.required ? schema.required.includes(key) : false}
                          description={updatedSchema ? updatedSchema.title : value.description}
                        />
                      </div>
                    )}
                  </div>
                );})}
            </CollapseBox>
          </div>
        </div>
      );
    }

    if (schema.type === "array" && schema.items) {
      const itemSchemaRef = schema.items.$ref;
      const itemSchemaName = itemSchemaRef ? itemSchemaRef.replace("#/components/schemas/", "") : null;
      const itemSchema = itemSchemaName ? schemas[itemSchemaName] : null;
      return (
        <div key={schema.title} className={styles.paramItemWrapper}>
          <SchemaProperty
            title={schema.title}
            type={schema.type}
            required={!!schema.required}
            description={schema.description || ""}
          />
          {itemSchema && (
            <CollapseBox>{renderSchema(itemSchema, schemas)}</CollapseBox>
          )}
        </div>
      );
    }

    if (schema.oneOf || schema.allOf || schema.anyOf) {
      const schemaType = () => {
        if (schema.oneOf) return "oneOf";
        if (schema.allOf) return "allOf";
        return "anyOf";
      };
      return (
        <div key={schema.title} className={styles.paramItemWrapper}>
          <SchemaProperty
            title={schema.name || schema.title || inputSchema.name}
            type={schemaType()}
            required={!!schema.required}
            description={schema.description || ""}
          />
          <div className="padding-bottom--md">
            <CollapseBox>
              {schema.oneOf && schema.oneOf.map((option, index) => (
                <div key={`${index}`}>
                  {renderSchema(option, schemas)}
                </div>
              ))}
              {schema.allOf && schema.allOf.map((option, index) => (
                <div key={`${index}`}>
                  {renderSchema(option, schemas)}
                </div>
              ))}
              {schema.anyOf && schema.anyOf.map((option, index) => (
                <div key={`${index}`}>
                  {renderSchema(option, schemas)}
                </div>
              ))}
            </CollapseBox>
          </div>
        </div>
      );
    }

    return (
      <>
        {schema.title && (
          <div
            key={schema.title}
            className={styles.paramItemWrapper}
          >
            <SchemaProperty
              title={schema.title}
              type={schema.type}
              required={!!schema.required}
              description={schema.description || schema.summary}
            />
            {schema.enum && renderEnum(schema.enum)}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {Array.isArray(inputSchema) ? (
        <>
          {inputSchema.map((param, index) => (
            <div key={`${index}`}>
              {param.type && (
                <SchemaProperty
                  title={param.name}
                  type={param.type}
                  required={!!param.required}
                  description={param.description || param.summary}
                />
              )}
              {!param.type && param.schema.type && (
                <>
                  <SchemaProperty
                    title={param.name}
                    type={param.schema.type}
                    required={!!param.required}
                    description={param.schema.description}
                  />
                  {param.schema?.enum && renderEnum(param.schema?.enum)}
                </>
              )}
              {renderSchema(param.schema, schemas)}
            </div>
          ))}
        </>
      ) : (
        <>
          {renderSchema(inputSchema.schema, schemas)}
        </>
      )}
    </>
  );
};

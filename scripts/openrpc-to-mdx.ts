import fs from "fs";
import { OpenrpcDocument, MethodObject, JSONSchemaObject, MethodOrReference, ExampleObject, ExamplePairingObject, ContentDescriptorObject } from "@open-rpc/meta-schema";
import {  parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
console.log("Generating MDX from OpenRPC document...");

const OpenRPCDocumentUrl = "https://metamask.github.io/api-specs/latest/openrpc.json";

const convertJsonSchemaToMarkdown = (schema: JSONSchemaObject, indentationLevel: number): string => {
  let markdown = "";
  if (indentationLevel === 0) {
    indentationLevel = 4;
  }

  const SPACE = " ";
  const indentation = SPACE.repeat(indentationLevel);


  const writeDescription = () => {
    if (schema.title) {
      markdown += `${indentation}${SPACE.repeat(4)}title: ${schema.title}<br />`;
    }
    if (schema.description) {
      markdown += `${indentation}${SPACE.repeat(4)}description: ${schema.description}<br />`;
    }
  };


  if (schema.allOf) {
    markdown += `${indentation} allOf:\n`;
    schema.allOf.forEach((allOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(allOfSchema, indentationLevel + 4);
    });
  } else if (schema.anyOf) {
    markdown += `${indentation} anyOf:\n`;
    schema.anyOf.forEach((anyOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(anyOfSchema, indentationLevel + 4);
    });
  } else if (schema.oneOf) {
    markdown += `${indentation} oneOf:\n`;
    schema.oneOf.forEach((oneOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(oneOfSchema, indentationLevel + 4);
    });
  } else if (schema.type === "object") {
    markdown += `${indentation}  object\n`;
    writeDescription();
  } else if (schema.type === "array") {
    markdown += `${indentation} array\n`;
    writeDescription();
    if (schema.items) {
      markdown += `${indentation}  items:\n`;
      markdown += convertJsonSchemaToMarkdown(schema.items, indentationLevel + 8);
    }
  } else if (schema.type === "string") {
    markdown += `${indentation} string\n`;
    writeDescription();
  } else if (schema.type === "number") {
    markdown += `${indentation} number\n`;
    if (schema.minimum) {
      markdown += `${indentation}${SPACE.repeat(4)}minimum: ${schema.minimum}\n`;
    }
    if (schema.maximum) {
      markdown += `${indentation}${SPACE.repeat(4)}maximum: ${schema.maximum}\n`;
    }
    if (schema.enum) {
      markdown += `${indentation}${SPACE.repeat(4)}enum: ${schema.enum.join(" ")}\n`;
    }
    writeDescription();
  } else if (schema.type === "integer") {
    markdown += `${indentation} integer\n`;

    if (schema.format) {  
      markdown += `${indentation}${SPACE.repeat(4)}format: ${schema.format}\n`;
    }

    if (schema.minimum) {
      markdown += `${indentation}${SPACE.repeat(4)}minimum: ${schema.minimum}\n`;
    }
    if (schema.maximum) {
      markdown += `${indentation}${SPACE.repeat(4)}maximum: ${schema.maximum}\n`;
    }
    writeDescription();
  } else if (schema.type === "boolean") {
    markdown += `${indentation} boolean\n`;
    writeDescription();
  }


  if (schema.type === "object" && schema.properties) {
    markdown += `${indentation}${SPACE.repeat(4)}properties:\n`;
    for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
      markdown += `${indentation}${SPACE.repeat(8)}${propertyName}:\n`;
      markdown += convertJsonSchemaToMarkdown(propertySchema, indentationLevel + 12);
    }
  }
  return markdown;
};


const renderContentDescriptor = (contentDescriptor: ContentDescriptorObject, index: number): string => {
  const param = contentDescriptor;
  let markdown = "";
  markdown += `${index + 1}. _${param.name}_${param.required ? " **(required)**" : ""}: `;
  if (param.schema) {
    let typeString = param.schema.type;
    if (param.schema.type === "array") {
      if (param.schema.items.type === "object" || param.schema.items.type === "array") {
        typeString = `${param.schema.items.title}[]`;
      } else {
        typeString = `${param.schema.items.type}[]`;
      }
    }
    if (param.schema.type === "object") {
      if (param.schema.title) {
        typeString = `${param.schema.title}`;
      } else {
        typeString = param.schema.type;
      }
    }

    markdown += "`" + typeString + "`";
  }
  if (param.summary) {
    markdown += `${param.summary}`;
  }

  markdown += "\n";

  if (param.description) {
    markdown += `\n- ${param.description}\n`;
  }
  return markdown;
};


const openRPCToMarkdown = async (doc: OpenrpcDocument): Promise<string> => {
  const openrpcDocument = await parseOpenRPCDocument(doc as any); //dereffed. maybe we dont want to
  let markdown = "";

  openrpcDocument.methods.forEach((m: MethodOrReference)  => {
    const method = m as MethodObject;
    markdown += `## ${method.name}\n\n`;

    markdown += "\n---\n";


    if (method.description) {
      markdown += `${method.description}\n\n`;
    }

    if (method.summary) {
      markdown += `${method.summary}\n\n`;
    }

    markdown += `### Params (${method.params.length}) \n\n`;

    if (method.params.length > 0) {
      markdown += method.params.map(renderContentDescriptor).join("\n");
    }

    if (method.result) {
      markdown += "### Result\n\n";
      markdown += method.params.map(renderContentDescriptor).join("\n");
    }

    if (method.examples && method.examples.length > 0) {
      markdown += "\n### Examples\n\n";
      method.examples.forEach((e) => {
        const example = e as unknown as ExamplePairingObject;
        if (example.name) {
          markdown += `**Name**: ${example.name}\n\n`;
        }

        markdown += "#### Request\n\n";

        markdown += "```json\n";
        let paramsString = JSON.stringify(example.params.map((param: any) => param.value));
        if (method.paramStructure === "by-position") {
          paramsString = "{";
          example.params.forEach((param: any, index: number) => {
            markdown += `  ${(example.params[index] as ExampleObject).name}: ${JSON.stringify(param.value, null, 4)},\n`;
          });
          paramsString += "}";
        } else {
          paramsString = JSON.stringify(example.params.map((param: any) => param.value), null, 4);
        }
        markdown += JSON.stringify(JSON.parse(`{ "jsonrpc": "2.0", "id": 0, "method": "${method.name}", "params":  ${paramsString} }`), null, 4);
        
        markdown += "\n```\n";

        markdown += "#### Result\n\n";
        markdown += "```json\n";
        markdown += JSON.stringify({ "jsonrpc": "2.0", "id": 0, "result": (example as any).result.value }, null, 4);
        markdown += "\n```\n";
      });
    }
    markdown += "\n";
  });

  return markdown;
};

const main = async () => {
  const openrpcDocument = await fetch(OpenRPCDocumentUrl).then((res) => res.json());
  const mdx = await openRPCToMarkdown(openrpcDocument);
  fs.writeFileSync("api.md", mdx);
};

main();
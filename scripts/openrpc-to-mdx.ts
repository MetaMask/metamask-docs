import fs from "fs";
import { OpenrpcDocument, MethodObject, ContentDescriptorObject, JSONSchemaObject, MethodOrReference } from "@open-rpc/meta-schema";
import {  parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
console.log("Generating MDX from OpenRPC document...");

const OpenRPCDocumentUrl = "https://metamask.github.io/api-specs/latest/openrpc.json";


const convertJsonSchemaToMarkdown = (schema: JSONSchemaObject, indentationLevel: number): string => {
  let markdown = "";
  if (indentationLevel === 0) {
    indentationLevel = 4;
  }

  const SPACE = "&nbsp;";
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
    markdown += `${indentation} allOf:<br />`;
    schema.allOf.forEach((allOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(allOfSchema, indentationLevel + 4);
    });
  } else if (schema.anyOf) {
    markdown += `${indentation} anyOf:<br />`;
    schema.anyOf.forEach((anyOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(anyOfSchema, indentationLevel + 4);
    });
  } else if (schema.oneOf) {
    markdown += `${indentation} oneOf:<br />`;
    schema.oneOf.forEach((oneOfSchema) => {
      markdown += convertJsonSchemaToMarkdown(oneOfSchema, indentationLevel + 4);
    });
  } else if (schema.type === "object") {
    markdown += `${indentation}  object<br />`;
    writeDescription();
  } else if (schema.type === "array") {
    markdown += `${indentation} array<br />`;
    writeDescription();
    if (schema.items) {
      markdown += `${indentation}  items:<br />`;
      markdown += convertJsonSchemaToMarkdown(schema.items, indentationLevel + 8);
    }
  } else if (schema.type === "string") {
    markdown += `${indentation} string<br />`;
    writeDescription();
  } else if (schema.type === "number") {
    markdown += `${indentation} number<br />`;
    if (schema.minimum) {
      markdown += `${indentation}${SPACE.repeat(4)}minimum: ${schema.minimum}<br />`;
    }
    if (schema.maximum) {
      markdown += `${indentation}${SPACE.repeat(4)}maximum: ${schema.maximum}<br />`;
    }
    if (schema.enum) {
      markdown += `${indentation}${SPACE.repeat(4)}enum: ${schema.enum.join(" ")}<br />`;
    }
    writeDescription();
  } else if (schema.type === "integer") {
    markdown += `${indentation} integer<br />`;
    if (schema.minimum) {
      markdown += `${indentation}${SPACE.repeat(4)}minimum: ${schema.minimum}<br />`;
    }
    if (schema.maximum) {
      markdown += `${indentation}${SPACE.repeat(4)}maximum: ${schema.maximum}<br />`;
    }
    writeDescription();
  } else if (schema.type === "boolean") {
    markdown += `${indentation} boolean<br />`;
    writeDescription();
  }


  if (schema.type === "object" && schema.properties) {
    markdown += `${indentation}${SPACE.repeat(4)}properties:<br />`;
    for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
      markdown += `${indentation}${SPACE.repeat(8)}${propertyName}:<br />`;
      markdown += convertJsonSchemaToMarkdown(propertySchema, indentationLevel + 12);
    }
  }
  return markdown;
};

const openRPCToMarkdown = async (doc: OpenrpcDocument): Promise<string> => {
  const openrpcDocument = await parseOpenRPCDocument(doc as any);
  let markdown = "";

  openrpcDocument.methods.forEach((m: MethodOrReference)  => {
    const method = m as MethodObject;
    markdown += `## ${method.name}\n\n`;
    if (method.description) {
      markdown += `${method.description}\n\n`;
    }

    if (method.summary) {
      markdown += `${method.summary}\n\n`;
    }

    if (method.params.length > 0) {
      markdown += "### Params\n\n";
      markdown += "| Name | Summary | Description | Type | \n";
      markdown += "| --- | --- | --- | --- |\n";

      method.params.forEach((param: ContentDescriptorObject) => {
        const typeString = convertJsonSchemaToMarkdown(param.schema, 2);
        markdown += `| \`${param.name}\` | ${param.summary || " "} | ${param.description || " "} | ${typeString || " "}\n`;
      });
    }

    if (method.result) {
      markdown += "### Result\n\n";
      markdown += convertJsonSchemaToMarkdown((method.result as ContentDescriptorObject).schema, 4);
    }

    if (method.examples && method.examples.length > 0) {
      markdown += "### Examples\n\n";
      method.examples.forEach((example) => {
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
import fs from "fs";
import { OpenrpcDocument, MethodObject, MethodOrReference, ExampleObject, ExamplePairingObject, ContentDescriptorObject, JSONSchemaObject } from "@open-rpc/meta-schema";
import {  parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
console.log("Generating MDX from OpenRPC document...");

const OpenRPCDocumentUrl = "https://metamask.github.io/api-specs/latest/openrpc.json";


const renderSchema = (schema: JSONSchemaObject, indendationLevel = 1): string => {
  let markdown = "";
  const indendation = "\t".repeat(indendationLevel);
  
  let typeString = schema.type || "";
  let compositionString = "";
  if (schema.oneOf) {
    compositionString += `\n\n${indendation}One Of  ` + schema.oneOf.map((oneOf: any) => "`" + (oneOf.title || oneOf.type) + "`").join(" OR ");
  } else if (schema.anyOf) {
    compositionString += `\n\n${indendation}Any Of  ` + schema.anyOf.map((anyOf: any) =>  "`" + (anyOf.title || anyOf.type)+ "`").join(" OR ");
  } else if (schema.allOf) {
    compositionString += `\n\n${indendation}All Of  ` + schema.allOf.map((allOf: any) =>  "`" + (allOf.title + allOf.type) + "`").join(" AND ");
  } else if (schema.type === "array") {
    if (schema.items.type === "object" || schema.items.type === "array") {
      typeString = `${schema.items.title}[]`;
    } else {
      typeString = `${schema.items.type}[]`;
    }
  } else if (schema.type === "object") {
    if (schema.title) {
      typeString = schema.type;
    } else {
      typeString = schema.type;
    }
  }

  if (compositionString) {
    markdown += compositionString;
  } else {
    markdown += "`" + typeString + "`";
  }

  return markdown;
};

const renderContentDescriptor = (contentDescriptor: ContentDescriptorObject, index?: number, indendationLevel = 1): string => {
  const param = contentDescriptor;
  let markdown = "";
  const indendation = "\t".repeat(indendationLevel);
  if (index !== undefined) {
    markdown += `${index + 1}. `;
  }
  markdown += `_${param.name}_${param.required ? " **(required)**" : ""}: `;

  if (param.schema) {
    markdown += renderSchema(param.schema as JSONSchemaObject, indendationLevel);
  }
  if (param.summary) {
    markdown += `${param.summary}`;
  }

  markdown += "\n";

  if (param.description) {
    markdown += `\n${index === undefined ? "" : indendation} ${param.description}\n`;
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
      markdown += method.params.map((p, index) => renderContentDescriptor(p as ContentDescriptorObject, index)).join("\n");
    }

    if (method.result) {
      markdown += "### Result\n\n";
      markdown += renderContentDescriptor(method.result as ContentDescriptorObject, undefined, 0);
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
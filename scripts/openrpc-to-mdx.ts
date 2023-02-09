import fs from "fs";
import { OpenrpcDocument, MethodObject, ContentDescriptorObject, JSONSchemaObject } from "@open-rpc/meta-schema";
console.log("Generating MDX from OpenRPC document...");

const OpenRPCDocumentUrl = "https://metamask.github.io/api-specs/latest/openrpc.json";


const convertJsonSchemaToMarkdown = (schema: JSONSchemaObject, indentationLevel: number): string => {
  let markdown = "";
  if (indentationLevel === 0) {
    indentationLevel = 2;
  }
  const indentation = "&nbsp;".repeat(indentationLevel * 2);


  if (schema.type === "object") {
    markdown += `${indentation} object<br />`;
    if (schema.properties) {
      markdown += `${indentation}${indentation} properties:<br />`;
      for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
        markdown += `${indentation}${indentation}${indentation} ${propertyName}:<br />`;
        markdown += convertJsonSchemaToMarkdown(propertySchema, indentationLevel * 4);
      }
    }
  } else if (schema.type === "array") {
    markdown += `${indentation} array<br />`;
    if (schema.items) {
      markdown += `${indentation}  items:<br />`;
      markdown += convertJsonSchemaToMarkdown(schema.items, indentationLevel + 4);
    }
  } else if (schema.type === "string") {
    markdown += `${indentation} string<br />`;
  } else if (schema.type === "number") {
    markdown += `${indentation} number<br />`;
  } else if (schema.type === "integer") {
    markdown += `${indentation} integer<br />`;
  } else if (schema.type === "boolean") {
    markdown += `${indentation} boolean<br />`;
  }

  if (schema.description) {
    markdown += `${indentation} ${schema.description}<br />`;
  }

  return markdown;
};

const openRPCToMarkdown = (openRPCDocument: OpenrpcDocument): string => {
  let markdown = "";

  openRPCDocument.methods.forEach((method: MethodObject)  => {
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
      markdown += convertJsonSchemaToMarkdown((method.result as ContentDescriptorObject).schema, 2);
    }

    if (method.examples && method.examples.length > 0) {
      markdown += "### Examples\n\n";
      method.examples.forEach((example) => {
        markdown += "```json\n";
        markdown += JSON.stringify({ "jsonrpc": "2.0", "id": 0, "result": (example as any).result.value }, null, 2);
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
import React from "react";

interface SchemaPropertyType {
  name?: string;
  $ref?: any;
  items?: any;
  title?: string;
  type: string;
  description?: string;
  required?: boolean;
  properties?: Record<string, SchemaPropertyType>;
  enum?: string[];
  default?: string;
  schema?: Schema;
}

interface Schema {
  summary: any;
  description: any;
  required: boolean;
  title: string;
  type: string;
  properties?: Record<string, SchemaPropertyType>;
  items?: SchemaPropertyType;
  oneOf?: SchemaPropertyType[];
  allOf?: SchemaPropertyType[];
  anyOf?: SchemaPropertyType[];
  $ref?: string;
}

interface MethodParam {
  name: string;
  description: string;
  schema: Schema;
  required?: boolean;
}

interface SchemaComponents {
  [key: string]: Schema;
}

interface InteractiveBoxProps {
  method: string;
  params: MethodParam[];
  components: SchemaComponents;
}

export default function InteractiveBox({ method, params, components }: InteractiveBoxProps) {
  console.log("method_name___", method);
  console.log("method_params___", params);
  console.log("method_components___", components);
  return (
    <div>
      Request wrapper
    </div>
  );
}
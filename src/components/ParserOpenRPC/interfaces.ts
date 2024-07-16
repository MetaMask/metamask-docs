export interface SchemaPropertyType {
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

export interface Schema {
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

export interface MethodParam {
  name: string;
  description: string;
  schema: Schema;
  required?: boolean;
}

export interface SchemaComponents {
  [key: string]: Schema;
}

export interface MethodExampleParam {
  name: string;
  value: {
    [key: string]: any;
  };
}

export interface MethodExampleResult {
  name: string;
  value: any;
}

export interface MethodExample {
  name: string;
  params: MethodExampleParam[];
  result: MethodExampleResult;
}

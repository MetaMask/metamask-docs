import React from "react";
import { MethodParam, SchemaComponents } from "@site/src/components/ParserOpenRPC/interfaces";

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
    <div></div>
  );
}
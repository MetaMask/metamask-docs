import React from "react";
import Heading from "@theme/Heading";
import { MDContent } from "./MDContent";
import { parseSchema } from "./RenderParams";
import clsx from "clsx";
import styles from "./styles.module.css";
import { MethodParam, SchemaComponents } from "@site/src/components/ParserOpenRPC/interfaces";


interface DetailsBoxProps {
  method: string;
  description: string | null;
  params: MethodParam[];
  components: SchemaComponents;
  result: any;
}

export default function DetailsBox({ method, description, params, components, result }: DetailsBoxProps) {
  return (
    <>
      <Heading as="h1">{method}</Heading>
      <MDContent content={description} />
      <Heading as="h2" className={clsx(styles.secondaryHeading, "padding-vert--md")}>
        Parameters
      </Heading>
      {params.length === 0 ? (
        <div>This method does not accept any parameters</div>
      ) : (
        <>
          {params && parseSchema(params, components)}
        </>
      )}
      <Heading as="h2" className={clsx(styles.secondaryHeading, "padding-vert--md")}>
        Returns
      </Heading>
      {result?.description && (
        <div className="padding-bottom--md">
          <MDContent content={result.description} />
        </div>
      )}
      {result && parseSchema(result, components)}
    </>
  );
}
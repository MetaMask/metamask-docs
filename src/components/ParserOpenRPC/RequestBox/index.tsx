import React, { useMemo } from "react";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";
import { MethodParam } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";


interface RequestBoxProps {
  isMetamaskInstalled: boolean;
  method: string;
  params: MethodParam[];
  response?: any;
  openModal: () => void;
  submitRequest: () => void;
}

export default function RequestBox({ isMetamaskInstalled, method, params, response, openModal, submitRequest }: RequestBoxProps) {
  const exampleRequest = useMemo(() => {
    return `await window.ethereum.request({\n "method": "${method}",\n "params": [${params}],\n});`;
  }, [method, params]);

  const exampleResponse = useMemo(() => {
    if (!response || response === null) return false
    return JSON.stringify(response, null, 2);
  }, [response]);

  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeader}>
          <strong className={styles.cardHeading}>Request</strong>
        </div>
        <div>
          <CodeBlock language="javascript" className="margin-bottom--none">
            {exampleRequest}
          </CodeBlock>
        </div>
        <div className={styles.cardFooter}>
          {params.length > 0 && (
            <button
              className={clsx(global.linkBtn, "margin-right--md")}
              disabled={!isMetamaskInstalled}
              onClick={openModal}
            >
              Customize request
            </button>
          )}
          <button
            className={global.primaryBtn}
            disabled={!isMetamaskInstalled}
            onClick={submitRequest}
          >
            Run request
          </button>
        </div>
      </div>
      {response !== null && (
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <strong className={styles.cardHeading}>Response</strong>
          </div>
          <div>
            <CodeBlock language="javascript" className="margin-bottom--none">
              {exampleResponse}
            </CodeBlock>
          </div>
        </div>
      )}
    </>
  );
}
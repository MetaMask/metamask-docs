import React, { useMemo, useState } from "react";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";
import { MethodParam } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";

interface RequestBoxProps {
  isMetamaskInstalled: boolean;
  method: string;
  params: MethodParam[];
  response?: any;
  paramsData: any;
  openModal: () => void;
  submitRequest: () => void;
  isMetamaskNetwork?: boolean;
  customAPIKey?: string;
  setCustomAPIKey?: (key: string) => void;
}

export default function RequestBox({
  isMetamaskInstalled,
  method,
  params,
  response,
  paramsData,
  openModal,
  submitRequest,
  isMetamaskNetwork = false,
  customAPIKey,
  setCustomAPIKey,
}: RequestBoxProps) {
  const location = useLocation();
  const { colorMode } = useColorMode();
  console.log("colorMode", colorMode);
  const isWalletReferencePage = location.pathname.includes("/wallet/reference");
  const exampleRequest = useMemo(() => {
    const preparedParams = JSON.stringify(paramsData, null, 2);
    const preparedShellParams = JSON.stringify(paramsData);
    const NETWORK_URL = "https://linea-mainnet.infura.io";
    const API_KEY = "<YOUR-API-KEY>";
    if (isMetamaskNetwork) {
      return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams.replace(/"([^"]+)":/g, '$1:')},\n});`;
    }
    return `curl ${NETWORK_URL}/v3/${API_KEY} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": ${preparedShellParams},\n    "id": 1\n  }'`;
  }, [method, paramsData]);

  const exampleResponse = useMemo(() => {
    return JSON.stringify(response, null, 2);
  }, [response]);

  const methodsWithRequiredWalletConnection = ["eth_accounts", "eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"];
  const isRunAndCustomizeRequestDisabled = isWalletReferencePage && methodsWithRequiredWalletConnection.includes(method) ?
    !isMetamaskInstalled :
    false;

  const runRequestButton = (
    <button
      className={global.primaryBtn}
      disabled={isRunAndCustomizeRequestDisabled}
      onClick={submitRequest}
      data-test-id="run-request"
    >
      Run request
    </button>
  );

  return (
    <>
      {!isWalletReferencePage ?
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="custom_key">Your API Key:</label>
          <input
            name="custom_key"
            value={customAPIKey}
            onChange={(e) => setCustomAPIKey(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "8px",
              border: `1px solid ${colorMode === "dark" ? "#fff" : "#848c96"}`,
              borderRadius: "8px",
              width: "360px"
            }} />
        </div> :
        null
      }
      <div className={styles.cardWrapper}>
        <div className={styles.cardHeader}>
          <strong className={styles.cardHeading}>Request</strong>
        </div>
        <div className={styles.codeWrapper}>
          <CodeBlock
            language={isMetamaskNetwork ? "javascript" : "shell"}
            className="margin-bottom--none"
          >
            {exampleRequest}
          </CodeBlock>
        </div>
        <div className={styles.cardFooter}>
          {params.length > 0 && (
            <button
              className={clsx(global.linkBtn, "margin-right--md")}
              disabled={isRunAndCustomizeRequestDisabled}
              onClick={openModal}
              data-test-id="customize-request"
            >
              Customize request
            </button>
          )}
          {
            isRunAndCustomizeRequestDisabled ?
              (<Tooltip message="Before you can run or customize this request, please connect your MetaMask wallet first.">
                {runRequestButton}
              </Tooltip>) :
              runRequestButton
          }
        </div>
      </div>
      {response !== undefined && (
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <strong className={styles.cardHeading}>Response</strong>
          </div>
          <div>
            <CodeBlock language="javascript" className={clsx(styles.responseBlock, "margin-bottom--none")}>
              {exampleResponse}
            </CodeBlock>
          </div>
        </div>
      )}
    </>
  );
}

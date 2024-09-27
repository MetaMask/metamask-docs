import React, { useContext, useMemo } from "react";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";
import { MethodParam } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { Tooltip } from "@site/src/components/Tooltip";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import { LINEA_REQUEST_URL } from "@site/src/lib/constants";

interface RequestBoxProps {
  isMetamaskInstalled: boolean;
  method: string;
  params: MethodParam[];
  response?: any;
  paramsData: any;
  openModal: () => void;
  submitRequest: () => void;
  isMetamaskNetwork?: boolean;
  defExampleResponse?: any;
  resetResponseHandle: () => void;
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
  defExampleResponse,
  resetResponseHandle,
}: RequestBoxProps) {
  const { userAPIKey } = useContext(MetamaskProviderContext);
  const exampleRequest = useMemo(() => {
    const preparedParams = JSON.stringify(paramsData, null, 2);
    const preparedShellParams = JSON.stringify(paramsData);
    const NETWORK_URL = "https://linea-mainnet.infura.io";
    const API_KEY = userAPIKey ? userAPIKey : "<YOUR-API-KEY>";
    if (isMetamaskNetwork) {
      return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams.replace(/"([^"]+)":/g, '$1:')},\n});`;
    }
    return `curl ${LINEA_REQUEST_URL}/v3/${API_KEY} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": ${preparedShellParams},\n    "id": 1\n  }'`;
  }, [userAPIKey, method, paramsData]);

  const exampleResponse = useMemo(() => {
    if (defExampleResponse && response === undefined) {
      return JSON.stringify(
        defExampleResponse === "null" ? null : defExampleResponse,
        null,
        2
      );
    }
    if (response !== undefined) {
      return JSON.stringify(response, null, 2);
    }
    return false
  }, [response, defExampleResponse]);

  const methodsWithRequiredWalletConnection = ["eth_accounts", "eth_sendTransaction", "personal_sign", "eth_signTypedData_v4"];
  const isRunAndCustomizeRequestDisabled = isMetamaskNetwork && methodsWithRequiredWalletConnection.includes(method) ?
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
      {exampleResponse && (
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <strong className={styles.cardHeading}>
              {defExampleResponse && response === undefined ? "Example response" : "Response"}
            </strong>
            {defExampleResponse && response !== undefined && (
              <Tooltip message="Reset response">
                <button
                  className={styles.resetResponseBtn}
                  onClick={resetResponseHandle}
                >
                  <img src="/img/icons/reset-icon.svg" />
                </button>
              </Tooltip>
            )}
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

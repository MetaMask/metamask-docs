import React, { useContext, useMemo, useState } from "react";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";
import { MethodParam } from "@site/src/components/ParserOpenRPC/interfaces";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { Tooltip } from "@site/src/components/Tooltip";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import Select from "react-dropdown-select";

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
  requestURL: string;
  isLoading: boolean;
}

const langOptions = [
  {
    value: "curl",
    label: "CURL"
  },
  {
    value: "wss",
    label: "WSS"
  }
]

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
  requestURL = "",
  isLoading,
}: RequestBoxProps) {
  const { userAPIKey, userEncPublicKey } = useContext(MetamaskProviderContext);
  const [currentLang, setCurrentLang] = useState(langOptions[0]);
  const exampleRequest = useMemo(() => {
    const preparedParams = JSON.stringify(paramsData, null, 2);
    const preparedShellParams = JSON.stringify(paramsData);
    const API_KEY = userAPIKey ? userAPIKey : "<YOUR-API-KEY>";
    if (isMetamaskNetwork) {
      return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams.replace(/"([^"]+)":/g, '$1:')},\n});`;
    }
    if (currentLang.value === "wss") {
      return `wscat -c ${requestURL.replace("https", "wss")}${API_KEY} -x '{"jsonrpc":"2.0","method":"${method}","params": ${preparedShellParams},"id":1}'`
    }
    return `curl ${requestURL}${API_KEY} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": ${preparedShellParams},\n    "id": 1\n  }'`;
  }, [userAPIKey, method, paramsData, currentLang]);

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

  const methodsWithRequiredWalletConnection = ["eth_accounts", "eth_sendTransaction", "personal_sign", "eth_signTypedData_v4", "eth_getEncryptionPublicKey"];
  const isRunAndCustomizeRequestDisabled = isMetamaskNetwork && methodsWithRequiredWalletConnection.includes(method) ?
    !isMetamaskInstalled :
    false;

  const isMetamaskDecryptDisabled = isMetamaskNetwork && !userEncPublicKey && method === "eth_decrypt";

  const runRequestButton = (
    <button
      className={clsx(global.primaryBtn, styles.runBtnWrap)}
      disabled={isRunAndCustomizeRequestDisabled || isLoading || isMetamaskDecryptDisabled}
      onClick={submitRequest}
      data-test-id="run-request"
    >
      {isLoading ? <span className={styles.loader}></span> : "Run request"}
    </button>
  );

  return (
    <>
      <div className={styles.cardWrapper}>
        <div className={clsx(styles.cardHeader, !isMetamaskNetwork && styles.addIndent)}>
          <strong className={styles.cardHeading}>Request</strong>
          {!isMetamaskNetwork && (
            <Select
              className={"select-lang"}
              options={langOptions}
              values={[currentLang]}
              multi={false}
              searchable={false}
              onChange={(value) => {
                setCurrentLang(value[0]);
              }}
            />
          )}
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
              disabled={isRunAndCustomizeRequestDisabled || isMetamaskDecryptDisabled}
              onClick={openModal}
              data-test-id="customize-request"
            >
              Customize request
            </button>
          )}
          {
            isRunAndCustomizeRequestDisabled || isMetamaskDecryptDisabled ?
              (<Tooltip message={
                isMetamaskDecryptDisabled
                ? "Please connect your MetaMask wallet first and run eth_getEncryptionPublicKey"
                : "Before you can run or customize this request, please connect your MetaMask wallet first."
              }>
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

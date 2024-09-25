import React, { useMemo } from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import { MethodParam } from '@site/src/components/ParserOpenRPC/interfaces'
import Heading from '@theme/Heading'
import Button from '@site/src/components/elements/buttons/button'
import { Tooltip } from "@site/src/components/ParserOpenRPC/Tooltip";
import styles from './styles.module.scss'

interface RequestBoxProps {
  isMetamaskInstalled: boolean
  method: string
  params: MethodParam[]
  response?: any
  paramsData: any
  openModal: () => void
  submitRequest: () => void
  colorMode: string
  isMetamaskNetwork?: boolean
}

export default function RequestBox({
  isMetamaskInstalled,
  method,
  params,
  response,
  paramsData,
  openModal,
  submitRequest,
  colorMode,
  isMetamaskNetwork = false,
}: RequestBoxProps) {
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
  const isRunAndCustomizeRequestDisabled = methodsWithRequiredWalletConnection.includes(method) ?
    !isMetamaskInstalled :
    false;

  const runRequestButton = (
      <Button
          as="button"
          type={'primary'}
          icon={'arrow-right'}
          label={'Run request'}
          disabled={!isMetamaskInstalled}
          onClick={submitRequest}
          data-test-id="run-request"
          style={
              colorMode !== 'dark'
                  ? {
                      '--button-color-hover': 'var(--general-black)',
                      '--button-text-color-hover': 'var(--general-white)',
                  }
                  : {}
          }
      />
  );

  return (
    <>
      <div className={styles.cardWrapper}>
        <Heading
          as="h3"
          className={clsx(styles.cardHeader, 'type-paragraph-m font-primary font-weight-medium')}>
          Request
        </Heading>
        <div className={styles.codeWrapper}>
          <CodeBlock language={isMetamaskNetwork ? "javascript" : "shell"} className="margin-bottom--none">
            {exampleRequest}
          </CodeBlock>
        </div>
        <div className={clsx(styles.cardFooter, params.length > 0 && styles['cardFooter-btns'])}>
          {params.length > 0 && (
            <Button
              as="button"
              type={'tertiary'}
              label={'Customize request'}
              disabled={isRunAndCustomizeRequestDisabled}
              onClick={openModal}
              data-test-id="customize-request"
              style={
                colorMode === 'dark'
                  ? {
                      '--button-color': 'var(--general-white)',
                      '--button-text-color': 'var(--general-white)',
                      '--button-color-hover': 'var(--general-white)',
                      '--button-text-color-hover': 'var(--general-black)',
                    }
                  : {
                      '--button-color-hover': 'var(--general-black)',
                      '--button-text-color-hover': 'var(--general-white)',
                    }
              }
            />
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
          <Heading
            as="h3"
            className={clsx(styles.cardHeader, 'type-paragraph-m font-primary font-weight-medium')}>
            Response
          </Heading>

          <div>
            <CodeBlock
              language="javascript"
              className={clsx(styles.responseBlock, 'margin-bottom--none')}>
              {exampleResponse}
            </CodeBlock>
          </div>
        </div>
      )}
    </>
  );
}

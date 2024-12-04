import React, { useContext, useMemo, useState } from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import { MethodParam } from '@site/src/components/ParserOpenRPC/interfaces'
import styles from './styles.module.scss'
import Heading from '@theme/Heading'
import Button from '@site/src/components/elements/buttons/button'
import { Tooltip } from '@site/src/components/Tooltip'
import { MetamaskProviderContext } from '@site/src/theme/Root'
import Select from 'react-dropdown-select'

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
  defExampleResponse?: any
  resetResponseHandle: () => void
  requestURL: string
  isLoading: boolean
}

const langOptions = [
  {
    value: 'curl',
    label: 'CURL',
  },
  {
    value: 'wss',
    label: 'WSS',
  },
]

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
  defExampleResponse,
  resetResponseHandle,
  requestURL = '',
  isLoading,
}: RequestBoxProps) {
  const { userAPIKey } = useContext(MetamaskProviderContext)
  const [currentLang, setCurrentLang] = useState(langOptions[0])
  const exampleRequest = useMemo(() => {
    const preparedParams = JSON.stringify(paramsData, null, 2)
    const preparedShellParams = JSON.stringify(paramsData)
    const API_KEY = userAPIKey ? userAPIKey : '<YOUR-API-KEY>'
    if (isMetamaskNetwork) {
      return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams.replace(/"([^"]+)":/g, '$1:')},\n});`
    }
    if (currentLang.value === 'wss') {
      return `wscat -c ${requestURL.replace('https', 'wss')}${API_KEY} -x '{"jsonrpc":"2.0","method":"${method}","params": ${preparedShellParams},"id":1}'`
    }
    return `curl ${requestURL}${API_KEY} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": ${preparedShellParams},\n    "id": 1\n  }'`
  }, [userAPIKey, method, paramsData, currentLang])

  const exampleResponse = useMemo(() => {
    if (defExampleResponse && response === undefined) {
      return JSON.stringify(defExampleResponse === 'null' ? null : defExampleResponse, null, 2)
    }
    if (response !== undefined) {
      return JSON.stringify(response, null, 2)
    }
    return false
  }, [response, defExampleResponse])

  const methodsWithRequiredWalletConnection = [
    'eth_accounts',
    'eth_sendTransaction',
    'personal_sign',
    'eth_signTypedData_v4',
  ]
  const isRunAndCustomizeRequestDisabled =
    isMetamaskNetwork && methodsWithRequiredWalletConnection.includes(method)
      ? !isMetamaskInstalled
      : false

  const runRequestButton = (
    <Button
      as="button"
      type={'primary'}
      icon={'arrow-right'}
      label={'Run request'}
      disabled={isRunAndCustomizeRequestDisabled || isLoading}
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
  )

  return (
    <>
      <div className={styles.cardWrapper}>
        <Heading
          as="h3"
          className={clsx(
            clsx(styles.cardHeader, !isMetamaskNetwork && styles.addIndent),
            'type-paragraph-m font-primary font-weight-medium'
          )}>
          Request
          {!isMetamaskNetwork && (
            <Select
              className={'select-lang'}
              options={langOptions}
              values={[currentLang]}
              multi={false}
              searchable={false}
              onChange={value => {
                setCurrentLang(value[0])
              }}
            />
          )}
        </Heading>
        <div className={styles.codeWrapper}>
          <CodeBlock
            language={isMetamaskNetwork ? 'javascript' : 'shell'}
            className="margin-bottom--none">
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
          {isRunAndCustomizeRequestDisabled ? (
            <Tooltip message="Before you can run or customize this request, please connect your MetaMask wallet first.">
              {runRequestButton}
            </Tooltip>
          ) : (
            runRequestButton
          )}
        </div>
      </div>
      {exampleResponse && (
        <div className={styles.cardWrapper}>
          <Heading
            as="h3"
            className={clsx(styles.cardHeader, 'type-paragraph-m font-primary font-weight-medium')}>
            {defExampleResponse && response === undefined ? 'Example response' : 'Response'}
            {defExampleResponse && response !== undefined && (
              <Tooltip message="Reset response">
                <button className={styles.resetResponseBtn} onClick={resetResponseHandle}>
                  <img src="/img/icons/reset-icon.svg" />
                </button>
              </Tooltip>
            )}
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
  )
}

import React, { useMemo } from "react"
import clsx from "clsx"
import CodeBlock from "@theme/CodeBlock"
import { MethodParam } from "@site/src/components/ParserOpenRPC/interfaces"
import styles from "./styles.module.css"
import global from "../global.module.css"

interface RequestBoxProps {
  isMetamaskInstalled: boolean
  method: string
  params: MethodParam[]
  response?: any
  paramsData: any
  openModal: () => void
  submitRequest: () => void
}

export default function RequestBox({
  isMetamaskInstalled,
  method,
  params,
  response,
  paramsData,
  openModal,
  submitRequest,
}: RequestBoxProps) {
  const exampleRequest = useMemo(() => {
    const preparedParams = JSON.stringify(paramsData, null, 2)
    return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams},\n});`
  }, [method, paramsData])

  const exampleResponse = useMemo(() => {
    if (!response || response === null) return false
    return JSON.stringify(response, null, 2)
  }, [response])

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
  )
}

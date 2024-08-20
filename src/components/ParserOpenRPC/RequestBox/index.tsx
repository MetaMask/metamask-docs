import React, { useMemo } from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import { MethodParam } from '@site/src/components/ParserOpenRPC/interfaces'
import Button from '@site/src/components/elements/buttons/button'

import styles from './styles.module.scss'

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
    return `await window.ethereum.request({\n "method": "${method}",\n "params": ${preparedParams.replace(/"([^"]+)":/g, '$1:')},\n});`
  }, [method, paramsData])

  const exampleResponse = useMemo(() => {
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
            <Button
              as="button"
              className="margin-right--md"
              type={'tertiary'}
              label={'Customize request'}
              disabled={!isMetamaskInstalled}
              icon={false}
              onClick={openModal}
              data-test-id="customize-request"
              style={{
                '--button-color': 'var(--general-white)',
                '--button-text-color': 'var(--general-white)',
                '--button-color-hover': 'transparent',
              }}
            />
          )}
          <Button
            as="button"
            type={'secondary'}
            icon={'arrow-right'}
            label={'Run request'}
            disabled={!isMetamaskInstalled}
            onClick={submitRequest}
            data-test-id="run-request"
            style={{
              '--button-color-hover': 'var(--general-white)',
              '--button-text-color-hover': 'var(--general-black)',
            }}
          />
        </div>
      </div>
      {response !== undefined && (
        <div className={styles.cardWrapper}>
          <div className={styles.cardHeader}>
            <strong className={styles.cardHeading}>Response</strong>
          </div>
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

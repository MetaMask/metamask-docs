import React, { useMemo } from 'react'
import clsx from 'clsx'
import CodeBlock from '@theme/CodeBlock'
import { MethodParam } from '@site/src/components/ParserOpenRPC/interfaces'
import Heading from '@theme/Heading'
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
  colorMode: string
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
        <Heading as="h3" className={clsx(styles.cardHeader, 'type-heading-xs')}>
          Request
        </Heading>
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
        </div>
      </div>
      {response !== undefined && (
        <div className={styles.cardWrapper}>
          <Heading as="h3" className={clsx(styles.cardHeader, 'type-heading-xs')}>
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
  )
}

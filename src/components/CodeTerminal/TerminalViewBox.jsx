import clsx from 'clsx'
import { useMemo, useState, useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { DASHBOARD_URL } from '../../lib/constants'
import { useColorMode } from '@docusaurus/theme-common'
import CodeBlock from '@theme/CodeBlock'
import Button from '@site/src/components/elements/buttons/button'

import styles from './TerminalViewBox.module.scss'

const TerminalViewBox = ({
  url = '{network}',
  id = '{ID}',
  method = 'method',
  params = [],
  logged = false,
  hideFooter = false,
  response,
  isExpansionNetwork = false,
}) => {
  const { colorMode } = useColorMode()
  const [theme, setTheme] = useState('')

  useEffect(() => {
    setTheme(colorMode)
  }, [colorMode])

  const { siteConfig } = useDocusaurusContext()
  const { DASHBOARD_PREVIEW_URL, VERCEL_ENV } = siteConfig?.customFields || {}

  const exampleRequest = useMemo(() => {
    const prepareParams =
      params.length === 0
        ? ''
        : params.map(param => {
            if ('boolean' === typeof param) return `${param}`
            return `"${param}"`
          })
    if (isExpansionNetwork) {
      return `curl -X 'GET' \\\n'https://${url}'`
    }
    return `curl https://${url}/v3/${id} \\\n  -X POST \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "jsonrpc": "2.0",\n    "method": "${method}",\n    "params": [${params.length === 0 ? '' : prepareParams}],\n    "id": 1\n  }'`
  }, [url, id, method, params, isExpansionNetwork])

  return (
    <div className={styles['wrapper']}>
      <CodeBlock language="cURL">{exampleRequest}</CodeBlock>
      {!hideFooter && (
        <div className={styles['footer']}>
          {logged && (
            <div className={clsx(styles['response'], 'type-paragraph-m')}>
              {response && <pre style={{ backgroundColor: '#292A35' }}>{response}</pre>}
            </div>
          )}
          <div className={styles['buttons']}>
            {logged ? (
              <Button
                as="button"
                buttonType="submit"
                label={'Send Request'}
                icon={'arrow-right'}
                style={
                  theme === 'dark'
                    ? {
                        '--button-color-hover': 'var(--general-white)',
                        '--button-text-color-hover': 'var(--general-black)',
                      }
                    : {
                        '--button-color-hover': 'var(--general-black)',
                        '--button-text-color-hover': 'var(--general-white)',
                      }
                }
              />
            ) : (
              <p className="type-paragraph-m">
                <Button
                  as="link"
                  target="_blank"
                  href={`${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/login`}
                  rel="noreferrer"
                  label={'Sign in'}
                  style={
                    theme === 'dark'
                      ? {
                          '--button-color-hover': 'var(--general-white)',
                          '--button-text-color-hover': 'var(--general-black)',
                        }
                      : {
                          '--button-color-hover': 'var(--general-black)',
                          '--button-text-color-hover': 'var(--general-white)',
                        }
                  }
                />{' '}
                or{' '}
                <Button
                  as="link"
                  target="_blank"
                  rel="noreferrer"
                  href={`${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/register`}
                  label={'Create an account'}
                  style={
                    theme === 'dark'
                      ? {
                          '--button-color-hover': 'var(--general-white)',
                          '--button-text-color-hover': 'var(--general-black)',
                        }
                      : {
                          '--button-color-hover': 'var(--general-black)',
                          '--button-text-color-hover': 'var(--general-white)',
                        }
                  }
                />{' '}
                and reload the page to edit real requests
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TerminalViewBox

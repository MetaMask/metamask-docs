import React, { ReactElement } from 'react'
import { Provider as AlertProvider } from 'react-alert'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { AlertTemplate, options } from '@site/src/components/Alert'
import { DocSearchSidepanel } from '@docsearch/react/sidepanel'
import '@docsearch/css/dist/sidepanel.css'

interface AlgoliaThemeConfig {
  appId: string
  apiKey: string
  indexName: string
  assistantId?: string
  askAi?: {
    assistantId: string
  }
}

export default function Root({ children }: { children: ReactElement }) {
  const { siteConfig } = useDocusaurusContext()
  const isBrowser = useIsBrowser()
  const algolia = siteConfig?.themeConfig?.algolia as AlgoliaThemeConfig | undefined

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      {children}
      {isBrowser && (algolia?.assistantId || algolia?.askAi?.assistantId) ? (
        <DocSearchSidepanel
          appId={algolia.appId}
          apiKey={algolia.apiKey}
          assistantId={algolia.assistantId || algolia.askAi?.assistantId}
          indexName={algolia.indexName}
          panel={{
            translations: {
              newConversationScreen: {
                introductionText:
                  'Have a question about integrating with MetaMask? Ask here and get an answer from the developer docs.',
              },
            },
          }}
        />
      ) : null}
    </AlertProvider>
  )
}

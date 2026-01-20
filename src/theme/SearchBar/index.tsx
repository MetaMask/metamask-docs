import React, { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly'
import Head from '@docusaurus/Head'
import Link from '@docusaurus/Link'
import { useHistory } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { isRegexpStringMatch, useSearchLinkCreator } from '@docusaurus/theme-common'
import {
  mergeFacetFilters,
  useAlgoliaContextualFacetFilters,
  useSearchResultUrlProcessor,
} from '@docusaurus/theme-search-algolia/client'
import Translate from '@docusaurus/Translate'

import { DocSearch, useDocSearch } from '@docsearch/core'
import { DocSearchButton } from '@docsearch/react/button'
import translations from '@theme/SearchTranslations'

import { Sidepanel } from '@docsearch/sidepanel'
import { SidepanelButton } from '@docsearch/sidepanel/button'

import { createPortal } from 'react-dom'

import '@docsearch/css/dist/style.css'
import '@docsearch/css/dist/sidepanel.css'
import './styles.css'

type ThemeConfigAlgolia = {
  appId: string
  apiKey: string
  indexName: string
  contextualSearch?: boolean
  searchPagePath?: string
  externalUrlRegex?: string
  placeholder?: string
  searchParameters?: {
    facetFilters?: any
    [key: string]: any
  }
  translations?: any
  askAi?: {
    assistantId: string
    searchParameters?: {
      facetFilters?: any
      [key: string]: any
    }
    [key: string]: any
  }
  [key: string]: any
}

let DocSearchModal: any = null
async function importDocSearchModalIfNeeded() {
  if (DocSearchModal) return
  const [{ DocSearchModal: Modal }] = await Promise.all([import('@docsearch/react/modal')])
  DocSearchModal = Modal
}

function useNavigator({ externalUrlRegex }: { externalUrlRegex?: string }) {
  const history = useHistory()
  const [navigator] = useState(() => {
    return {
      navigate(params: { itemUrl: string }) {
        if (isRegexpStringMatch(externalUrlRegex, params.itemUrl)) {
          window.location.href = params.itemUrl
        } else {
          history.push(params.itemUrl)
        }
      },
    }
  })
  return navigator
}

function useTransformSearchClient() {
  const {
    siteMetadata: { docusaurusVersion },
  } = useDocusaurusContext()

  return useCallback(
    (searchClient: any) => {
      searchClient.addAlgoliaAgent('docusaurus', docusaurusVersion)
      return searchClient
    },
    [docusaurusVersion]
  )
}

function useTransformItems(props: ThemeConfigAlgolia) {
  const processSearchResultUrl = useSearchResultUrlProcessor()
  const [transformItems] = useState(() => {
    return (items: any[]) =>
      props.transformItems
        ? props.transformItems(items)
        : items.map(item => ({
            ...item,
            url: processSearchResultUrl(item.url),
          }))
  })
  return transformItems
}

function useSearchParameters({
  contextualSearch,
  ...props
}: ThemeConfigAlgolia): ThemeConfigAlgolia['searchParameters'] {
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters()
  const configFacetFilters = props.searchParameters?.facetFilters ?? []
  const facetFilters = contextualSearch
    ? mergeFacetFilters(contextualSearchFacetFilters, configFacetFilters)
    : configFacetFilters

  return {
    ...props.searchParameters,
    facetFilters,
  }
}

function useAskAiConfig({
  contextualSearch,
  ...props
}: ThemeConfigAlgolia): ThemeConfigAlgolia['askAi'] | undefined {
  const contextualSearchFacetFilters = useAlgoliaContextualFacetFilters()
  const askAi = props.askAi
  if (!askAi) return undefined
  if (!contextualSearch) return askAi

  const askAiFacetFilters = askAi.searchParameters?.facetFilters
  return {
    ...askAi,
    searchParameters: {
      ...askAi.searchParameters,
      facetFilters: mergeFacetFilters(contextualSearchFacetFilters, askAiFacetFilters),
    },
  }
}

function Hit({ hit, children }: any) {
  return <Link to={hit.url}>{children}</Link>
}

function ResultsFooter({ state, onClose }: any) {
  const createSearchLink = useSearchLinkCreator()
  return (
    <Link to={createSearchLink(state.query)} onClick={onClose}>
      <Translate id="theme.SearchBar.seeAll" values={{ count: state.context.nbHits }}>
        {'See all {count} results'}
      </Translate>
    </Link>
  )
}

function useResultsFooterComponent({ closeModal }: { closeModal: () => void }) {
  return useMemo(
    () =>
      ({ state }: any) => <ResultsFooter state={state} onClose={closeModal} />,
    [closeModal]
  )
}

function DocSearchHybrid(props: ThemeConfigAlgolia) {
  const navigator = useNavigator({ externalUrlRegex: props.externalUrlRegex })
  const transformItems = useTransformItems(props)
  const transformSearchClient = useTransformSearchClient()

  const searchParameters = useSearchParameters(props)
  const askAi = useAskAiConfig(props)

  const {
    isModalActive,
    openModal,
    closeModal,
    searchButtonRef,
    initialQuery,
    isAskAiActive,
    onAskAiToggle,
  } = useDocSearch()

  const searchContainer = useRef<HTMLDivElement | null>(null)

  const prepareSearchContainer = useCallback(() => {
    if (!searchContainer.current) {
      const divElement = document.createElement('div')
      searchContainer.current = divElement
      document.body.insertBefore(divElement, document.body.firstChild)
    }
  }, [])

  const open = useCallback(async () => {
    prepareSearchContainer()
    await importDocSearchModalIfNeeded()
    openModal()
  }, [openModal, prepareSearchContainer])

  const close = useCallback(() => {
    closeModal()
    ;(searchButtonRef as any).current?.focus?.()
  }, [closeModal, searchButtonRef])

  const resultsFooterComponent = useResultsFooterComponent({ closeModal: close })

  const placeholder = isAskAiActive
    ? translations.modal?.searchBox?.placeholderTextAskAi
    : translations.modal?.searchBox?.placeholderText || props.placeholder

  // Destructure placeholder from props to prevent it from overriding the computed placeholder
  const { placeholder: _, ...propsWithoutPlaceholder } = props

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href={`https://${props.appId}-dsn.algolia.net`}
          crossOrigin="anonymous"
        />
      </Head>

      <DocSearchButton
        onTouchStart={importDocSearchModalIfNeeded}
        onFocus={importDocSearchModalIfNeeded}
        onMouseOver={importDocSearchModalIfNeeded}
        onClick={open}
        ref={searchButtonRef as any}
        translations={props.translations?.button ?? translations.button}
      />

      {/* Floating Ask AI button (bottom-right icon) - only show when Ask AI is configured */}
      {askAi?.assistantId && (
        <>
          <SidepanelButton variant="floating" translations={{ buttonAriaLabel: 'Ask AI' }} />

          {/* Sidepanel is what Hybrid Mode transitions to on Ask AI initiation */}
          <Sidepanel
            appId={props.appId}
            apiKey={props.apiKey}
            indexName={props.indexName}
            assistantId={askAi.assistantId}
            searchParameters={askAi.searchParameters}
            variant="floating"
            side="right"
          />
        </>
      )}

      {isModalActive &&
        DocSearchModal &&
        searchContainer.current &&
        createPortal(
          <DocSearchModal
            onClose={close}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            navigator={navigator}
            transformItems={transformItems}
            hitComponent={Hit}
            transformSearchClient={transformSearchClient}
            {...(props.searchPagePath && { resultsFooterComponent })}
            {...propsWithoutPlaceholder}
            placeholder={placeholder}
            translations={props.translations?.modal ?? translations.modal}
            searchParameters={searchParameters}
            askAi={askAi}
            canHandleAskAi={Boolean(askAi)}
            isAskAiActive={isAskAiActive}
            onAskAiToggle={onAskAiToggle as any}
          />,
          searchContainer.current
        )}
    </>
  )
}

export default function SearchBar(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  const algolia = siteConfig.themeConfig.algolia as ThemeConfigAlgolia

  return (
    <BrowserOnly>
      {() => (
        <DocSearch>
          <DocSearchHybrid {...algolia} />
        </DocSearch>
      )}
    </BrowserOnly>
  )
}

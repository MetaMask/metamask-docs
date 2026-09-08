import React, { useMemo, type ComponentType, type ReactNode } from 'react'
import SearchBar from '@theme-original/SearchBar'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { ASK_AI_AGENT_STUDIO, type AskAiConfig } from '@site/src/lib/algolia-ask-ai'

type AskAiProps = { askAi?: AskAiConfig & { agentStudio?: boolean } }

/**
 * The theme types `SearchBar` as taking no props, but its implementation spreads whatever it
 * receives over `themeConfig.algolia` so that props win, which is the only way to hand DocSearch a
 * key that Docusaurus's Joi schema rejects in the config.
 */
const SearchBarWithAskAi = SearchBar as ComponentType<AskAiProps>

export default function SearchBarWrapper(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  const { askAi } = siteConfig.themeConfig.algolia as { askAi?: AskAiConfig }

  // `useAlgoliaAskAi` memoizes on the identity of this object, and DocSearch derives the Ask AI
  // chat config from that memo. Rebuilding it on every render would defeat both.
  const askAiWithAgentStudio = useMemo(
    () => (askAi ? { ...askAi, agentStudio: ASK_AI_AGENT_STUDIO } : undefined),
    [askAi]
  )

  return <SearchBarWithAskAi askAi={askAiWithAgentStudio} />
}

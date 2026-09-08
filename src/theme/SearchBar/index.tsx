import React from 'react'
import SearchBar from '@theme-original/SearchBar'
import type SearchBarType from '@theme/SearchBar'
import type { WrapperProps } from '@docusaurus/types'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

type Props = WrapperProps<typeof SearchBarType>

/**
 * Ask AI in the DocSearch modal is served by the "MetaMask Documentation Help"
 * agent in Algolia Agent Studio, which sits behind a different endpoint from the
 * retired standalone Ask AI service:
 *
 *   agentStudio: false -> https://askai.algolia.com/chat (+ /chat/token)          [legacy]
 *   agentStudio: true  -> https://{appId}.algolia.net/agent-studio/1/agents/{id}/completions
 *
 * `agentStudio` cannot be set in `themeConfig.algolia.askAi` because
 * theme-search-algolia validates that object with a closed Joi schema and fails the
 * build on unknown keys ("algolia.askAi.agentStudio is not allowed"). SearchBar lets
 * props override themeConfig, so the flag is injected here instead. Sending an Agent
 * Studio agent ID to the legacy endpoint fails with "AI-201 Bad input".
 *
 * Note: `askAi` is read from themeConfig rather than from props. Navbar/Content
 * renders <SearchBar /> with no props — the themeConfig merge happens *inside* the
 * original SearchBar, i.e. downstream of this wrapper — so `props.askAi` is
 * undefined here. Anything a caller does pass still wins, matching upstream.
 *
 * Once Docusaurus' schema accepts `agentStudio` (or DocSearch v5 defaults to Agent
 * Studio), this wrapper can be deleted and the flag moved into docusaurus.config.js.
 *
 * KNOWN UPSTREAM BUG (reported to Algolia): a correct answer streams and renders, then
 * a spurious second request fails with 422 "Conversation must end with a user message
 * or resolved tool results" and DocSearch paints a "Chat error" banner above the
 * answer. Agent Studio does not set `providerExecuted: true` on tool events in its
 * ai-sdk-5 stream, so `lastAssistantMessageIsCompleteWithToolCalls` — which DocSearch
 * passes to the AI SDK unconditionally — thinks the client owns the tool call and
 * auto-resubmits a conversation ending in an assistant message. Not caused by this
 * config; there is no supported way to disable the auto-resubmit. Fixed upstream by
 * either Agent Studio emitting the flag or DocSearch gating `sendAutomaticallyWhen`.
 */
export default function SearchBarWrapper(props: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  const themeConfigAskAi = (siteConfig?.themeConfig?.algolia as { askAi?: object } | undefined)
    ?.askAi
  const askAi = (props as { askAi?: object }).askAi ?? themeConfigAskAi

  if (!askAi) {
    return <SearchBar {...props} />
  }

  return <SearchBar {...props} askAi={{ ...askAi, agentStudio: true }} />
}

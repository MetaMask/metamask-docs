import type { ThemeConfigAlgolia } from '@docusaurus/theme-search-algolia'

export type AskAiConfig = Exclude<ThemeConfigAlgolia['askAi'], string | undefined>

/**
 * DocSearch only routes Ask AI through Agent Studio when this flag is passed, and it must be
 * passed on every surface that renders Ask AI: the search modal (`src/theme/SearchBar`) and the
 * sidepanel (`src/theme/Root`). It cannot live in `themeConfig.algolia.askAi` because Docusaurus
 * validates that object against a Joi schema that rejects unknown keys.
 */
export const ASK_AI_AGENT_STUDIO = true

const AGENT_STUDIO_COMPLETIONS = /\/agent-studio\/\d+\/agents\/[^/]+\/completions/

/** DocSearch renders the modal in a portal, so these are matched from the document. */
const SEARCH_INPUT_SELECTOR = '.DocSearch-Modal .DocSearch-Input'
const HIGHLIGHTED_ASK_AI_OPTION_SELECTOR = '[id^="docsearch-askAI-item"][aria-selected="true"]'
const ASK_AI_OPTION_QUERY_SELECTOR = '.DocSearch-Hit-AskAIButton-title-query'

/** Comfortably longer than a search round-trip, so the wait ends in a catch-up rather than a
 * timeout under normal conditions. */
const OPTION_CATCH_UP_TIMEOUT_MS = 2000
const OPTION_CATCH_UP_POLL_MS = 50

interface AskAiMessage {
  role?: string
  parts?: Array<{ type?: string; text?: string }>
}

interface AskAiRequestBody {
  messages?: AskAiMessage[]
}

function parseRequestBody(body: BodyInit | null | undefined): AskAiRequestBody | null {
  if (typeof body !== 'string') {
    return null
  }

  try {
    return JSON.parse(body) as AskAiRequestBody
  } catch {
    return null
  }
}

/**
 * DocSearch builds its chat with the AI SDK `lastAssistantMessageIsCompleteWithToolCalls` auto-send
 * predicate so that client-side tools can hand their results back to the model. Agent Studio runs
 * its search tool server-side but never marks the resulting parts `providerExecuted`, so whenever
 * the agent emits its tool calls and its answer text in a single step, the predicate misfires and
 * re-posts the already finished conversation. Agent Studio rejects that with a 422 and DocSearch
 * renders it as a "Chat error" next to an otherwise correct answer.
 *
 * A conversation ending in an assistant message is always one of these re-posts, because every
 * genuine request ends with the question the user just asked.
 */
function isAutoResubmit({ messages }: AskAiRequestBody): boolean {
  return Array.isArray(messages) && messages[messages.length - 1]?.role === 'assistant'
}

function normalizeQuery(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

/** The question the highlighted "Ask AI" option would ask, or `null` when it isn't highlighted. */
function highlightedAskAiQuery(): string | null {
  const option = document.querySelector(HIGHLIGHTED_ASK_AI_OPTION_SELECTOR)
  return option?.querySelector(ASK_AI_OPTION_QUERY_SELECTOR)?.textContent ?? null
}

/**
 * Holds Enter back while the "Ask AI" option is still showing an older query than the input, then
 * replays it once the option catches up, so DocSearch builds the conversation from the question the
 * user actually typed. Fixing it here rather than on the request keeps the transcript honest: the
 * message DocSearch renders is the one it sends.
 *
 * Replaying is abandoned if the user keeps typing or leaves, and falls through to the original
 * behaviour on timeout so Enter can never be swallowed outright.
 */
function installStaleQuestionGuard(): () => void {
  let replaying = false

  const submit = (input: HTMLInputElement) => {
    replaying = true
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    replaying = false
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const input = event.target
    if (
      replaying ||
      event.key !== 'Enter' ||
      event.shiftKey ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      !(input instanceof HTMLInputElement) ||
      !input.matches(SEARCH_INPUT_SELECTOR)
    ) {
      return
    }

    const optionQuery = highlightedAskAiQuery()
    const intendedQuery = input.value
    if (optionQuery === null || normalizeQuery(optionQuery) === normalizeQuery(intendedQuery)) {
      return
    }

    event.preventDefault()
    event.stopImmediatePropagation()

    const deadline = Date.now() + OPTION_CATCH_UP_TIMEOUT_MS
    const poll = window.setInterval(() => {
      const caughtUp =
        normalizeQuery(highlightedAskAiQuery() ?? '') === normalizeQuery(intendedQuery)
      const abandoned = !input.isConnected || input.value !== intendedQuery

      if (abandoned) {
        window.clearInterval(poll)
        return
      }

      if (caughtUp || Date.now() > deadline) {
        window.clearInterval(poll)
        submit(input)
      }
    }, OPTION_CATCH_UP_POLL_MS)
  }

  document.addEventListener('keydown', onKeyDown, true)

  return () => {
    document.removeEventListener('keydown', onKeyDown, true)
  }
}

/** Suppresses the spurious re-post that Agent Studio answers with a 422. */
function installResubmitGuard(): () => void {
  const originalFetch = window.fetch

  window.fetch = function patchedFetch(input, init) {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const body = AGENT_STUDIO_COMPLETIONS.test(url) ? parseRequestBody(init?.body) : null

    if (!body) {
      return originalFetch.call(this, input, init)
    }

    // The re-post has to fail as an `AbortError`: the AI SDK returns early from that case, which
    // both leaves the chat in the `ready` state and skips the auto-send it would otherwise
    // re-evaluate after every request. Resolving it, even with an empty stream, re-satisfies the
    // predicate and spins forever. This is only safe because Ask AI registers no client-side tools;
    // if it ever does, the auto-send becomes load bearing and the guard has to go.
    if (isAutoResubmit(body)) {
      return Promise.reject(new DOMException('Ask AI auto-resubmit suppressed', 'AbortError'))
    }

    return originalFetch.call(this, input, init)
  }

  return () => {
    window.fetch = originalFetch
  }
}

/**
 * Works around DocSearch v4 defects that surface against Agent Studio, none of which have a
 * supported override.
 */
export function installAskAiWorkarounds(): () => void {
  const cleanups = [installStaleQuestionGuard(), installResubmitGuard()]

  return () => {
    cleanups.forEach(cleanup => cleanup())
  }
}

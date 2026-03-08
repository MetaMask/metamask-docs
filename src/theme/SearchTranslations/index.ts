import type { DocSearchTranslations } from '@docsearch/react'
import baseTranslations from '@theme-original/SearchTranslations'

type SearchTranslations = DocSearchTranslations & {
  placeholder?: string
  modal?: {
    searchBox?: {
      placeholderText?: string
      placeholderTextAskAi?: string
    }
  }
}

const t = baseTranslations as SearchTranslations

export default {
  ...t,
  modal: {
    ...t.modal,
    searchBox: {
      ...t.modal?.searchBox,
      placeholderText: 'Search or ask AI a question',
      placeholderTextAskAi: 'Ask AI a question…',
    },
  },
} satisfies SearchTranslations


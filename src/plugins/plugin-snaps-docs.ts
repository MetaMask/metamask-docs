import * as path from 'path'
import { readFileSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import prettier, { type Options as PrettierOptions } from 'prettier'
import { LoadContext, Plugin } from '@docusaurus/types'

export const SNAPS_RPC_URL = 'https://metamask.github.io/snaps/schema/latest/schema.json'
export const SNAPS_REF_PATH = 'snaps/reference/snaps-api'

type ExampleSnippet = {
  name?: string
  language?: string
  content?: string
}

type ExampleGroup = {
  examples?: ExampleSnippet | ExampleSnippet[]
}

/** Method object from the Snaps JSON schema (minimal fields used here). */
type SnapsSchemaMethod = Record<string, unknown> & { name: string }

function getPrettierParser(language: string): 'babel' | 'typescript' | null {
  const lang = language.toLowerCase()
  if (
    lang === 'js' ||
    lang === 'javascript' ||
    lang === 'jsx' ||
    lang === 'mjs' ||
    lang === 'cjs'
  ) {
    return 'babel'
  }
  if (
    lang === 'ts' ||
    lang === 'tsx' ||
    lang === 'typescript' ||
    lang === 'mts' ||
    lang === 'cts'
  ) {
    return 'typescript'
  }
  return null
}

/**
 * Formats TypeScript/JavaScript example snippets with the repo Prettier config (single quotes).
 * JSON snippets (for example manifest blocks) are left unchanged.
 */
async function formatMethodExamples(method: SnapsSchemaMethod, prettierOptions: PrettierOptions) {
  const raw = method.examples as ExampleGroup | ExampleGroup[] | undefined
  if (raw === undefined) {
    return
  }

  const formatSnippet = async (snippet: ExampleSnippet) => {
    if (typeof snippet.content !== 'string' || !snippet.content.trim()) {
      return
    }
    const lang = (snippet.language || '').toLowerCase()
    if (lang === 'json' || lang === 'json5') {
      return
    }
    const parser = getPrettierParser(lang)
    if (!parser) {
      return
    }
    try {
      snippet.content = await prettier.format(snippet.content, {
        ...prettierOptions,
        parser,
      })
    } catch {
      // Keep schema text if Prettier cannot parse it.
    }
  }

  const formatGroup = async (group: ExampleGroup) => {
    if (!group?.examples) {
      return
    }
    const list = Array.isArray(group.examples) ? group.examples : [group.examples]
    for (const s of list) {
      await formatSnippet(s)
    }
  }

  if (Array.isArray(raw)) {
    for (const g of raw) {
      await formatGroup(g)
    }
  } else {
    await formatGroup(raw)
  }
}

export default function useSnapsDocsPlugin(context: LoadContext): Plugin {
  /**
   * Fetch the Snaps API schema from the specified URL and return the list of methods. If the fetch
   * fails, an error is thrown with the appropriate message.
   *
   * @returns A promise that resolves to an array of Snaps API methods.
   */
  async function fetchSnapsMethods() {
    return await fetch(SNAPS_RPC_URL).then(response => {
      if (!response.ok || response.status !== 200) {
        throw new Error(`Failed to fetch Snaps API schema: ${response.statusText}`)
      }

      return response.json()
    })
  }

  /**
   * Generate documentation files for each Snaps API method. The method information is fetched from
   * the Snaps API schema, and a Markdown file is created for each method in the appropriate
   * directory. If the reference directory does not exist, it is created before writing the files.
   *
   * This should be run as a CLI command (`snaps:generate`) before starting Docusaurus to ensure
   * that the documentation files are generated and available for the site build. By generating the
   * documentation files as a separate step, `@docusaurus/plugin-content-docs` can properly process
   * them and include them in the site navigation.
   */
  async function generateSnapsDocs() {
    const methods = (await fetchSnapsMethods()) as SnapsSchemaMethod[]
    const prettierOptions = JSON.parse(
      readFileSync(path.join(context.siteDir, '.prettierrc'), 'utf8')
    ) as PrettierOptions

    for (const method of methods) {
      await formatMethodExamples(method, prettierOptions)
    }

    // Ensure the reference directory exists before trying to write files.
    await mkdir(path.join(context.siteDir, SNAPS_REF_PATH), {
      recursive: true,
    })

    for (const method of methods) {
      const methodName = method.name.toLowerCase()
      const filePath = path.join(
        context.siteDir,
        'snaps',
        'reference',
        'snaps-api',
        `${methodName}.mdx`
      )

      // The upstream schema occasionally embeds insecure `http://docs.metamask.io`
      // links (for example in the `wallet_snap` description). Normalize them to
      // HTTPS so the rendered pages don't link from an HTTPS page to HTTP.
      const methodJson = JSON.stringify(method).replaceAll(
        'http://docs.metamask.io',
        'https://docs.metamask.io'
      )

      const content = `---
id: ${methodName}
title: ${method.name}
description: Reference documentation for the \`${method.name}\` method of the Snaps API.
hide_title: true
hide_table_of_contents: true
---

import SnapsAPIReference from '@site/src/components/SnapsAPIReference/index.mdx';

<SnapsAPIReference method={${methodJson}}  />
`

      await writeFile(filePath, content)
    }
  }

  return {
    name: 'plugin-snaps-docs',

    /**
     * Hook into the Docusaurus CLI to add a custom command (`snaps:generate`) that generates
     * documentation for Snaps API methods.
     *
     * @see {@link generateSnapsDocs} for the implementation of the documentation generation logic.
     * @param cli - The Docusaurus CLI instance to extend with the custom command.
     */
    extendCli(cli) {
      cli
        .command('snaps:generate')
        .description('Generate documentation for Snaps API methods')
        .action(async () => await generateSnapsDocs())
    },
  }
}

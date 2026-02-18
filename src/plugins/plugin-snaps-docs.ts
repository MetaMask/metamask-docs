import * as path from 'path'
import { readFile, mkdir, writeFile } from 'fs/promises'
import { LoadContext, Plugin } from '@docusaurus/types'

// TODO: Update to `latest`.
export const SNAPS_RPC_URL = 'https://metamask.github.io/snaps/schema/staging/schema.json'
export const SNAPS_REF_PATH = 'snaps/reference/snaps-api'

async function fetchSnapsMethods() {
  return await fetch(SNAPS_RPC_URL)
    .then((response) => {
      if (!response.ok || response.status !== 200) {
        throw new Error(`Failed to fetch Snaps API schema: ${response.statusText}`)
      }
      return response.json()
    })
    .catch((error) => {
      console.error('Error fetching Snaps API schema:', error)
      return []
    })
}

export default function useSnapsDocsPlugin(context: LoadContext): Plugin {
  async function generateSnapsDocs() {
    const methods = await fetchSnapsMethods();

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

      const content = `---
id: ${methodName}
title: ${method.name}
hide_title: true
---

import SnapsAPIReference from '@site/src/components/SnapsAPIReference/index.mdx';

<SnapsAPIReference method={${JSON.stringify(method)}}  />
`

      await writeFile(filePath, content)
    }
  }

  return {
    name: 'plugin-snaps-docs',

    extendCli(cli) {
      cli
        .command('snaps:generate')
        .description('Generate documentation for Snaps API methods')
        .action(async () => await generateSnapsDocs())
    },
  }
}

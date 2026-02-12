import * as path from 'path'
import { readFile, mkdir, writeFile } from 'fs/promises'
import { LoadContext, Plugin } from '@docusaurus/types'

// TODO.
export const SNAPS_RPC_URL = 'https://metamask.github.io/api-specs/latest/openrpc.json'
export const SNAPS_REF_PATH = 'snaps/reference/snaps-api'

export default function useSnapsDocsPlugin(context: LoadContext): Plugin {
  async function generateSnapsDocs() {
    const methods = await readFile(path.join(__dirname, 'schema.json'), 'utf-8').then(JSON.parse)

    // Ensure the reference directory exists before trying to write files.
    await mkdir(path.join(context.siteDir, 'snaps', 'reference', 'snaps-api'), {
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

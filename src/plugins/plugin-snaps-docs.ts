import * as path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import { LoadContext, Plugin } from '@docusaurus/types'

// TODO: Update to `latest`.
export const SNAPS_RPC_URL = 'http://localhost:3000/schema.json'
export const SNAPS_REF_PATH = 'snaps/reference/snaps-api'

export default function useSnapsDocsPlugin(context: LoadContext): Plugin {
  /**
   * Fetch the Snaps API schema from the specified URL and return the list of methods. If the fetch
   * fails, an error is thrown with the appropriate message.
   *
   * @returns A promise that resolves to an array of Snaps API methods.
   */
  async function fetchSnapsMethods() {
    return await fetch(SNAPS_RPC_URL)
      .then((response) => {
        if (!response.ok || response.status !== 200) {
          throw new Error(`Failed to fetch Snaps API schema: ${response.statusText}`)
        }

        return response.json()
      });
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

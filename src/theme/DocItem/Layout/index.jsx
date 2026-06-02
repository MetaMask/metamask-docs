import React from 'react'
import clsx from 'clsx'
import Head from '@docusaurus/Head'
import { useWindowSize } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocVersionBanner from '@theme/DocVersionBanner'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemTags from '@theme/DocItem/Tags'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemContent from '@theme/DocItem/Content'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import CopyPageButton from '@site/src/components/CopyPageButton'
import DocH1CopyPageWrapper from '@site/src/components/DocH1CopyPageWrapper'
import styles from './styles.module.css'

const SITE_URL = 'https://docs.metamask.io'

function useStructuredData() {
  const { metadata, frontMatter } = useDoc()
  const { permalink, title, description, lastUpdatedAt } = metadata

  if (!permalink?.startsWith('/metamask-connect')) return null

  let proficiencyLevel = 'Beginner'
  if (permalink.includes('/reference/')) proficiencyLevel = 'Expert'
  else if (permalink.includes('/guides/')) proficiencyLevel = 'Intermediate'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: frontMatter.title || title,
    description: frontMatter.description || description,
    url: `${SITE_URL}${permalink}`,
    proficiencyLevel,
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }

  if (frontMatter.keywords) {
    schema.keywords = Array.isArray(frontMatter.keywords)
      ? frontMatter.keywords.join(', ')
      : frontMatter.keywords
  }

  if (lastUpdatedAt) {
    schema.dateModified = new Date(lastUpdatedAt * 1000).toISOString()
  }

  return schema
}
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()
  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0
  const mobile = canRender ? <DocItemTOCMobile /> : undefined
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined
  return {
    hidden,
    mobile,
    desktop,
  }
}
function useNoIndex() {
  const { frontMatter, metadata } = useDoc()
  return Boolean(frontMatter.unlisted ?? metadata.unlisted)
}
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC()
  const structuredData = useStructuredData()
  const noIndex = useNoIndex()
  return (
    <div className="row">
      {noIndex && (
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      {structuredData && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
      )}
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            {/* data-markdown-ignore wraps UI chrome that exists only in the
                rendered HTML (breadcrumbs, tags, mobile TOC, copy button,
                "Edit this page"/last-updated footer). AFDocs strips elements
                with this attribute before comparing HTML to the .md sibling,
                so the chrome no longer counts as "missing from markdown" in
                the markdown-content-parity check. The same attribute is
                respected by the build-time HTML→.md regenerator in
                src/plugins/llms-html-injector. */}
            <div data-markdown-ignore>
              <DocBreadcrumbs />
              <DocItemTags />
              {docTOC.mobile}
            </div>
            <DocH1CopyPageWrapper />
            <div data-markdown-ignore>
              <CopyPageButton />
            </div>
            <DocItemContent>{children}</DocItemContent>

            <div data-markdown-ignore>
              <DocItemFooter />
            </div>
          </article>
          <div data-markdown-ignore>
            <DocItemPaginator />
          </div>
        </div>
      </div>
      {docTOC.desktop && (
        <div className="col col--3" data-markdown-ignore>
          {docTOC.desktop}
        </div>
      )}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
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

function FeedbackWidget({ permalink }) {
  const [rating, setRating] = useState(null)
  const [phase, setPhase] = useState('initial')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setRating(null)
    setPhase('initial')
    setReason('')
  }, [permalink])

  const handleRating = (selected) => {
    setRating(selected)
    setPhase('comment')
  }

  const handleSubmit = async () => {
    if (rating === 'no' && !reason.trim()) return
    setSubmitting(true)

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'docs_feedback',
        page_url: window.location.pathname,
        rating,
        reason: reason.trim(),
      })
    }

    try {
      const res = await fetch('/api/docs-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: window.location.pathname,
          rating,
          reason: reason.trim(),
          timestamp: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
    } catch {
      setPhase('error')
      setSubmitting(false)
      return
    }

    setPhase('submitted')
    setSubmitting(false)
  }

  if (phase === 'submitted') {
    return (
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: '150%', color: 'var(--ifm-color-content-secondary)', margin: 0 }}>
          Thanks for your feedback!
        </p>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '1rem', color: 'var(--ifm-color-emphasis-600)', margin: 0 }}>
          Something went wrong. Please try again later.
        </p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      {phase === 'initial' && (
        <>
          <p style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: '150%', color: 'var(--ifm-color-content)', margin: '0 0 16px' }}>
            Was this page helpful?
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => handleRating('yes')}
              style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                appearance: 'none',
                fontFamily: 'var(--ifm-font-family-base)',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '10px 28px',
                margin: 0,
                borderRadius: '8px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                background: 'var(--ifm-background-surface-color)',
                color: 'var(--ifm-color-content-secondary)',
                cursor: 'pointer',
                outline: 'none',
                userSelect: 'none',
              }}>
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleRating('no')}
              style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                appearance: 'none',
                fontFamily: 'var(--ifm-font-family-base)',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '10px 28px',
                margin: 0,
                borderRadius: '8px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                background: 'var(--ifm-background-surface-color)',
                color: 'var(--ifm-color-content-secondary)',
                cursor: 'pointer',
                outline: 'none',
                userSelect: 'none',
              }}>
              No
            </button>
          </div>
        </>
      )}

      {phase === 'comment' && (
        <div style={{ marginTop: '20px' }}>
          <label htmlFor="feedback-reason" style={{ display: 'block', fontSize: '1rem', color: 'var(--ifm-color-content-secondary)', marginBottom: '10px' }}>
            {rating === 'yes' ? 'What worked well? (optional)' : 'What went wrong?'}
          </label>
          <textarea
            id="feedback-reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={rating === 'yes' ? 'Tell us what you liked...' : 'Tell us what we can improve...'}
            maxLength={1000}
            rows={3}
            required={rating === 'no'}
            style={{
              display: 'block',
              boxSizing: 'border-box',
              width: '100%',
              maxWidth: '560px',
              padding: '14px 16px',
              margin: 0,
              fontSize: '1rem',
              color: 'var(--ifm-color-content)',
              background: 'var(--ifm-background-surface-color)',
              border: '1px solid var(--ifm-color-emphasis-300)',
              borderRadius: '8px',
              fontFamily: 'var(--ifm-font-family-base)',
              resize: 'vertical',
              lineHeight: 1.6,
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || (rating === 'no' && !reason.trim())}
              style={{
                display: 'inline-block',
                boxSizing: 'border-box',
                appearance: 'none',
                fontFamily: 'var(--ifm-font-family-base)',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '10px 28px',
                margin: 0,
                borderRadius: '8px',
                border: 'none',
                background: 'var(--ifm-color-primary)',
                color: '#fff',
                cursor: 'pointer',
                outline: 'none',
                opacity: submitting || (rating === 'no' && !reason.trim()) ? 0.4 : 1,
              }}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

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
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC()
  const structuredData = useStructuredData()
  const { metadata } = useDoc()
  return (
    <div className="row">
      {structuredData && (
        <Head>
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </Head>
      )}
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocItemTags />
            {docTOC.mobile}
            <DocH1CopyPageWrapper />
            <CopyPageButton />
            <DocItemContent>{children}</DocItemContent>
            <FeedbackWidget permalink={metadata.permalink} />
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  )
}

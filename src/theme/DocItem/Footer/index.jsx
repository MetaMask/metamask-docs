import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import LastUpdated from '@theme/LastUpdated'
import EditThisPage from '@theme/EditThisPage'
import styles from './styles.module.css'

function FeedbackWidget({ resetKey }) {
  const [rating, setRating] = useState(null)
  const [phase, setPhase] = useState('initial')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setRating(null)
    setPhase('initial')
    setReason('')
  }, [resetKey])

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
      <div className={styles.feedbackWidget}>
        <p className={styles.feedbackThanks}>Thanks for your feedback!</p>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className={styles.feedbackWidget}>
        <p className={styles.feedbackError}>Something went wrong. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className={styles.feedbackWidget}>
      {phase === 'initial' && (
        <>
          <p className={styles.feedbackPrompt}>Was this page helpful?</p>
          <div className={styles.feedbackButtons}>
            <button
              type="button"
              className={styles.feedbackRatingBtn}
              onClick={() => handleRating('yes')}>
              Yes
            </button>
            <button
              type="button"
              className={styles.feedbackRatingBtn}
              onClick={() => handleRating('no')}>
              No
            </button>
          </div>
        </>
      )}

      {phase === 'comment' && (
        <div className={styles.feedbackCommentSection}>
          <label htmlFor="feedback-reason" className={styles.feedbackLabel}>
            {rating === 'yes' ? 'What worked well? (optional)' : 'What went wrong?'}
          </label>
          <textarea
            id="feedback-reason"
            className={styles.feedbackTextarea}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              rating === 'yes' ? 'Tell us what you liked...' : 'Tell us what we can improve...'
            }
            maxLength={1000}
            rows={3}
            required={rating === 'no'}
          />
          <div className={styles.feedbackActions}>
            <button
              type="button"
              className={styles.feedbackSubmitBtn}
              onClick={handleSubmit}
              disabled={submitting || (rating === 'no' && !reason.trim())}>
              {submitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DocItemFooter() {
  const { metadata } = useDoc()
  const { editUrl, lastUpdatedAt, formattedLastUpdatedAt, lastUpdatedBy } = metadata

  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, styles.footer)}>
      <div className={styles.topRow}>
        <div className={styles.feedbackCol}>
          <FeedbackWidget resetKey={metadata.permalink} />
        </div>
        <div className={styles.editCol}>{editUrl && <EditThisPage editUrl={editUrl} />}</div>
      </div>
      {(lastUpdatedAt || formattedLastUpdatedAt) && (
        <div className={clsx('type-paragraph-m', styles.lastUpdated)}>
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        </div>
      )}
    </footer>
  )
}

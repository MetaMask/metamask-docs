import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'

type Rating = 'yes' | 'no' | null
type Phase = 'initial' | 'comment' | 'submitted' | 'error'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    __feedbackDebug?: string[]
  }
}

function dbg(msg: string) {
  if (typeof window !== 'undefined') {
    window.__feedbackDebug = window.__feedbackDebug || []
    window.__feedbackDebug.push(`[${new Date().toISOString()}] ${msg}`)
    console.log(`[FeedbackWidget] ${msg}`)
  }
}

export default function FeedbackWidget(): React.ReactNode {
  const [rating, setRating] = useState<Rating>(null)
  const [phase, setPhase] = useState<Phase>('initial')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  dbg(`render: phase=${phase}, rating=${rating}`)

  useEffect(() => {
    dbg('useEffect fired (component mounted)')

    const widget = widgetRef.current
    if (!widget) {
      dbg('ERROR: widgetRef is null')
      return
    }

    dbg(`widget element found: ${widget.innerHTML.substring(0, 100)}`)

    const yesBtn = widget.querySelector('[data-feedback="yes"]') as HTMLElement
    const noBtn = widget.querySelector('[data-feedback="no"]') as HTMLElement
    dbg(`yesBtn found: ${!!yesBtn}, noBtn found: ${!!noBtn}`)

    if (yesBtn) {
      yesBtn.onclick = () => {
        dbg('YES clicked via direct onclick assignment')
        setRating('yes')
        setPhase('comment')
      }
    }
    if (noBtn) {
      noBtn.onclick = () => {
        dbg('NO clicked via direct onclick assignment')
        setRating('no')
        setPhase('comment')
      }
    }

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-feedback]')) {
        dbg(`document click captured on: ${target.textContent}`)
      }
    })
  }, [])

  useEffect(() => {
    dbg(`phase changed to: ${phase}`)
  }, [phase])

  const fireAnalyticsEvent = (selectedRating: Rating, reasonText: string) => {
    window.dataLayer?.push({
      event: 'docs_feedback',
      page_url: window.location.pathname,
      rating: selectedRating,
      reason: reasonText,
    })
  }

  const handleSubmit = async () => {
    if (rating === 'no' && !reason.trim()) return

    setSubmitting(true)
    fireAnalyticsEvent(rating, reason.trim())

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
      <div className={styles.widget} ref={widgetRef}>
        <p className={styles.thanks}>Thanks for your feedback!</p>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className={styles.widget} ref={widgetRef}>
        <p className={styles.error}>Something went wrong. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className={styles.widget} ref={widgetRef}>
      {phase === 'initial' && (
        <>
          <p className={styles.prompt}>Was this page helpful?</p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.ratingBtn}
              data-feedback="yes"
              onClick={() => {
                dbg('YES clicked via React onClick')
                setRating('yes')
                setPhase('comment')
              }}>
              Yes
            </button>
            <button
              type="button"
              className={styles.ratingBtn}
              data-feedback="no"
              onClick={() => {
                dbg('NO clicked via React onClick')
                setRating('no')
                setPhase('comment')
              }}>
              No
            </button>
          </div>
        </>
      )}

      {phase === 'comment' && (
        <div className={styles.commentSection}>
          <label htmlFor="feedback-reason" className={styles.label}>
            {rating === 'yes' ? 'What worked well? (optional)' : 'What went wrong?'}
          </label>
          <textarea
            id="feedback-reason"
            className={styles.textarea}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder={
              rating === 'yes' ? 'Tell us what you liked...' : 'Tell us what we can improve...'
            }
            maxLength={1000}
            rows={3}
            required={rating === 'no'}
          />
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.submitBtn}
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

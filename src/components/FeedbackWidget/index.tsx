import React, { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'

type Rating = 'yes' | 'no' | null
type Phase = 'initial' | 'comment' | 'submitted' | 'error'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export default function FeedbackWidget(): React.ReactNode {
  const [rating, setRating] = useState<Rating>(null)
  const [phase, setPhase] = useState<Phase>('initial')
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const yesBtnRef = useRef<HTMLButtonElement>(null)
  const noBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const yesBtn = yesBtnRef.current
    const noBtn = noBtnRef.current
    const onYes = () => {
      setRating('yes')
      setPhase('comment')
    }
    const onNo = () => {
      setRating('no')
      setPhase('comment')
    }
    yesBtn?.addEventListener('click', onYes)
    noBtn?.addEventListener('click', onNo)
    return () => {
      yesBtn?.removeEventListener('click', onYes)
      noBtn?.removeEventListener('click', onNo)
    }
  }, [])

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
      <div className={styles.widget}>
        <p className={styles.thanks}>Thanks for your feedback!</p>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className={styles.widget}>
        <p className={styles.error}>Something went wrong. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className={styles.widget}>
      {phase === 'initial' && (
        <>
          <p className={styles.prompt}>Was this page helpful?</p>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.ratingBtn}
              ref={yesBtnRef}
              onClick={() => {
                setRating('yes')
                setPhase('comment')
              }}>
              Yes
            </button>
            <button
              type="button"
              className={styles.ratingBtn}
              ref={noBtnRef}
              onClick={() => {
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

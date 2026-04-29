import React, { useState } from 'react'
import styles from './styles.module.css'

type Rating = 'yes' | 'no' | null
type Phase = 'initial' | 'reason' | 'submitted'

interface FeedbackOption {
  value: string
  label: string
  description: string
}

const YES_OPTIONS: FeedbackOption[] = [
  {
    value: 'accurate',
    label: 'Accurate',
    description: 'Accurately describes the product or feature.',
  },
  {
    value: 'solved',
    label: 'Solved my problem',
    description: 'Helped me resolve an issue.',
  },
  {
    value: 'easy',
    label: 'Easy to understand',
    description: 'Easy to follow and comprehend.',
  },
  {
    value: 'helpful',
    label: 'Helped me decide to use the product',
    description: 'Convinced me to adopt the product or feature.',
  },
  {
    value: 'other',
    label: 'Another reason',
    description: '',
  },
]

const NO_OPTIONS: FeedbackOption[] = [
  {
    value: 'inaccurate',
    label: 'Inaccurate',
    description: "Doesn't accurately describe the product or feature.",
  },
  {
    value: 'missing-info',
    label: "Couldn't find what I was looking for",
    description: 'Missing important information.',
  },
  {
    value: 'hard-to-understand',
    label: 'Hard to understand',
    description: 'Too complicated or unclear.',
  },
  {
    value: 'code-errors',
    label: 'Code sample errors',
    description: 'One or more code samples are incorrect.',
  },
  {
    value: 'other',
    label: 'Another reason',
    description: '',
  },
]

function stripHtml(text: string): string {
  let prev = text
  for (;;) {
    const next = prev.replace(/<[^>]*>/g, '')
    if (next === prev) return next
    prev = next
  }
}

function sanitizeReason(text: string): string {
  return stripHtml(text)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim()
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export default function FeedbackWidget(): React.ReactNode {
  const [rating, setRating] = useState<Rating>(null)
  const [phase, setPhase] = useState<Phase>('initial')
  const [selectedOption, setSelectedOption] = useState('')
  const [reason, setReason] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const options = rating === 'yes' ? YES_OPTIONS : NO_OPTIONS
  const isOtherSelected = selectedOption === 'other'
  const canSubmit = selectedOption !== '' && (!isOtherSelected || sanitizeReason(reason).length > 0)

  const handleRating = (selected: Rating) => {
    setRating(selected)
    setSelectedOption('')
    setReason('')
    setPhase('reason')
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    setSubmitting(true)
    setErrorMsg('')

    const reasonText = isOtherSelected ? reason.trim() : ''

    window.dataLayer?.push({
      event: 'docs_feedback',
      page_url: window.location.pathname,
      rating,
      option: selectedOption,
      reason: reasonText,
    })

    try {
      const res = await fetch('/api/docs-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page_url: window.location.pathname,
          rating,
          option: selectedOption,
          reason: reasonText,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || `Request failed (${res.status})`)
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      )
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

  return (
    <div className={styles.widget}>
      {phase === 'initial' && (
        <>
          <p className={styles.prompt}>Was this page helpful?</p>
          <div className={styles.buttons}>
            <button type="button" className={styles.ratingBtn} onClick={() => handleRating('yes')}>
              Yes
            </button>
            <button type="button" className={styles.ratingBtn} onClick={() => handleRating('no')}>
              No
            </button>
          </div>
        </>
      )}

      {phase === 'reason' && (
        <div className={styles.commentSection}>
          <p className={styles.label}>
            {rating === 'yes' ? 'What worked well?' : 'What went wrong?'}
          </p>
          <div className={styles.optionList} role="radiogroup">
            {options.map(opt => (
              <label key={opt.value} className={styles.option}>
                <input
                  type="radio"
                  name="feedback-option"
                  value={opt.value}
                  checked={selectedOption === opt.value}
                  onChange={() => setSelectedOption(opt.value)}
                  className={styles.radioInput}
                />
                <span className={styles.optionText}>
                  <span className={styles.optionLabel}>{opt.label}</span>
                  {opt.description && (
                    <span className={styles.optionDescription}>{opt.description}</span>
                  )}
                  {opt.value === 'other' && isOtherSelected && (
                    <textarea
                      className={styles.inlineTextarea}
                      value={reason}
                      onChange={e => {
                        e.stopPropagation()
                        setReason(e.target.value)
                      }}
                      onClick={e => e.stopPropagation()}
                      placeholder="Tell us more..."
                      maxLength={1000}
                      rows={7}
                    />
                  )}
                </span>
              </label>
            ))}
          </div>
          {errorMsg && (
            <p className={styles.error} role="alert">
              {errorMsg}
            </p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={submitting || !canSubmit}>
              {submitting ? 'Sending...' : errorMsg ? 'Try again' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

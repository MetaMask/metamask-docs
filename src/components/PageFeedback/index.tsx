import React, { useState, useEffect } from 'react'
import { trackFeedbackForGA } from '../../lib/feedbackAnalytics'
import styles from './styles.module.scss'

export default function PageFeedback() {
  const [feedbackGiven, setFeedbackGiven] = useState(false)
  const [reason, setReason] = useState('')
  const [otherReason, setOtherReason] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Demo logging when component loads
  useEffect(() => {
    console.log('🚀 PageFeedback component loaded and ready for demo!')
    console.log('📍 Current page:', window.location.pathname)
  }, [])

  const handleFeedback = (positive: boolean) => {
    console.log(`🎯 User clicked: ${positive ? 'Yes' : 'No'} (positive: ${positive})`)
    setFeedbackGiven(true)
    if (positive) {
      trackFeedbackForGA({
        positive: true,
        locale: navigator.language,
      })
      setSubmitted(true)
    }
  }

  const handleReasonSubmit = (r: string) => {
    console.log(`💭 User selected reason: "${r}"`)

    const data = {
      positive: false,
      reason: r,
      ...(r === 'other' && otherReason.trim() && { response: otherReason.trim() }),
      locale: navigator.language,
    }
    trackFeedbackForGA(data)
    setSubmitted(true)
  }

  const handleOtherReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOtherReason(e.target.value.slice(0, 120))
  }

  if (submitted) {
    return (
      <div className={styles.feedbackBox}>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackMain}>
            <p className={styles.successMessage}>
              Thanks for your feedback! We appreciate your input.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!feedbackGiven) {
    return (
      <div className={styles.feedbackBox}>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackMain}>
            <p className={styles.question}>Was this page helpful?</p>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.feedbackButton} ${styles.positiveButton}`}
                onClick={() => handleFeedback(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M10.1187 1.08741C8.925 0.746789 7.67813 1.43741 7.3375 2.63116L7.15938 3.25616C7.04375 3.66241 6.83438 4.03741 6.55 4.34991L4.94688 6.11241C4.66875 6.41866 4.69062 6.89366 4.99687 7.17179C5.30312 7.44991 5.77813 7.42804 6.05625 7.12179L7.65938 5.35929C8.1 4.87491 8.42188 4.29679 8.6 3.66866L8.77812 3.04366C8.89062 2.64679 9.30625 2.41554 9.70625 2.52804C10.1063 2.64054 10.3344 3.05616 10.2219 3.45616L10.0437 4.08116C9.86562 4.70304 9.58437 5.29054 9.2125 5.81554C9.05 6.04366 9.03125 6.34366 9.15938 6.59366C9.2875 6.84366 9.54375 6.99991 9.825 6.99991H14C14.275 6.99991 14.5 7.22491 14.5 7.49991C14.5 7.71241 14.3656 7.89679 14.175 7.96866C13.9438 8.05616 13.7688 8.24992 13.7094 8.49054C13.65 8.73117 13.7125 8.98429 13.875 9.16866C13.9531 9.25616 14 9.37179 14 9.49991C14 9.74366 13.825 9.94679 13.5938 9.99054C13.3375 10.0405 13.1219 10.2187 13.0312 10.4624C12.9406 10.7062 12.9813 10.9843 13.1438 11.1905C13.2094 11.2749 13.25 11.3812 13.25 11.4999C13.25 11.7093 13.1187 11.8937 12.9312 11.9655C12.5719 12.1062 12.3781 12.4937 12.4812 12.8655C12.4937 12.9062 12.5 12.953 12.5 12.9999C12.5 13.2749 12.275 13.4999 12 13.4999H8.95312C8.55937 13.4999 8.17188 13.3843 7.84375 13.1655L5.91563 11.8812C5.57188 11.6499 5.10625 11.7437 4.875 12.0905C4.64375 12.4374 4.7375 12.8999 5.08437 13.1312L7.0125 14.4155C7.5875 14.7999 8.2625 15.003 8.95312 15.003H12C13.0844 15.003 13.9656 14.1405 14 13.0655C14.4563 12.6999 14.75 12.1374 14.75 11.503C14.75 11.3624 14.7344 11.228 14.7094 11.0968C15.1906 10.7312 15.5 10.153 15.5 9.50304C15.5 9.29991 15.4688 9.10304 15.4125 8.91866C15.775 8.55304 16 8.05304 16 7.49991C16 6.39679 15.1063 5.49991 14 5.49991H11.1156C11.2625 5.17491 11.3875 4.83741 11.4844 4.49366L11.6625 3.86866C12.0031 2.67491 11.3125 1.42804 10.1187 1.08741ZM1 5.99991C0.446875 5.99991 0 6.44679 0 6.99991V13.9999C0 14.553 0.446875 14.9999 1 14.9999H3C3.55313 14.9999 4 14.553 4 13.9999V6.99991C4 6.44679 3.55313 5.99991 3 5.99991H1Z"></path>
                </svg>
                <small>Yes</small>
              </button>
              <button
                className={`${styles.feedbackButton} ${styles.negativeButton}`}
                onClick={() => handleFeedback(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M10.1187 14.9124C8.925 15.253 7.67813 14.5624 7.3375 13.3687L7.15938 12.7437C7.04375 12.3374 6.83438 11.9624 6.55 11.6499L4.94688 9.8874C4.66875 9.58115 4.69062 9.10615 4.99687 8.82803C5.30312 8.5499 5.77813 8.57178 6.05625 8.87803L7.65938 10.6405C8.1 11.1249 8.42188 11.703 8.6 12.3312L8.77812 12.9562C8.89062 13.353 9.30625 13.5843 9.70625 13.4718C10.1063 13.3593 10.3344 12.9437 10.2219 12.5437L10.0437 11.9187C9.86562 11.2968 9.58437 10.7093 9.2125 10.1843C9.05 9.95615 9.03125 9.65615 9.15938 9.40615C9.2875 9.15615 9.54375 8.9999 9.825 8.9999H14C14.275 8.9999 14.5 8.7749 14.5 8.4999C14.5 8.2874 14.3656 8.10303 14.175 8.03115C13.9438 7.94365 13.7688 7.7499 13.7094 7.50928C13.65 7.26865 13.7125 7.01553 13.875 6.83115C13.9531 6.74365 14 6.62803 14 6.4999C14 6.25615 13.825 6.05303 13.5938 6.00928C13.3375 5.95928 13.1219 5.78115 13.0312 5.53428C12.9406 5.2874 12.9813 5.0124 13.1438 4.80615C13.2094 4.72178 13.25 4.61553 13.25 4.49678C13.25 4.2874 13.1187 4.10303 12.9312 4.03115C12.5719 3.89053 12.3781 3.50303 12.4812 3.13115C12.4937 3.09053 12.5 3.04365 12.5 2.99678C12.5 2.72178 12.275 2.49678 12 2.49678H8.95312C8.55937 2.49678 8.17188 2.6124 7.84375 2.83115L5.91563 4.11553C5.57188 4.34678 5.10625 4.25303 4.875 3.90615C4.64375 3.55928 4.7375 3.09678 5.08437 2.86553L7.0125 1.58115C7.5875 1.19678 8.2625 0.993652 8.95312 0.993652H12C13.0844 0.993652 13.9656 1.85615 14 2.93115C14.4563 3.29678 14.75 3.85928 14.75 4.49365C14.75 4.63428 14.7344 4.76865 14.7094 4.8999C15.1906 5.26553 15.5 5.84365 15.5 6.49365C15.5 6.69678 15.4688 6.89365 15.4125 7.07803C15.775 7.44678 16 7.94678 16 8.4999C16 9.60303 15.1063 10.4999 14 10.4999H11.1156C11.2625 10.8249 11.3875 11.1624 11.4844 11.5062L11.6625 12.1312C12.0031 13.3249 11.3125 14.5718 10.1187 14.9124ZM1 11.9999C0.446875 11.9999 0 11.553 0 10.9999V3.9999C0 3.44678 0.446875 2.9999 1 2.9999H3C3.55313 2.9999 4 3.44678 4 3.9999V10.9999C4 11.553 3.55313 11.9999 3 11.9999H1Z"></path>
                </svg>
                <small>No</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!reason) {
    return (
      <div className={styles.feedbackBox}>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackMain}>
            <p className={styles.question}>What didn't work for you?</p>
          </div>
        </div>
        <div className={styles.reasonButtons}>
          <button
            className={styles.reasonButton}
            onClick={() => {
              setReason('inaccurate_content')
              handleReasonSubmit('inaccurate_content')
            }}>
            Inaccurate content
          </button>
          <button
            className={styles.reasonButton}
            onClick={() => {
              setReason('content_missing')
              handleReasonSubmit('content_missing')
            }}>
            Couldn't find what I was looking for
          </button>
          <button
            className={styles.reasonButton}
            onClick={() => {
              setReason('outdated_content')
              handleReasonSubmit('outdated_content')
            }}>
            Outdated content
          </button>
          <button className={styles.reasonButton} onClick={() => setReason('other')}>
            Other (include response)
          </button>
        </div>
      </div>
    )
  }

  if (reason === 'other') {
    return (
      <div className={styles.feedbackBox}>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackMain}>
            <p className={styles.question}>Please tell us more:</p>
          </div>
        </div>
        <textarea
          className={styles.textArea}
          placeholder="Tell us more (max 120 characters)..."
          value={otherReason}
          onChange={handleOtherReasonChange}
          maxLength={120}
        />
        <div className={styles.textareaFooter}>
          <span className={styles.charCount}>{otherReason.length}/120</span>
          <button
            className={styles.submitButton}
            onClick={() => handleReasonSubmit('other')}
            disabled={!otherReason.trim()}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  return null
}

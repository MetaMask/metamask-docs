interface FeedbackData {
  positive: boolean
  reason?: string
  locale?: string
  timestamp?: number
}

/**
 * Track feedback events for Google Analytics 4
 * Sends feedback data to GA4 using gtag() or dataLayer fallback
 */
export const trackFeedbackForGA = ({ positive, reason, locale, timestamp }: FeedbackData): void => {
  if (typeof window === 'undefined') {
    console.warn('Window object not available - feedback tracking skipped')
    return
  }

  const eventData = {
    feedback_type: positive ? 'positive' : 'negative',
    ...(reason && { reason }),
    locale: locale || navigator.language,
    page_path: window.location.pathname,
    timestamp: timestamp || Date.now(),
  }

  // Try gtag first (preferred method)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_feedback', eventData)
      console.log('✅ Feedback tracked via Google Analytics (gtag):', eventData)
      return
    } catch (error) {
      console.error('Error tracking feedback event via gtag:', error)
    }
  }

  // Fallback to dataLayer (works even before GTM fully loads)
  if (typeof window !== 'undefined') {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || []

    try {
      window.dataLayer.push({
        event: 'page_feedback',
        ...eventData,
      })
      console.log('✅ Feedback tracked via Google Tag Manager (dataLayer):', eventData)
      console.log('📊 DataLayer updated:', window.dataLayer.slice(-2)) // Show last 2 entries
      return
    } catch (error) {
      console.error('Error tracking feedback event via dataLayer:', error)
    }
  }

  // Final fallback - just log the event for manual tracking
  console.warn('No tracking method available. Event data:', eventData)
}

// Type augmentation for window object
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    google_tag_manager?: any
  }
}

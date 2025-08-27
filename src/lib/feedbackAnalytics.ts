interface FeedbackData {
  positive: boolean
  reason?: string
  custom_reason?: string
  locale?: string
  device_type?: string
}

/**
 * Detect device type based on user agent and screen size
 */
const getDeviceType = (): string => {
  if (typeof window === 'undefined') return 'unknown'

  const userAgent = navigator.userAgent.toLowerCase()
  const screenWidth = window.screen.width

  // Mobile devices
  if (/android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
    return 'mobile'
  }

  // Tablet devices
  if (
    /ipad|android(?!.*mobile)|tablet/i.test(userAgent) ||
    (screenWidth >= 768 && screenWidth <= 1024)
  ) {
    return 'tablet'
  }

  // Desktop devices
  if (screenWidth > 1024) {
    return 'desktop'
  }

  // Fallback based on screen size
  if (screenWidth <= 768) {
    return 'mobile'
  }

  return 'desktop'
}

/**
 * Track feedback events using dataLayer
 * Sends feedback data directly to dataLayer for Google Tag Manager
 */
export const trackFeedbackForGA = ({
  positive,
  reason,
  custom_reason,
  locale,
  device_type,
}: FeedbackData): void => {
  if (typeof window === 'undefined') {
    console.warn('Window object not available - feedback tracking skipped')
    return
  }

  const detectedDeviceType = device_type || getDeviceType()

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || []

  const eventData = {
    event: 'page_feedback',
    feedback_type: positive ? 'positive' : 'negative',
    ...(reason && { reason }),
    ...(custom_reason && { custom_reason }),
    locale: locale || navigator.language,
    page_path: window.location.pathname,
    device_type: detectedDeviceType,
  }

  // Console log for demo purposes
  console.log(
    `📱 Device detected as: ${detectedDeviceType} (screen: ${window.screen.width}x${window.screen.height})`
  )

  try {
    window.dataLayer.push(eventData)
    console.log('✅ Feedback tracked via dataLayer:', eventData)
    console.log('📊 DataLayer updated:', window.dataLayer.slice(-2)) // Show last 2 entries
  } catch (error) {
    console.error('Error tracking feedback event via dataLayer:', error)
    // Final fallback - just log the event for manual tracking
    console.warn('No tracking method available. Event data:', eventData)
  }
}

/**
 * Unified feedback tracking function that sends to both GA4 and Segment
 */
export const trackFeedback = (data: FeedbackData): void => {
  // Track to GA4
  trackFeedbackForGA(data)

  // Track to Segment
  import('../lib/segmentAnalytics')
    .then(({ trackFeedbackForSegment }) => {
      trackFeedbackForSegment({
        ...data,
        reason: data.reason || '',
        response: data.custom_reason || '', // Map custom_reason to response for Segment
        locale: data.locale || navigator.language,
        timestamp: Date.now(),
        device_type: data.device_type || getDeviceType(),
      })
    })
    .catch(error => {
      console.warn('Could not load Segment analytics:', error)
    })
}

// Type augmentation for window object
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    google_tag_manager?: any
  }
}

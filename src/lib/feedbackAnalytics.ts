interface FeedbackData {
  positive: boolean
  reason?: string
  response?: string
  locale?: string
  timestamp?: number
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
 * Track feedback events for Google Analytics 4
 * Sends feedback data to GA4 using gtag() or dataLayer fallback
 */
export const trackFeedbackForGA = ({
  positive,
  reason,
  response,
  locale,
  timestamp,
  device_type,
}: FeedbackData): void => {
  if (typeof window === 'undefined') {
    console.warn('Window object not available - feedback tracking skipped')
    return
  }

  const detectedDeviceType = device_type || getDeviceType()

  const eventData = {
    feedback_type: positive ? 'positive' : 'negative',
    ...(reason && { reason }),
    ...(response && { response }),
    locale: locale || navigator.language,
    page_path: window.location.pathname,
    timestamp: timestamp || Date.now(),
    device_type: detectedDeviceType,
  }

  // Console log for demo purposes
  console.log(
    `📱 Device detected as: ${detectedDeviceType} (screen: ${window.screen.width}x${window.screen.height})`
  )

  // Enable debug mode in development
  if (process.env.NODE_ENV === 'development' && typeof window.gtag === 'function') {
    try {
      window.gtag('config', 'debug_mode', true)
      console.log('🔍 GA4 Debug mode enabled for development')
    } catch (error) {
      console.log('⚠️ Could not enable debug mode:', error)
    }
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

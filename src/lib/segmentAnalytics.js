export const trackClickForSegment = ({
  eventName,
  clickType,
  userExperience,
  responseStatus,
  responseMsg,
  timestamp,
}) => {
  if (window.analytics) {
    window.analytics.track(`CTA ${clickType} Clicked`, {
      ...(eventName && { event_name: eventName }),
      ...(userExperience && { user_experience: userExperience }),
      ...(responseStatus && { response_status: responseStatus }),
      ...(responseMsg && { response_msg: responseMsg }),
      ...(timestamp && { timestamp: timestamp }),
    })
  }
}

export const trackInputChangeForSegment = ({ eventName, userExperience, timestamp }) => {
  if (window.analytics) {
    window.analytics.track('Input changed', {
      ...(eventName && { event_name: eventName }),
      ...(userExperience && { user_experience: userExperience }),
      ...(timestamp && { timestamp: timestamp }),
    })
  }
}

export const trackFeedbackForSegment = ({
  positive,
  reason,
  response,
  locale,
  timestamp,
  device_type,
}) => {
  if (window.analytics) {
    window.analytics.track('Page Feedback Submitted', {
      feedback_type: positive ? 'positive' : 'negative',
      ...(reason && { reason }),
      ...(response && { response }),
      locale: locale || navigator.language,
      page_path: window.location.pathname,
      timestamp: timestamp || Date.now(),
      device_type: device_type,
      category: 'Documentation',
      label: 'Page Helpfulness',
    })
    console.log('✅ Feedback tracked via Segment:', {
      feedback_type: positive ? 'positive' : 'negative',
      ...(reason && { reason }),
      ...(response && { response }),
      locale: locale || navigator.language,
      page_path: window.location.pathname,
      timestamp: timestamp || Date.now(),
      device_type: device_type,
    })
  } else {
    console.warn('⚠️ Segment analytics not available - feedback tracking skipped')
  }
}

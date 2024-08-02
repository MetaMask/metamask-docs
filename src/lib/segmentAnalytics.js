export const trackPageViewForSegment = ({ name, path, userExperience }) => {
  if (window.analytics) {
    window.analytics.page("Page viewed", name, {
      ...(path && { path: path }),
      ...(userExperience && { user_experience: userExperience }),
    });
  }
};

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
    });
  }
};

export const trackInputChangeForSegment = ({
  eventName,
  userExperience,
  timestamp,
}) => {
  if (window.analytics) {
    window.analytics.track("Input changed", {
      ...(eventName && { event_name: eventName }),
      ...(userExperience && { user_experience: userExperience }),
      ...(timestamp && { timestamp: timestamp }),
    });
  }
};

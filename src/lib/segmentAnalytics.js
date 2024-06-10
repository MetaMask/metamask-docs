export const trackClickForSegmentAnalytics = ({
  type,
  clickUrl,
  clickText,
  location,
  userId,
}) => {
  if (window.analytics) {
    window.analytics.track(`CTA ${type} Clicked`, {
      ...(clickUrl && { click_url: clickUrl }),
      ...(clickText && { click_text: clickText }),
      ...(location && { location }),
      ...(userId && { user_id: userId }),
    });
  }
};

export const trackPageForSegmentAnalytics = ({ name, path, userId }) => {
  if (window.analytics) {
    window.analytics.page("Page view", name, {
      ...(path && { path: path }),
      ...(userId && { userId: userId }),
    });
  }
};

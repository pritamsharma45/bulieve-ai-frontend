export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
      console.log('Analytics Event:', { event: eventName, ...eventParams });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Predefined events with GA4 naming conventions
export const ANALYTICS_EVENTS = {
  POST_CREATED: 'create_post',
  POST_LIKED: 'like_post',
  COMMENT_ADDED: 'add_comment',
  COMMUNITY_JOINED: 'join_community',
  COMMUNITY_CREATED: 'create_community',
}; 
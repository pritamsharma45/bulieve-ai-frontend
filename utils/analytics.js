export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }
};

// Predefined events
export const ANALYTICS_EVENTS = {
  POST_CREATED: 'post_created',
  POST_LIKED: 'post_liked',
  COMMENT_ADDED: 'comment_added',
  COMMUNITY_JOINED: 'community_joined',
  COMMUNITY_CREATED: 'community_created',
}; 
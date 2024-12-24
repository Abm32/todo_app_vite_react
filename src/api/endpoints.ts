// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh-token',
};

// User endpoints
export const USER_ENDPOINTS = {
  PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',
  UPLOAD_PHOTO: '/users/profile/photo',
};

// Journal endpoints
export const JOURNAL_ENDPOINTS = {
  ENTRIES: '/journal/entries',
  ENTRY: (id: string) => `/journal/entries/${id}`,
  PUBLIC_ENTRIES: '/journal/entries/public',
};

// Family endpoints
export const FAMILY_ENDPOINTS = {
  LIST: '/families',
  DETAIL: (id: string) => `/families/${id}`,
  CREATE: '/families',
  JOIN: (id: string) => `/families/${id}/join`,
  LEAVE: (id: string) => `/families/${id}/leave`,
  MEMBERS: (id: string) => `/families/${id}/members`,
  TREE: (id: string) => `/families/${id}/tree`,
};

// Message endpoints
export const MESSAGE_ENDPOINTS = {
  CONVERSATIONS: '/messages/conversations',
  MESSAGES: (conversationId: string) => `/messages/conversations/${conversationId}`,
  SEND: '/messages',
};

// Calendar endpoints
export const CALENDAR_ENDPOINTS = {
  EVENTS: '/calendar/events',
  EVENT: (id: string) => `/calendar/events/${id}`,
};
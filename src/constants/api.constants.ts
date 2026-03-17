/**
 * @file api.constants.ts
 * @description API endpoints and normalised API error codes reserved for the service layer.
 * @module src/constants/api
 */
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signUpParent: '/auth/signup/parent',
    signUpSchool: '/auth/signup/school',
    logout: '/auth/logout',
  },
  users: {
    me: '/users/me',
    children: '/users/me/children',
  },
  bookings: {
    mine: '/bookings/mine',
    detail: (bookingId: string) => `/bookings/${bookingId}`,
  },
  services: {
    all: '/services',
  },
  league: {
    table: '/league/table',
    games: '/league/games',
  },
  knowledge: {
    caseStudies: '/knowledge/case-studies',
    freeActivities: '/knowledge/free-activities',
    faqs: '/faqs',
  },
} as const;

export const API_ERROR_CODES = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  BOOKING_NOT_FOUND: 'BOOKING_NOT_FOUND',
  BOOKING_ALREADY_CANCELLED: 'BOOKING_ALREADY_CANCELLED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  RESPONSE_VALIDATION_ERROR: 'RESPONSE_VALIDATION_ERROR',
} as const;

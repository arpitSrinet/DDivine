/**
 * @file routes.constants.ts
 * @description Central route definitions for all public, auth, and dashboard pages.
 * @module src/constants/routes
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  POLICIES: '/policies',
  CONTACT: '/contact-us',
  UPCOMING_EVENTS: '/upcoming-events',
  SERVICES_CURRICULAR: '/services/curricular',
  SERVICES_EXTRA: '/services/extra-curricular',
  SERVICES_HOLIDAY: '/services/holiday-camps',
  SERVICES_WRAPAROUND: '/services/wraparound-childcare',
  KNOWLEDGE_HUB: '/knowledge-hub',
  KNOWLEDGE_CASE_STUDIES: '/knowledge-hub/case-studies',
  KNOWLEDGE_FREE: '/knowledge-hub/free-activities',
  KNOWLEDGE_FAQS: '/knowledge-hub/faqs',
  LEAGUE: '/school-football-league',
  LOGIN: '/login',
  LOGIN_PARENT: '/login/parent',
  LOGIN_SCHOOL: '/login/school',
  SIGNUP: '/signup',
  SIGNUP_PARENT: '/signup/parent',
  SIGNUP_SCHOOL: '/signup/school',
  DASHBOARD_PROFILE: '/dashboard/profile',
  DASHBOARD_BOOKINGS: '/dashboard/bookings',
  DASHBOARD_CHILDREN: '/dashboard/children',
  DASHBOARD_SCHOOL: '/dashboard/school',
} as const;

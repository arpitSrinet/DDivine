/**
 * @file common.copy.ts
 * @description Shared application copy including navigation, actions, and layout shell text.
 * @module src/copy/common
 */
export const COMMON_COPY = {
  brandName: 'DDivine Training',
  navigation: {
    about: 'About us',
    services: 'Our services',
    policies: 'Our policies',
    events: 'Upcoming events',
    knowledgeHub: 'Knowledge hub',
    league: 'School football league',
  },
  actions: {
    learnMore: 'Learn more',
    enquire: 'Enquire',
    signUp: 'Sign up',
    logIn: 'Log in',
  },
  layout: {
    skipToContent: 'Skip to main content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    footerSummary:
      'Fun, inclusive, and structured sports coaching and childcare for children aged 5-14.',
    footerCopyright: 'DDivine Training. All rights reserved.',
    authPanelTitle: 'Progress starts with a clear path.',
    authPanelBody:
      'This Phase 4 auth shell confirms routing and layout only. Form logic and submission arrive later.',
    dashboardPanelTitle: 'Dashboard shell preview',
    dashboardPanelBody:
      'This Phase 4 dashboard shell confirms protected route structure only. Real account logic arrives later.',
    dashboardNavigation: {
      profile: 'Profile',
      bookings: 'My bookings',
      children: 'Children',
      school: 'School profile',
    },
    stubDescriptions: {
      public:
        'This page is a routing stub for Phase 4. Real content is intentionally deferred until the public page build phase.',
      auth:
        'This auth page is a layout and routing stub for Phase 4. Form fields and validation are intentionally deferred.',
      dashboard:
        'This dashboard page is a shell-only stub for Phase 4. Protected logic, data, and features are intentionally deferred.',
    },
  },
  meta: {
    appShellTitle: 'DDivine Training',
  },
} as const;

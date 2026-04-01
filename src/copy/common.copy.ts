/**
 * @file common.copy.ts
 * @description Shared application copy including navigation, actions, and layout shell text.
 * @module src/copy/common
 */
const policiesBodyParagraph =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.';

const policiesContentsItems = [
  'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
  'What lorem ipsum dolor sit amet consectetur adipiscing elit?',
  'When and lorem ipsum dolor sit amet consectetur adipiscing elit??',
  'Do we use lorem ipsum dolor sit amet consectetur adipiscing elit?',
  'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
] as const;

export const COMMON_COPY = {
  brandName: 'DDivine Training',
  navigation: {
    home: 'Home',
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
    contactUs: 'Contact us',
    signUp: 'Sign up',
    logIn: 'Log in',
    logout: 'Log out',
    readMore: 'Read more',
    bookNow: "Book your child's place",
    tryAgain: 'Try again',
  },
  status: {
    loadingPage: 'Loading page...',
    routeFailed: 'Route failed to load.',
    staticPreview: 'Static preview',
    liveData: 'Live data',
    offline: "You're offline. Check your connection — changes won't be saved.",
  },
  errors: {
    page: {
      title: 'We hit a snag',
      body: 'This page could not be rendered right now. Please try again.',
    },
    section: {
      title: 'This section is unavailable',
      body: 'The content could not be loaded right now. Please retry.',
    },
  },
  emptyStates: {
    services: {
      title: 'No services available yet',
      body: 'Service information will appear here once it is available.',
    },
    serviceDetail: {
      title: 'Service details are unavailable',
      body: 'We could not find the requested service details right now.',
    },
    league: {
      title: 'No league entries yet',
      body: 'League standings will appear here as soon as teams are registered.',
    },
    caseStudies: {
      title: 'No case studies yet',
      body: 'Case studies will appear here once they are published.',
    },
    freeActivities: {
      title: 'No free activities yet',
      body: 'Downloadable activity resources will appear here once they are published.',
    },
    faqs: {
      title: 'No FAQs yet',
      body: 'Frequently asked questions will appear here once they are available.',
    },
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
  leagueTable: {
    filterLabel: 'Filter by team',
    allTeams: 'All teams',
    teamName: 'Team name',
    matchesPlayed: 'MP',
    wins: 'W',
    draws: 'D',
    losses: 'L',
    points: 'Pts',
  },
  ctaBanner: {
    title: 'Could your school or child benefit from our services?',
    body:
      'Whether you need school-day delivery, holiday support, or dependable wraparound childcare, DDivine can help you build a more active and better supported routine.',
    imageSrc:
      'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Children smiling during a group sports activity',
  },
  policiesPage: {
    title: 'Our policies',
    description:
      'Access all official documentation, safeguarding protocols, and operational guidelines for our school sports and events platform. We are committed to transparency and safety for all participants.',
    tabs: [
      'Privacy policy',
      'Ousted Registrations',
      'Reports',
      'Procedures',
    ],
    sections: [
      {
        title: 'Privacy Notice',
        paragraphs: [
          policiesBodyParagraph,
          policiesBodyParagraph,
          policiesBodyParagraph,
        ],
        summaryTitle: 'Summary of Key Points',
        summaryParagraphs: [
          policiesBodyParagraph,
          policiesBodyParagraph,
          policiesBodyParagraph,
        ],
      },
      {
        title: 'Privacy Notice',
        paragraphs: [
          policiesBodyParagraph,
          policiesBodyParagraph,
          policiesBodyParagraph,
        ],
        summaryTitle: 'Summary of Key Points',
        summaryParagraphs: [
          policiesBodyParagraph,
          policiesBodyParagraph,
          policiesBodyParagraph,
        ],
      },
    ],
    tableOfContents: {
      title: 'Table of contents',
      items: policiesContentsItems,
    },
  },
  eventsPage: {
    title: 'Upcoming events',
    description:
      'These sample event cards show how DDivine can present open days, camps, and league fixtures before live event data is introduced later.',
    imageSrc:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Children listening to a coach before a football activity',
    items: [
      {
        title: 'Spring holiday football camp',
        body: 'A multi-day active camp focused on teamwork, confidence, and enjoyable football sessions.',
      },
      {
        title: 'School partnership open morning',
        body: 'A walkthrough session for schools that want to see how coaching and childcare provision can be integrated.',
      },
      {
        title: 'League registration briefing',
        body: 'A practical session for schools interested in joining the football league and understanding the format.',
      },
    ],
  },
  meta: {
    appShellTitle: 'DDivine Training',
  },
} as const;

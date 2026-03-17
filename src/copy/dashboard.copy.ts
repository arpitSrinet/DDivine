/**
 * @file dashboard.copy.ts
 * @description Dashboard copy placeholders for protected parent and school areas.
 * @module src/copy/dashboard
 */
export const DASHBOARD_COPY = {
  profile: {
    pageTitle: 'My profile',
    saveButton: 'Save changes',
    cancelButton: 'Cancel',
  },
  bookings: {
    pageTitle: 'My bookings',
    emptyHeading: 'No bookings yet',
    emptyBody: 'Your upcoming sessions will appear here.',
  },
  children: {
    pageTitle: 'My children',
    addButton: 'Add a child',
  },
  school: {
    pageTitle: 'School profile',
  },
} as const;

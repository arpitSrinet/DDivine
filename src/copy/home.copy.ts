/**
 * @file home.copy.ts
 * @description Home page copy placeholders and stat labels for the public marketing site.
 * @module src/copy/home
 */
export const HOME_COPY = {
  hero: {
    heading: 'Sports coaching and wrap around childcare for your child or pupils',
    body: 'Making sport and childcare fun, inclusive, and safe for young people aged 5-14 of any gender and ability.',
    primaryCta: 'Enquire today',
    secondaryCta: 'Learn more',
  },
  stats: {
    schoolsContacted: 'Schools contacted',
    childrenCoached: 'Children coached',
    clubsCovered: 'Clubs covered',
    staffMembers: 'Staff members',
  },
  services: {
    curricular: 'PE teaching',
    extraCurricular: 'Extra curricular',
    holidayCamps: 'Holiday camps',
    wraparound: 'Wrap around childcare',
  },
} as const;

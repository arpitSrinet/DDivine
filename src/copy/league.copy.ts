/**
 * @file league.copy.ts
 * @description School football league copy for the static public page.
 * @module src/copy/league
 */
export const LEAGUE_COPY = {
  pageTitle: 'School football league',
  pageDescription:
    'A structured school football league that gives pupils a meaningful chance to compete while keeping the burden on schools low.',
  heroImage:
    'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1600&q=80',
  readyToCompeteHeading: 'Ready to compete?',
  readyToCompeteBody:
    'Register your school to join a league experience that gives pupils visibility, excitement, and a strong reason to represent their school positively.',
  registerCta: 'Register your school',
  learnMoreCta: 'Learn more',
  rows: [
    { teamName: 'Bligh Primary', matchesPlayed: 6, wins: 5, draws: 1, losses: 0, points: 16 },
    { teamName: 'Woodlands Academy', matchesPlayed: 6, wins: 4, draws: 1, losses: 1, points: 13 },
    { teamName: 'Pentbury School', matchesPlayed: 6, wins: 3, draws: 1, losses: 2, points: 10 },
    { teamName: 'Copperfield Primary', matchesPlayed: 6, wins: 2, draws: 0, losses: 4, points: 6 },
    { teamName: 'TrustEd Juniors', matchesPlayed: 6, wins: 1, draws: 1, losses: 4, points: 4 },
  ],
  galleryTitle: 'League day atmosphere',
  galleryImages: [
    {
      id: 'league-1',
      src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80',
      alt: 'School football match on a grass pitch',
      width: 800,
      height: 600,
    },
    {
      id: 'league-2',
      src: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80',
      alt: 'Children practising football drills together',
      width: 800,
      height: 600,
    },
    {
      id: 'league-3',
      src: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=800&q=80',
      alt: 'Team huddle before a school football game',
      width: 800,
      height: 600,
    },
  ],
  whyJoinTitle: 'Why should your school join the league?',
  whyJoinItems: [
    {
      title: 'Representation',
      body: 'Pupils get the chance to represent their school in a visible and memorable way.',
    },
    {
      title: 'Behaviour',
      body: 'Competition gives children a reason to practise self-control, respect, and teamwork.',
    },
    {
      title: 'Low admin',
      body: 'Schools can take part without needing to build a heavy internal competition structure.',
    },
    {
      title: 'Education support',
      body: 'Children benefit from confidence, engagement, and positive identity beyond the match itself.',
    },
  ],
  includedTitle: "What's included in our school football league?",
  includedBody:
    'The league is built to give children the excitement of competition while keeping planning, communication, and matchday structure well organised.',
  includedItems: [
    'Structured fixtures and clear communication',
    'Visible expectations around teamwork and behaviour',
    'A league format that supports representation and confidence',
    'Delivery that works alongside school schedules',
  ],
  includedImage:
    'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80',
  testimonials: [
    {
      quote:
        'The league gave our pupils something real to work towards and helped raise the profile of football in school without adding heavy admin.',
      speaker: 'PE lead',
      role: 'School football league',
    },
    {
      quote:
        'Children were proud to represent the school. The structure around fixtures and expectations made a big difference.',
      speaker: 'Assistant headteacher',
      role: 'Partner school',
    },
  ],
} as const;

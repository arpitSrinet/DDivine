/**
 * @file knowledge.copy.ts
 * @description Knowledge hub copy for the static public content pages.
 * @module src/copy/knowledge
 */
export const KNOWLEDGE_COPY = {
  hubTitle: 'Knowledge hub',
  hubDescription:
    'Explore case studies, practical resources, and frequently asked questions that show how DDivine supports schools and families.',
  hubImage:
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1600&q=80',
  hubCards: [
    {
      title: 'Case studies',
      body: 'Examples of how schools have used DDivine services to strengthen participation and provision.',
      imageSrc:
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Children and coach during a football practice session',
    },
    {
      title: 'Free activities',
      body: 'Downloadable ideas that help children stay active and engaged beyond session time.',
      imageSrc:
        'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Children taking part in a coach-led warmup',
    },
    {
      title: 'Frequently asked questions',
      body: 'Straightforward answers for schools, parents, and childcare enquiries.',
      imageSrc:
        'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Coach speaking with parents and children near a sports area',
    },
  ],
  hubCardCounts: {
    caseStudies: 'case studies currently available.',
    freeActivities: 'downloadable activities currently available.',
    faqs: 'questions currently answered.',
  },
  galleryTitle: 'A closer look at our delivery',
  galleryImages: [
    {
      id: 'knowledge-1',
      src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
      alt: 'Coach leading a football session',
      width: 800,
      height: 600,
    },
    {
      id: 'knowledge-2',
      src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
      alt: 'Children celebrating during a sports activity',
      width: 800,
      height: 600,
    },
    {
      id: 'knowledge-3',
      src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
      alt: 'Coach speaking with a small group of children',
      width: 800,
      height: 600,
    },
  ],
  caseStudiesTitle: 'Case studies',
  caseStudiesIntro:
    'These examples show how the right mix of coaching, childcare, and communication can create visible benefits for both schools and families.',
  caseStudies: [
    {
      title: 'Bligh Primary',
      body:
        'Bligh Primary used DDivine to strengthen extra-curricular attendance and give pupils a clear, positive football identity within the school week.',
    },
    {
      title: 'The Academy of Woodlands',
      body:
        'The Academy of Woodlands partnered with DDivine to deliver more consistent sports provision and create trusted communication with families around activity blocks.',
    },
  ],
  freeActivitiesTitle: 'Free activities',
  freeActivitiesIntro:
    'Simple activity ideas can keep children moving between sessions and give parents or schools extra support during busy weeks.',
  freeActivitiesGroups: [
    {
      title: 'Key stage 1',
      description: 'Short, playful activities designed to build confidence, coordination, and enjoyment in movement.',
      downloads: [
        'Ball control trail',
        'Colour cone challenge',
        'Partner passing game',
        'Home agility ladder',
      ],
    },
    {
      title: 'Key stage 2',
      description: 'A slightly more structured set of resources for older children who enjoy challenge and team-based learning.',
      downloads: [
        'Quick feet circuit',
        'Small-space passing drill',
        'Leadership warmup challenge',
      ],
    },
  ],
  faqsTitle: 'Frequently asked questions',
  faqsIntro:
    'The questions below cover the topics schools and parents most often raise before joining a service, club, or childcare offer.',
  faqSections: [
    {
      title: 'Curricular',
      items: [
        {
          question: 'How do you work alongside school staff?',
          answer: 'We plan delivery so staff have clarity on outcomes, session flow, and expectations without taking on extra admin.',
        },
        {
          question: 'Can parents understand what their child is working on?',
          answer: 'Yes. We keep communication simple and useful so families can see the purpose and tone of the provision.',
        },
      ],
    },
    {
      title: 'Holiday camps',
      items: [
        {
          question: 'What does a typical holiday-camp day look like?',
          answer: 'Days are structured around active blocks, breaks, team challenges, and calm transitions so the pace stays positive.',
        },
        {
          question: 'Are camps only for advanced footballers?',
          answer: 'No. The focus is participation, confidence, and enjoyment, so children can join at different levels.',
        },
      ],
    },
    {
      title: 'Wraparound childcare service',
      items: [
        {
          question: 'How does wraparound care support working families?',
          answer: 'Provision is built to fit practical school-day schedules while giving children a safe and engaging routine.',
        },
        {
          question: 'How are safeguarding and wellbeing handled?',
          answer: 'Clear supervision, dependable routines, and child-first communication shape the service from arrival to collection.',
        },
      ],
    },
  ],
} as const;

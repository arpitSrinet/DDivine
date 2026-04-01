/**
 * @file SchoolFootballLeaguePage.tsx
 * @description Bespoke public school football league page aligned closely to the supplied marketing design.
 * @module src/pages/public/SchoolFootballLeaguePage
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MarketingHeader, marketingShellClassName } from '@/components/layout';
import { MarketingBottomSection } from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, LEAGUE_COPY } from '@/copy';
import { useLeagueTable, useScrollRestoration } from '@/hooks';
import type { ILeagueTableRow } from '@/services/schemas';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TLeagueButtonVariant = 'outline-dark' | 'outline-light' | 'solid';

type TLeagueStandingsRow = ILeagueTableRow & {
  isPlaceholder?: boolean;
};

type TWhyJoinCard = {
  body: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
};

type TIncludedPoint = {
  body: string;
  title: string;
};

type TTestimonialItem = {
  avatarAlt: string;
  avatarSrc: string;
  quote: string;
  role: string;
  speaker: string;
};

const shellClassName = marketingShellClassName;

const heroImageSrc =
  'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1800&q=80';

const competeImageSrc =
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80';

const includedSectionImageSrc =
  'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1400&q=80';

const galleryStripImages = [
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80',
] as const;

const whyJoinCards: readonly TWhyJoinCard[] = [
  {
    body:
      'Playing in the school football league not only provides representation for your school but also instils pride in students (years 5 - 6) as they represent and compete for the school through football.',
    imageAlt: 'Children standing together before a school sports activity',
    imageSrc:
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
    title: 'Opportunity for pupils to represent their school',
  },
  {
    body:
      'Good behaviour is typically rewarded in school lessons and participation in the school football league can be offered to students as a reward for positive behaviour.',
    imageAlt: 'Children working together in a classroom',
    imageSrc:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    title: 'Promotes good behaviour from students',
  },
  {
    body:
      'Limited resources make it challenging for schools to arrange regular fixtures. We handle all admin, easing the burden on schools and staff, while ensuring consistent fixtures for pupils.',
    imageAlt: 'Coach speaking with a group of young football players',
    imageSrc:
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
    title: 'No admin or resources needed from school',
  },
  {
    body:
      'We create synergy between football and education by adding learning resources into each match report, developing both pupils’ football and academic abilities.',
    imageAlt: 'Child studying and smiling at a desk',
    imageSrc:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80',
    title: 'Supports the education of your students',
  },
  {
    body: 'Avoid the hassle of multiple pick-ups and enjoy more flexibility in your day.',
    imageAlt: 'Parent and child walking after school',
    imageSrc:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80',
    title: 'Convenience for parents',
  },
  {
    body: 'We provide a variety of engaging activities tailored to all interests.',
    imageAlt: 'Children taking part in an engaging activity together',
    imageSrc:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    title: 'Fun activities for every child',
  },
] as const;

const includedPoints: readonly TIncludedPoint[] = [
  {
    body:
      'When you use our curricular or extra-curricular football training sessions, your pupils footballing abilities will improve but you will get a discount on the school football league joining fee.',
    title: 'Extra football training sessions',
  },
  {
    body:
      'We run the league, schedule 2 fixtures per term and 10 per year, referee the games, and offer match reports with league standings, highlights, and educational materials for students.',
    title: 'Organised league and fixtures',
  },
  {
    body:
      'Pupils will have the opportunity to showcase their football abilities in competitive games at which football scouts may visit and provide a route to football at higher levels.',
    title: 'Football scouts at games',
  },
  {
    body:
      'As well as the league itself, we also run mini football tournaments at the end of the school year along with presentations held at professional football stadiums.',
    title: 'Opportunity to play at football stadiums',
  },
] as const;

const testimonialItems: readonly TTestimonialItem[] = [
  {
    avatarAlt: 'Portrait of Kishshana Palmer',
    avatarSrc:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus.',
    role: 'Lorem Ipsum Academy',
    speaker: 'Kishshana Palmer',
  },
  {
    avatarAlt: 'Portrait of Sandy Rees',
    avatarSrc:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus.',
    role: 'Lorem Ipsum Academy',
    speaker: 'Sandy Rees',
  },
  {
    avatarAlt: 'Portrait of Tayyab Yunus',
    avatarSrc:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus.',
    role: 'Lorem Ipsum Academy',
    speaker: 'Tayyab Yunus',
  },
  {
    avatarAlt: 'Portrait of Maria Jones',
    avatarSrc:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus.',
    role: 'Lorem Ipsum Academy',
    speaker: 'Maria Jones',
  },
  {
    avatarAlt: 'Portrait of Daniel Clark',
    avatarSrc:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare non sed est cursus. Vel hac convallis ipsum, facilisi odio pellentesque bibendum viverra tempus.',
    role: 'Lorem Ipsum Academy',
    speaker: 'Daniel Clark',
  },
] as const;

const closingCtaBody =
  "Our expert team provides fun, inclusive curricular and extra curricular activities and flexible care before and after school. Book your child's place online, or if you're a school, contact us today to get started!";

const WhyJoinCard = ({
  item,
}: {
  item: TWhyJoinCard;
}) => (
  <article className="w-full shrink-0 lg:w-[363px]">
    <img
      alt={item.imageAlt}
      className="h-[17rem] w-full rounded-[2px] object-cover lg:h-[284px]"
      loading="lazy"
      src={item.imageSrc}
    />
    <div className="mt-[19px] space-y-1">
      <h3 className="font-copy text-[1.2rem] font-bold leading-8 text-[#121212] lg:text-[25px] lg:leading-[35px]">
        {item.title}
      </h3>
      <p className="font-copy text-[0.95rem] leading-[1.45] text-[#121212] lg:text-[16px] lg:leading-[22.4px]">
        {item.body}
      </p>
    </div>
  </article>
);

const TestimonialCard = ({
  item,
}: {
  item: TTestimonialItem;
}) => (
  <article className="relative flex h-[418px] w-full shrink-0 flex-col justify-between bg-[#CCEBE2] px-[30px] py-[30px] lg:w-[286px]">
    <div className="space-y-2">
      <div className="font-display text-[61px] leading-[48.8px] text-[#121212]">“</div>
      <p className="w-full max-w-[246px] font-copy text-[16px] leading-[22.4px] text-[#414141]">
        {item.quote}
      </p>
    </div>

    <div className="space-y-3">
      <img
        alt={item.avatarAlt}
        className="h-12 w-12 rounded-full object-cover"
        loading="lazy"
        src={item.avatarSrc}
      />
      <div className="space-y-0.5">
        <div className="font-copy text-[13px] font-medium leading-[15.6px] text-[#121212]">
          {item.speaker}
        </div>
        <div className="font-copy text-[13px] leading-[15.6px] text-[#414141]">
          {item.role}
        </div>
      </div>
    </div>
  </article>
);

const LeaguePageButton = ({
  label,
  to,
  uppercase = false,
  variant = 'solid',
}: {
  label: string;
  to: string;
  uppercase?: boolean;
  variant?: TLeagueButtonVariant;
}) => (
  <Link
    className={[
      'inline-flex items-center justify-center rounded-[2px] px-[18px] py-[12px] font-display text-[1rem] leading-none tracking-[0.035em] transition',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2',
      'lg:text-[25px] lg:leading-[30px]',
      uppercase ? 'uppercase' : '',
      variant === 'solid'
        ? 'bg-[#90D4C1] text-[#030B18] hover:bg-[#7fcdb8] focus-visible:ring-offset-[#08193A]'
        : '',
      variant === 'outline-light'
        ? 'border border-[#E6E8EB] text-[#E6E8EB] hover:bg-white/10 focus-visible:ring-offset-[#08193A]'
        : '',
      variant === 'outline-dark'
        ? 'border border-[#08193A] text-[#08193A] hover:bg-[#08193A] hover:text-white focus-visible:ring-offset-white'
        : '',
    ].join(' ')}
    to={to}
  >
    {label}
  </Link>
);

const ArrowButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <button
    aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] border border-[rgba(3,11,24,0.12)] bg-white text-[#030B18] transition hover:bg-[#f7faf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-2"
    onClick={onClick}
    type="button"
  >
    <svg
      aria-hidden="true"
      className={`h-3 w-3 ${direction === 'left' ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 5L15 12L8 19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  </button>
);

const TeamLogoStub = ({
  teamName,
}: {
  teamName: string;
}) => (
  <div className="flex h-8 w-8 items-center justify-center rounded bg-[#F3F3F3] font-copy text-[12px] font-medium uppercase text-[#929292]">
    {teamName.charAt(0)}
  </div>
);

const SchoolFootballLeaguePage = () => {
  const leagueTableQuery = useLeagueTable();
  const [whyJoinIndex, setWhyJoinIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useScrollRestoration();

  const whyJoinVisibleCount = 4;
  const testimonialVisibleCount = 3;
  const whyJoinStepWidth = 387;
  const testimonialStepWidth = 340;

  const maxWhyJoinIndex = Math.max(whyJoinCards.length - whyJoinVisibleCount, 0);
  const maxTestimonialIndex = Math.max(testimonialItems.length - testimonialVisibleCount, 0);

  const sourceRows = leagueTableQuery.data.length > 0 ? leagueTableQuery.data : LEAGUE_COPY.rows;
  const sortedRows = [...sourceRows].sort(
    (left, right) => right.points - left.points || right.wins - left.wins || left.teamName.localeCompare(right.teamName),
  );
  const tableRows: TLeagueStandingsRow[] = [...sortedRows];

  while (tableRows.length < 8) {
    tableRows.push({
      draws: 0,
      isPlaceholder: true,
      losses: 0,
      matchesPlayed: 0,
      points: 0,
      teamName: 'Team Name',
      wins: 0,
    });
  }

  const whyJoinProgressPercent = whyJoinCards.length === 0
    ? 0
    : ((whyJoinIndex + whyJoinVisibleCount) / whyJoinCards.length) * 100;

  return (
    <>
      <PageSEO description={SEO_META.league.description} title={SEO_META.league.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>

      <main className="bg-white text-[#09131d]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#08193A] text-white">
          <img
            alt={LEAGUE_COPY.pageTitle}
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            src={heroImageSrc}
          />
          <div className="absolute inset-0 bg-[#08193A]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08193A]/58 via-[#08193A]/28 to-[#08193A]/44" />

          <div className={`relative z-10 min-h-[30rem] ${shellClassName} lg:h-[760px]`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />

            <div className="pb-14 pt-12 md:pb-16 md:pt-20 lg:min-h-[655px] lg:pb-[116px] lg:pt-[236px]">
              <div className="space-y-10 lg:space-y-[96px]">
                <div className="space-y-2 lg:max-w-[620px]">
                  <h1 className="font-display text-[3rem] leading-[0.88] text-white sm:text-[4.4rem] lg:whitespace-nowrap lg:text-[76px] lg:leading-[91.2px]">
                    School football league
                  </h1>
                  <p className="font-copy text-[0.95rem] leading-6 text-white sm:text-[1rem] lg:max-w-[379px] lg:text-[20px] lg:leading-[24px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                  {Array.from({ length: 3 }, (_, index) => (
                    <span
                      className={[
                        'h-1 w-12 rounded-[2px]',
                        index === 0 ? 'bg-white' : 'bg-[#8C8C8C]',
                      ].join(' ')}
                      key={`league-indicator-${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-12 md:py-14 lg:pb-[92px] lg:pt-[64px]`}>
          <div className="grid gap-8 lg:grid-cols-[684px_618px] lg:items-start lg:gap-[24px]">
            <div className="space-y-6 lg:space-y-[24px]">
              <h2 className="font-display text-[2.2rem] leading-[0.92] text-black sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
                League Table
              </h2>

              <div className="overflow-hidden rounded-2xl bg-white">
                <div className="border-b border-[#08193A] bg-[#90D4C1] pt-6">
                  <div className="flex items-center gap-4 overflow-hidden px-4 pb-[10px]">
                    <div className="flex h-[60px] w-[120px] items-center justify-center rounded-[2px] bg-[#08193A] font-display text-[1.35rem] uppercase tracking-[0.04em] text-white">
                      DD
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-copy text-[20px] font-medium leading-[24px] text-[#08193A]">
                        DDivine school league
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-[#030B18] bg-[#90D4C1] px-5 py-[10px]">
                  <div className="grid grid-cols-[24px_minmax(0,1fr)_24px_24px_24px_28px_26px] items-center gap-x-6">
                    <div className="col-span-2 font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">
                      Team name
                    </div>
                    <div className="text-center font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">MP</div>
                    <div className="text-center font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">W</div>
                    <div className="text-center font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">D</div>
                    <div className="text-center font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">L</div>
                    <div className="text-center font-copy text-[16px] font-bold leading-[19.2px] text-[#08193A]">Pts</div>
                  </div>
                </div>

                <div className="bg-white">
                  {tableRows.slice(0, 8).map((row, index) => (
                    <div className="bg-white" key={`${row.teamName}-${index + 1}`}>
                      <div className="grid grid-cols-[24px_minmax(0,1fr)_24px_24px_24px_28px_26px] items-center gap-x-6 px-5 pb-[19px] pt-5">
                        <div className="text-center font-copy text-[16px] font-medium leading-[19.2px] text-[#121212]">
                          -
                        </div>

                        <div className="flex min-w-0 items-center gap-4">
                          <TeamLogoStub teamName={row.teamName} />
                          <div className="truncate font-copy text-[16px] leading-[19.2px] text-[#1A0B26]">
                            {row.teamName}
                          </div>
                        </div>

                        <div className="text-center font-copy text-[16px] leading-[19.2px] text-[#1A0B26]">
                          {row.matchesPlayed}
                        </div>
                        <div className="text-center font-copy text-[16px] leading-[19.2px] text-[#1A0B26]">
                          {row.wins}
                        </div>
                        <div className="text-center font-copy text-[16px] leading-[19.2px] text-[#1A0B26]">
                          {row.draws}
                        </div>
                        <div className="text-center font-copy text-[16px] leading-[19.2px] text-[#1A0B26]">
                          {row.losses}
                        </div>
                        <div className="text-center font-copy text-[16px] font-medium leading-[19.2px] text-[#90D4C1]">
                          {row.points}
                        </div>
                      </div>
                      {index < 7 ? <div className="h-px bg-[#ECE8EF]" /> : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 lg:pt-[97px]">
              <div className="relative overflow-hidden rounded-[2px]">
                <img
                  alt="Child celebrating on a football pitch"
                  className="h-[18rem] w-full object-cover sm:h-[22rem] lg:h-[349px] lg:w-[618px]"
                  loading="lazy"
                  src={competeImageSrc}
                />
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2.5 lg:bottom-[16px]">
                  {Array.from({ length: 3 }, (_, index) => (
                    <span
                      className={[
                        'h-2 w-2 rounded-full border',
                        index === 0 ? 'border-white bg-white' : 'border-[#6B6B6B] bg-transparent',
                      ].join(' ')}
                      key={`compete-dot-${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-[#08193A] px-8 py-8 text-white lg:h-[287px]">
                <img
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-0 h-[122px] w-[246px] opacity-30 mix-blend-soft-light"
                  src="/assets/league-match.svg"
                />

                <div className="relative z-10 space-y-4">
                  <h2 className="font-display text-[2rem] leading-[1] text-white lg:text-[39px] lg:leading-[54.6px]">
                    Ready to Compete?
                  </h2>
                  <p className="max-w-[448px] font-copy text-[16px] leading-[22.4px] text-[#B2B8C2]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <LeaguePageButton label="Register your school" to={ROUTES.SIGNUP_SCHOOL} />
                    <LeaguePageButton label="Learn more" to={ROUTES.SERVICES} variant="outline-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-10 lg:py-[70px]">
          <div className="mx-auto hidden max-w-[1977px] lg:block">
            <div className="ml-[90px] flex items-center gap-6">
              {galleryStripImages.slice(0, 6).map((src, index) => (
                <img
                  alt={`League gallery ${index + 1}`}
                  className="h-[194px] w-[357px] object-cover"
                  key={`league-gallery-top-${index + 1}`}
                  loading="lazy"
                  src={src}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-6">
              {galleryStripImages.slice(6).map((src, index) => (
                <img
                  alt={`League gallery ${index + 7}`}
                  className="h-[194px] w-[357px] object-cover"
                  key={`league-gallery-bottom-${index + 7}`}
                  loading="lazy"
                  src={src}
                />
              ))}
            </div>
          </div>

          <div className={`${shellClassName} grid gap-4 sm:grid-cols-2 lg:hidden`}>
            {galleryStripImages.slice(0, 6).map((src, index) => (
              <img
                alt={`League gallery ${index + 1}`}
                className="h-[10rem] w-full rounded-[2px] object-cover"
                key={`league-gallery-mobile-${index + 1}`}
                loading="lazy"
                src={src}
              />
            ))}
          </div>
        </section>

        <section className={`${shellClassName} py-16 md:py-20 lg:pb-[196px] lg:pt-[96px]`}>
          <div className="space-y-10 lg:space-y-[64px]">
            <div className="max-w-[1341px]">
              <h2 className="font-display text-[2.3rem] leading-[0.95] text-black sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
                Why should your school join other local schools in our football league?
              </h2>
            </div>

            <div className="lg:hidden">
              <div className="grid gap-8 sm:grid-cols-2">
                {whyJoinCards.map((item) => (
                  <WhyJoinCard item={item} key={item.title} />
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-[1392px] overflow-hidden">
                <div
                  className="flex w-max gap-6 transition-transform duration-300"
                  style={{ transform: `translateX(-${whyJoinIndex * whyJoinStepWidth}px)` }}
                >
                  {whyJoinCards.map((item) => (
                    <WhyJoinCard item={item} key={item.title} />
                  ))}
                </div>
              </div>

              <div className="mt-[56px] flex items-center justify-center">
                <div className="flex w-[737px] items-center justify-between">
                  <div className="relative h-1 w-[570px] rounded-[2px] bg-[#394761]">
                    <div
                      className="h-1 rounded-[2px] bg-[#08193A] transition-all duration-300"
                      style={{ width: `${whyJoinProgressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <ArrowButton
                      direction="left"
                      onClick={() => setWhyJoinIndex((current) => (current === 0 ? maxWhyJoinIndex : current - 1))}
                    />
                    <ArrowButton
                      direction="right"
                      onClick={() => setWhyJoinIndex((current) => (current === maxWhyJoinIndex ? 0 : current + 1))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#90D4C1]/80 py-12 lg:min-h-[768px] lg:py-[64px]">
          <div className={`${shellClassName} relative z-10`}>
            <div className="mx-auto overflow-hidden rounded-[8px] bg-white shadow-[0_16px_48px_rgba(3,11,24,0.08)] lg:h-[650px] lg:w-[1344px]">
              <div className="grid gap-0 lg:grid-cols-[726px_618px]">
                <img
                  alt={LEAGUE_COPY.includedTitle}
                  className="h-[18rem] w-full object-cover lg:h-[650px] lg:w-[726px]"
                  loading="lazy"
                  src={includedSectionImageSrc}
                />

                <div className="space-y-8 px-6 py-6 sm:px-8 sm:py-8 lg:px-0 lg:pb-0 lg:pl-[24px] lg:pr-[30px] lg:pt-[27px]">
                  <div className="space-y-3">
                    <h2 className="max-w-[564px] font-display text-[2.2rem] uppercase leading-[0.95] text-[#08193A] sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
                      What&apos;s included in our school football league?
                    </h2>
                    <p className="max-w-[564px] font-copy text-[0.95rem] leading-7 text-[#08193A] md:text-[1rem] lg:text-[20px] lg:leading-[28px]">
                      Within our school football league, we offer more than just a league format and fixture arrangement. Like all our services we aim to provide as much value as possible. We do this so schools and pupils can get the most out of football services and the school football league is no different.
                    </p>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    {includedPoints.map((item) => (
                      <div className="space-y-2" key={item.title}>
                        <h3 className="font-copy text-[16px] font-medium leading-[19.2px] text-[#08193A]">
                          {item.title}
                        </h3>
                        <p className="font-copy text-[13px] leading-[18.2px] text-[#08193A]">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 md:py-20 lg:h-[672px] lg:py-0">
          <div className={`${shellClassName} relative lg:hidden`}>
            <div className="space-y-10">
              <div className="max-w-[542px]">
                <h2 className="font-display text-[2.2rem] leading-[0.95] text-[#030B18] sm:text-[3rem]">
                  Positive feedback we have recieved
                </h2>
              </div>

              <div>
                <div className="mb-6 flex items-center justify-end gap-3">
                  <ArrowButton
                    direction="left"
                    onClick={() => setTestimonialIndex((current) => (current === 0 ? maxTestimonialIndex : current - 1))}
                  />
                  <ArrowButton
                    direction="right"
                    onClick={() => setTestimonialIndex((current) => (current === maxTestimonialIndex ? 0 : current + 1))}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {testimonialItems.slice(0, 4).map((item) => (
                    <TestimonialCard item={item} key={`${item.speaker}-${item.role}`} />
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-2.5">
                  {testimonialItems.map((item, index) => {
                    const isActive = index === testimonialIndex;
                    return (
                      <span
                        className={[
                          'h-2 w-2 rounded-full border border-[#030B18]',
                          isActive ? 'bg-[#030B18]' : 'bg-transparent',
                        ].join(' ')}
                        key={`testimonial-dot-mobile-${item.speaker}-${index + 1}`}
                      />
                    );
                  })}
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none h-24 w-24 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff_0_16%,#111827_16%_18%,#ffffff_18%_34%,#111827_34%_36%,#ffffff_36%_52%,#111827_52%_54%,#ffffff_54%_100%)] shadow-[0_12px_22px_rgba(20,50,15,0.18)]"
              />
            </div>
          </div>

          <div className="relative mx-auto hidden h-[672px] max-w-[1440px] lg:block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-17px] top-[541px] h-[141px] w-[177px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff_0_16%,#111827_16%_18%,#ffffff_18%_34%,#111827_34%_36%,#ffffff_36%_52%,#111827_52%_54%,#ffffff_54%_100%)] shadow-[0_18px_36px_rgba(20,50,15,0.18)]"
            />

            <div className="absolute left-[48px] top-[267px] w-[542px]">
              <h2 className="font-display text-[61px] leading-[73.2px] text-[#030B18]">
                Positive feedback we have recieved
              </h2>
            </div>

            <div className="absolute left-[702px] top-[80px] flex items-center gap-5">
              <ArrowButton
                direction="left"
                onClick={() => setTestimonialIndex((current) => (current === 0 ? maxTestimonialIndex : current - 1))}
              />
              <ArrowButton
                direction="right"
                onClick={() => setTestimonialIndex((current) => (current === maxTestimonialIndex ? 0 : current + 1))}
              />
            </div>

            <div className="absolute left-[702px] top-[134px] w-[740px] overflow-hidden">
              <div
                className="flex w-max gap-[54px] transition-transform duration-300"
                style={{ transform: `translateX(-${testimonialIndex * testimonialStepWidth}px)` }}
              >
                {testimonialItems.map((item) => (
                  <TestimonialCard item={item} key={`${item.speaker}-${item.role}`} />
                ))}
              </div>
            </div>

            <div className="absolute left-[702px] top-[584px] flex items-center gap-2.5">
              {testimonialItems.map((item, index) => {
                const isActive = index === testimonialIndex;
                return (
                  <span
                    className={[
                      'h-2 w-2 rounded-full border border-[#030B18]',
                      isActive ? 'bg-[#030B18]' : 'bg-transparent',
                    ].join(' ')}
                    key={`testimonial-dot-desktop-${item.speaker}-${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <MarketingBottomSection
          body={closingCtaBody}
          id="league-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          title={COMMON_COPY.ctaBanner.title}
        />
      </main>
    </>
  );
};

export default SchoolFootballLeaguePage;

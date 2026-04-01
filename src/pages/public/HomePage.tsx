/**
 * @file HomePage.tsx
 * @description Public home page composed from static marketing sections for Phase 5.
 * @module src/pages/public/HomePage
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MarketingButton, MarketingHeader, marketingShellClassName } from '@/components/layout';
import { ROUTES, SERVICE_ROUTE_MAP } from '@/constants';
import { MarketingBottomSection } from '@/components/sections';
import { HOME_STATS } from '@/constants/stats.constants';
import { COMMON_COPY, HOME_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TLogoChipProps = {
  description?: string;
  name: string;
};

type TQuoteCardProps = {
  quote: string;
  role: string;
  speaker: string;
};

const shellClassName = marketingShellClassName;

const statsLabelMap = {
  childrenCoached: 'Children supported',
  clubsCovered: 'Districts covered',
  schoolsContacted: 'Schools onboarded',
  staffMembers: 'Staff members',
} as const;

const statsSupportMap = {
  childrenCoached: 'Fun, inclusive sessions delivered across every programme we run.',
  clubsCovered: 'Reliable delivery supporting children and schools across local areas.',
  schoolsContacted: 'Trusted partnerships built with schools who need consistent support.',
  staffMembers: 'Experienced team members focused on care, coaching, and safeguarding.',
} as const;

const statsItems = HOME_STATS.map((item) => ({
  ...item,
  label: statsLabelMap[item.id as keyof typeof statsLabelMap],
  supportingText: statsSupportMap[item.id as keyof typeof statsSupportMap],
}));

const homeServiceItems = [
  {
    ...HOME_COPY.services.curricular,
    href: SERVICE_ROUTE_MAP.curricular,
  },
  {
    ...HOME_COPY.services.extraCurricular,
    href: SERVICE_ROUTE_MAP.extraCurricular,
  },
  {
    ...HOME_COPY.services.holidayCamps,
    href: SERVICE_ROUTE_MAP.holidayCamps,
  },
  {
    ...HOME_COPY.services.wraparound,
    href: SERVICE_ROUTE_MAP.wraparound,
  },
] as const;

const schoolPartnerItems = [
  'Bligh Primary',
  'Woodlands Academy',
  'Pentbury School',
  'TrustEd Life',
  'Southfield',
  'Riverside',
  'Oakbridge',
] as const;

const trainingPartnerItems = [
  'LTA',
  'AFA',
  'England FA',
  'First Aid',
  'Street Games',
] as const;

const LogoChip = ({
  description,
  name,
}: TLogoChipProps) => (
  <article className="flex h-full min-h-[8rem] flex-col justify-center border border-[#d8e8e4] bg-white px-5 py-6 text-center">
    <div className="font-display text-2xl tracking-[0.04em] text-[#09131d]">
      {name}
    </div>
    {description ? (
      <p className="mt-2 font-copy text-sm leading-5 text-[#51606f]">
        {description}
      </p>
    ) : null}
  </article>
);

const QuoteCard = ({
  quote,
  role,
  speaker,
}: TQuoteCardProps) => {
  const initials = speaker
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
  <article className="flex h-full min-h-[23rem] w-full flex-col justify-between bg-[#d8f2ea] p-7 lg:min-h-[24rem]">
    <div>
      <div className="font-display text-6xl leading-none text-[#09131d]">
        &ldquo;
      </div>
      <p className="mt-3 font-copy text-[0.98rem] leading-6 text-[#425062]">
        {quote}
      </p>
      </div>
      <div className="mt-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white font-display text-lg tracking-[0.08em] text-[#09131d]">
          {initials}
        </div>
        <div>
          <p className="font-copy text-sm font-semibold text-[#09131d]">
            {speaker}
          </p>
          <p className="mt-1 font-copy text-xs text-[#5d6d7d]">
            {role}
          </p>
        </div>
      </div>
    </article>
  );
};

const HomePage = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useScrollRestoration();

  const totalTestimonials = HOME_COPY.testimonials.items.length;
  const visibleTestimonialItems = Array.from({ length: Math.min(3, totalTestimonials) }, (_, offset) => (
    HOME_COPY.testimonials.items[(testimonialIndex + offset) % totalTestimonials]
  ));

  return (
    <>
      <PageSEO description={SEO_META.home.description} title={SEO_META.home.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>
      <main className="bg-white text-[#09131d]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#09131d] text-white">
          <img
            alt={HOME_COPY.hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            height={1200}
            src={HOME_COPY.hero.imageSrc}
            width={1600}
          />
          <div className="absolute inset-0 bg-[#09131d]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09131d]/90 via-[#09131d]/65 to-[#09131d]/35" />
          <div className={`relative z-10 min-h-[30rem] ${shellClassName} lg:h-[760px]`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />
            <div className="grid gap-12 pb-16 pt-12 md:pb-24 md:pt-24 lg:min-h-[39rem] lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end xl:grid-cols-[minmax(0,1fr)_26rem]">
              <div className="max-w-[41rem]">
                <h1 className="font-display text-[3rem] uppercase leading-[0.88] tracking-[0.018em] text-white sm:text-[4.7rem] lg:text-[6.35rem]">
                  {HOME_COPY.hero.heading}
                </h1>
                <div className="mt-7 flex flex-wrap gap-3">
                  <MarketingButton label="View our services" to={ROUTES.SERVICES} />
                </div>
              </div>
              <div className="justify-self-start lg:justify-self-end lg:pb-3">
                <div className="grid grid-cols-2 gap-3">
                  {homeServiceItems.slice(0, 2).map((item) => (
                    <div className="space-y-2" key={item.href}>
                      <img
                        alt={item.imageAlt}
                        className="h-32 w-full border-2 border-white/70 object-cover shadow-[0_12px_28px_rgba(3,11,24,0.22)] md:h-36 lg:h-32"
                        loading="lazy"
                        src={item.imageSrc}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-5 h-[2px] w-full bg-white/40">
                  <div className="h-full w-1/3 bg-[#9ee4d2]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-14 md:py-16 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)]">
              <img
                alt={HOME_COPY.intro.imageAlt}
                className="h-full min-h-[24rem] w-full object-cover lg:min-h-[40rem]"
                loading="lazy"
                src={HOME_COPY.intro.imageSrc}
              />
              <div className="grid">
                <img
                  alt={HOME_COPY.services.extraCurricular.imageAlt}
                  className="h-52 w-full self-start object-cover sm:h-[24rem]"
                  loading="lazy"
                  src={HOME_COPY.services.extraCurricular.imageSrc}
                />
              </div>
            </div>
            <div className="space-y-8 lg:pt-12">
              <div className="space-y-5">
                <h2 className="max-w-[40rem] font-display text-[2.4rem] leading-[0.93] tracking-[0.01em] text-[#09131d] sm:text-[3.5rem] lg:text-[4.6rem]">
                  {HOME_COPY.intro.title}
                </h2>
                <p className="max-w-[39rem] font-copy text-base leading-7 text-[#425062] md:text-lg">
                  {HOME_COPY.intro.body}
                </p>
              </div>
              <div>
                <MarketingButton label={COMMON_COPY.actions.learnMore} to={ROUTES.ABOUT} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-8 md:py-10`}>
          <div className="grid gap-10 border-y border-[#e5eaef] py-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {statsItems.map((item) => (
              <article className="space-y-3" key={item.id}>
                <div className="font-display text-7xl leading-[0.88] text-[#09131d] md:text-[5.6rem]">
                  {item.value}
                  {item.suffix}
                </div>
                <div className="mx-auto max-w-[13.5rem] space-y-2">
                  <p className="font-copy text-base font-semibold leading-5 text-[#09131d]">
                    {item.label}
                  </p>
                  <p className="font-copy text-xs leading-[1.35rem] text-[#627283]">
                    {item.supportingText}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${shellClassName} py-12 md:py-16 lg:py-20`}>
          <div className="space-y-8">
            <div className="max-w-[65rem] space-y-3">
              <h2 className="font-display text-[2.3rem] leading-[0.93] tracking-[0.01em] text-[#09131d] sm:text-[3.2rem] lg:text-[4.2rem]">
                {HOME_COPY.servicesIntro.title}
              </h2>
              <p className="max-w-[62rem] font-copy text-base leading-7 text-[#425062] md:text-lg">
                {HOME_COPY.servicesIntro.body}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
              {homeServiceItems.map((item) => (
                <Link
                  className="group relative overflow-hidden bg-[#0d1624]"
                  key={item.href}
                  to={item.href}
                >
                  <img
                    alt={item.imageAlt}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-[28.5rem]"
                    loading="lazy"
                    src={item.imageSrc}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex min-h-[5rem] items-center justify-center bg-[#9ee4d2] px-4 py-4 text-center lg:min-h-[5.4rem]">
                    <div className="font-display text-[1.65rem] leading-none tracking-[0.05em] text-[#09131d] lg:text-[2.2rem]">
                      {item.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b1625] py-12 text-white md:py-16 lg:py-20">
          <div className="absolute inset-0">
            <img
              alt={HOME_COPY.featureBanner.title}
              className="h-full w-full object-cover opacity-35"
              loading="lazy"
              src={HOME_COPY.services.holidayCamps.imageSrc}
            />
          </div>
          <div className="absolute inset-0 bg-[#0b1625]/72" />
          <div className={`relative z-10 ${shellClassName}`}>
            <div className="grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-center">
              <img
                alt={HOME_COPY.additionalNeeds.imageAlt}
                className="mx-auto h-72 w-full max-w-[20rem] object-cover lg:h-[26rem]"
                loading="lazy"
                src={HOME_COPY.additionalNeeds.imageSrc}
              />
              <div className="space-y-5">
                <h2 className="max-w-[46rem] font-display text-[2.2rem] leading-[0.93] tracking-[0.01em] text-white sm:text-[3.2rem] lg:text-[4.05rem]">
                  {HOME_COPY.featureBanner.title}
                </h2>
                <p className="max-w-[41rem] font-copy text-base leading-7 text-white/80 md:text-lg">
                  {HOME_COPY.featureBanner.body}
                </p>
                <div className="flex flex-wrap gap-3">
                  <MarketingButton label={COMMON_COPY.actions.learnMore} to={ROUTES.SERVICES} />
                  <MarketingButton label="Contact us" to={ROUTES.CONTACT} variant="outline-light" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-12 md:py-16 lg:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div className="space-y-5">
              <h2 className="max-w-[32rem] font-display text-[2.2rem] leading-[0.93] tracking-[0.01em] text-[#09131d] sm:text-[3rem] lg:text-[4rem]">
                {HOME_COPY.additionalNeeds.title}
              </h2>
              <img
                alt={HOME_COPY.additionalNeeds.imageAlt}
                className="h-[28rem] w-full object-cover lg:h-[44rem]"
                loading="lazy"
                src={HOME_COPY.additionalNeeds.imageSrc}
              />
            </div>
            <div className="space-y-6">
              <img
                alt={HOME_COPY.supportFamilies.imageAlt}
                className="h-[22rem] w-full object-cover lg:h-[36rem]"
                loading="lazy"
                src={HOME_COPY.supportFamilies.imageSrc}
              />
              <div className="max-w-[36rem] space-y-4">
                <p className="font-copy text-base leading-7 text-[#425062] md:text-lg">
                  {HOME_COPY.additionalNeeds.body}
                </p>
                <MarketingButton label={COMMON_COPY.actions.readMore} to={ROUTES.ABOUT} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-8 md:py-12 lg:py-16`}>
          <div className="grid overflow-hidden bg-[#d8f2ea] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <img
              alt={HOME_COPY.supportFamilies.imageAlt}
              className="h-full min-h-[18rem] w-full object-cover lg:min-h-[32rem]"
              loading="lazy"
              src={HOME_COPY.supportFamilies.imageSrc}
            />
            <div className="space-y-5 px-6 py-6 md:px-8 md:py-8 lg:px-10 lg:py-10">
              <h2 className="font-display text-[2.1rem] leading-[0.93] tracking-[0.01em] text-[#09131d] sm:text-[3rem] lg:text-[4rem]">
                {HOME_COPY.supportFamilies.title}
              </h2>
              <p className="font-copy text-base leading-7 text-[#425062]">
                {HOME_COPY.supportFamilies.body}
              </p>
              <p className="font-copy text-base leading-7 text-[#425062]">
                {HOME_COPY.supportFamilies.bodySecondary}
              </p>
              <p className="font-copy text-sm leading-6 text-[#425062] md:text-base">
                {HOME_COPY.supportFamilies.points.join(' ')}
              </p>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-12 md:py-16`}>
          <div className="space-y-8 text-center">
            <div className="space-y-3">
              <p className="font-copy text-sm uppercase tracking-[0.3em] text-[#627283]">
                {HOME_COPY.partnerLogos.eyebrow}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {schoolPartnerItems.map((item) => (
                <LogoChip key={item} name={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b1625] py-14 text-white md:py-20">
          <div className="absolute inset-0">
            <img
              alt={HOME_COPY.contentColumns.title}
              className="h-full w-full object-cover opacity-30"
              loading="lazy"
              src={HOME_COPY.services.curricular.imageSrc}
            />
          </div>
          <div className="absolute inset-0 bg-[#0b1625]/75" />
          <div className={`relative z-10 ${shellClassName} space-y-10`}>
            <div className="max-w-[58rem] space-y-4">
              <h2 className="font-display text-[2.2rem] leading-[0.93] tracking-[0.01em] text-white sm:text-[3.2rem]">
                {HOME_COPY.contentColumns.title}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {HOME_COPY.contentColumns.items.map((item) => (
                <article
                  className="bg-white p-5 text-[#09131d] lg:p-6"
                  key={item.title}
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-[#d8f2ea] font-display text-2xl text-[#09131d]">
                    +
                  </div>
                  <h3 className="font-display text-[1.4rem] leading-none tracking-[0.02em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-copy text-sm leading-6 text-[#425062]">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shellClassName} overflow-hidden py-12 md:py-16 lg:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
            <div className="space-y-4">
              <h2 className="max-w-[16rem] font-display text-[2.1rem] leading-[0.93] tracking-[0.01em] text-[#09131d] sm:text-[3rem] lg:text-[4rem]">
                {HOME_COPY.testimonials.title}
              </h2>
              <p className="font-copy text-base leading-7 text-[#425062]">
                {HOME_COPY.testimonials.body}
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-start">
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Previous testimonial"
                    className="flex h-11 w-11 items-center justify-center border border-[#09131d]/20 text-[#09131d] transition hover:bg-[#09131d] hover:text-white"
                    onClick={() =>
                      setTestimonialIndex((current) => (current - 1 + totalTestimonials) % totalTestimonials)
                    }
                    type="button"
                  >
                    <span className="font-display text-2xl leading-none">‹</span>
                  </button>
                  <button
                    aria-label="Next testimonial"
                    className="flex h-11 w-11 items-center justify-center border border-[#09131d]/20 text-[#09131d] transition hover:bg-[#09131d] hover:text-white"
                    onClick={() => setTestimonialIndex((current) => (current + 1) % totalTestimonials)}
                    type="button"
                  >
                    <span className="font-display text-2xl leading-none">›</span>
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute -left-4 bottom-0 hidden h-24 w-24 bg-[#d8f2ea] opacity-60 lg:block" />
                <div className="flex snap-x gap-5 overflow-x-auto pb-2 lg:gap-6">
                  {visibleTestimonialItems.map((item, index) => (
                    <div
                      className={[
                        'snap-start',
                        index === 0 ? 'w-[18rem] md:w-[19rem] lg:w-[18.25rem]' : 'w-[18rem] md:w-[19rem] lg:w-[18.25rem]',
                      ].join(' ')}
                      key={`${item.speaker}-${item.role}`}
                    >
                      <QuoteCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {HOME_COPY.testimonials.items.map((item, index) => (
                  <button
                    aria-label={`Show testimonial ${index + 1}`}
                    className={[
                      'h-2 w-2 rounded-full border border-[#09131d] transition',
                      index === testimonialIndex ? 'bg-[#09131d]' : 'bg-transparent',
                    ].join(' ')}
                    key={`${item.speaker}-${item.role}-marker`}
                    onClick={() => setTestimonialIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-12 md:py-16`}>
            <div className="space-y-8 text-center">
            <p className="font-copy text-sm uppercase tracking-[0.3em] text-[#627283]">
              {HOME_COPY.trainingPartners.eyebrow}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {trainingPartnerItems.map((item) => (
                <LogoChip key={item} name={item} />
              ))}
            </div>
          </div>
        </section>

        <MarketingBottomSection
          body={COMMON_COPY.ctaBanner.body}
          id="home-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          title={COMMON_COPY.ctaBanner.title}
        />
      </main>
    </>
  );
};

export default HomePage;

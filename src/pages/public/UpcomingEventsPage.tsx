/**
 * @file UpcomingEventsPage.tsx
 * @description Bespoke public upcoming events page aligned closely to the supplied marketing design.
 * @module src/pages/public/UpcomingEventsPage
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MarketingFooter, MarketingHeader, marketingShellClassName } from '@/components/layout';
import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { ROUTES } from '@/constants';

type TEventTag = 'Camp' | 'Term';

type TEventItem = {
  ageGroup: string;
  classType: string;
  dateLabel: string;
  day: string;
  id: string;
  imageAlt: string;
  imageSrc: string;
  tag: TEventTag;
  timeSlot: string;
  title: string;
  venue: string;
};

type TFilterState = {
  ageGroup: string;
  classType: string;
  day: string;
  timeSlot: string;
  venue: string;
};

const shellClassName = marketingShellClassName;

const heroImageSrc =
  'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?auto=format&fit=crop&w=1800&q=80';

const eventCardImageSrc =
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=80';

const featuredEvents: readonly TEventItem[] = [
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Tue 13th January 2026 - Tue 31st March 2026',
    day: 'Tuesday',
    id: 'featured-madginford',
    imageAlt: 'Children lined up during an indoor football session',
    imageSrc:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80',
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'Madginford primary KS1 football club (Term 4)',
    venue: 'Madginford Primary School',
  },
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Wed 14th January 2026 - Wed 1st April 2026',
    day: 'Wednesday',
    id: 'featured-st-johns',
    imageAlt: 'Children standing at the edge of an indoor football pitch',
    imageSrc:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1400&q=80',
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '5yrs - 11yrs',
    classType: 'Holiday camp',
    dateLabel: 'Mon 6th April 2026 - Fri 10th April 2026',
    day: 'Monday',
    id: 'featured-camp',
    imageAlt: 'Children taking part in a football camp session',
    imageSrc:
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80',
    tag: 'Camp',
    timeSlot: '9:00am - 3:00pm',
    title: 'Easter football camp at Aylesford Community Centre',
    venue: 'Aylesford Community Centre',
  },
] as const;

const eventGridItems: readonly TEventItem[] = [
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Tue 13th January 2026 - Tue 31st March 2026',
    day: 'Tuesday',
    id: 'grid-1',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Wed 14th January 2026 - Wed 1st April 2026',
    day: 'Wednesday',
    id: 'grid-2',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Thu 15th January 2026 - Thu 2nd April 2026',
    day: 'Thursday',
    id: 'grid-3',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '5yrs - 7yrs',
    classType: 'Girls football club',
    dateLabel: 'Tue 13th January 2026 - Tue 31st March 2026',
    day: 'Tuesday',
    id: 'grid-4',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '4:30pm - 5:30pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '7yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Wed 14th January 2026 - Wed 1st April 2026',
    day: 'Wednesday',
    id: 'grid-5',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '4:30pm - 5:30pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '4yrs - 11yrs',
    classType: 'Multi-sports club',
    dateLabel: 'Thu 15th January 2026 - Thu 2nd April 2026',
    day: 'Thursday',
    id: 'grid-6',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '3:30pm - 4:30pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'St Johns Primary School (Sevenoaks)',
  },
  {
    ageGroup: '5yrs - 11yrs',
    classType: 'Holiday camp',
    dateLabel: 'Mon 6th April 2026 - Fri 10th April 2026',
    day: 'Monday',
    id: 'grid-7',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Camp',
    timeSlot: '9:00am - 3:00pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'Aylesford Community Centre',
  },
  {
    ageGroup: '5yrs - 11yrs',
    classType: 'Holiday camp',
    dateLabel: 'Mon 13th April 2026 - Fri 17th April 2026',
    day: 'Monday',
    id: 'grid-8',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Camp',
    timeSlot: '9:00am - 3:00pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'Madginford Primary School',
  },
  {
    ageGroup: '7yrs - 11yrs',
    classType: 'Football club',
    dateLabel: 'Fri 16th January 2026 - Fri 3rd April 2026',
    day: 'Friday',
    id: 'grid-9',
    imageAlt: 'Children celebrating during a football activity',
    imageSrc: eventCardImageSrc,
    tag: 'Term',
    timeSlot: '3:15pm - 4:15pm',
    title: 'St Johns Primary school (sevenoaks) football club T3+4',
    venue: 'Kings Hill Sports Ground',
  },
] as const;

const defaultFilters: TFilterState = {
  ageGroup: '',
  classType: '',
  day: '',
  timeSlot: '',
  venue: '',
};

const getUniqueValues = (items: readonly TEventItem[], key: keyof TEventItem): string[] =>
  Array.from(new Set(items.map((item) => item[key]).filter((value): value is string => typeof value === 'string')));

const matchesFilters = (
  item: TEventItem,
  filters: TFilterState,
): boolean =>
  (!filters.ageGroup || item.ageGroup === filters.ageGroup)
  && (!filters.classType || item.classType === filters.classType)
  && (!filters.day || item.day === filters.day)
  && (!filters.timeSlot || item.timeSlot === filters.timeSlot)
  && (!filters.venue || item.venue === filters.venue);

const EventPageButton = ({
  label,
  to,
}: {
  label: string;
  to: string;
}) => (
  <Link
    className="inline-flex min-h-[54px] min-w-[146px] items-center justify-center rounded-[2px] bg-[#90D4C1] px-[18px] py-[12px] font-display text-[1rem] uppercase leading-none tracking-[0.035em] text-[#030B18] transition hover:bg-[#7fcdb8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#90D4C1] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:text-[25px] lg:leading-[30px]"
    to={to}
  >
    {label}
  </Link>
);

const FeaturedArrowButton = ({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) => (
  <button
    aria-label={direction === 'left' ? 'Previous event' : 'Next event'}
    className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-[rgba(182,182,182,0.2)] bg-white text-[#030B18] shadow-[0px_1px_2px_rgba(0,0,0,0.08)] transition hover:bg-[#f6f9f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-2"
    onClick={onClick}
    type="button"
  >
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d={direction === 'left' ? 'M14.5 6.5L9 12L14.5 17.5' : 'M9.5 6.5L15 12L9.5 17.5'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  </button>
);

const EventSelectField = ({
  label,
  onChange,
  options,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  value: string;
}) => (
  <label className="flex flex-col gap-3">
    <span className="font-copy text-[1rem] leading-6 text-[#121212] lg:text-[20px] lg:leading-[24px]">
      {label}
    </span>
    <div className="relative">
      <select
        className={[
          'h-14 w-full appearance-none rounded-[2px] border border-[#B6B6B6] bg-white px-4 pr-12 font-copy text-base leading-5',
          value ? 'text-[#121212]' : 'text-[#B6B6B6]',
        ].join(' ')}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
        <svg aria-hidden="true" className="h-5 w-5 text-[#929292]" fill="none" viewBox="0 0 24 24">
          <path d="M7 10L12 15L17 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
        </svg>
      </div>
    </div>
  </label>
);

const EventCard = ({
  item,
}: {
  item: TEventItem;
}) => (
  <article className="flex flex-col gap-3 overflow-hidden rounded-[2px] border border-[rgba(182,182,182,0.2)] bg-[#F4FBF9] p-4 lg:w-[432px]">
    <div className="relative h-48 overflow-hidden rounded-[2px] bg-white lg:h-[200px]">
      <img
        alt={item.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[center_32%] lg:left-0 lg:top-[-88px] lg:h-[352px] lg:w-[400px] lg:max-w-none"
        loading="lazy"
        src={item.imageSrc}
      />
    </div>

    <div className="space-y-4">
      <span className="inline-flex items-center justify-center rounded-[2px] bg-[#08193A] px-3 py-1.5 font-copy text-[13px] leading-[15.6px] text-white">
        {item.tag}
      </span>
      <div className="space-y-2">
        <h3 className="font-display text-[1.55rem] leading-[1.2] text-[#121212] lg:text-[25px] lg:leading-[30px]">
          {item.title}
        </h3>
        <p className="font-copy text-base leading-5 text-[#414141]">
          {item.classType} ({item.ageGroup})
        </p>
      </div>
      <div className="space-y-1 font-copy text-[13px] leading-[15.6px] text-[#414141]">
        <p>
          <span className="text-base font-medium leading-5">Date: </span>
          {item.dateLabel}
        </p>
        <p>
          <span className="text-base font-medium leading-5">Timing: </span>
          {item.timeSlot}
        </p>
      </div>
    </div>
  </article>
);

const UpcomingEventsPage = () => {
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [pendingFilters, setPendingFilters] = useState<TFilterState>(defaultFilters);
  const [activeFilters, setActiveFilters] = useState<TFilterState>(defaultFilters);

  useScrollRestoration();

  const activeFeaturedEvent = featuredEvents[activeFeaturedIndex];
  const ageOptions = getUniqueValues(eventGridItems, 'ageGroup');
  const dayOptions = getUniqueValues(eventGridItems, 'day');
  const timeOptions = getUniqueValues(eventGridItems, 'timeSlot');
  const classOptions = getUniqueValues(eventGridItems, 'classType');
  const venueOptions = getUniqueValues(eventGridItems, 'venue');
  const filteredEvents = eventGridItems.filter((item) => matchesFilters(item, activeFilters));

  const handleFeaturedChange = (direction: 'next' | 'previous'): void => {
    setActiveFeaturedIndex((current) => {
      if (direction === 'next') {
        return (current + 1) % featuredEvents.length;
      }

      return (current - 1 + featuredEvents.length) % featuredEvents.length;
    });
  };

  return (
    <>
      <PageSEO description={SEO_META.events.description} title={SEO_META.events.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>

      <main className="bg-white text-[#121212]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#08193A] text-white min-h-[30rem] lg:h-[760px]">
          <img
            alt="Children playing football during an outdoor session"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            src={heroImageSrc}
          />
          <div className="absolute inset-0 bg-[#08193A]/70" />

          <div className={`relative z-10 ${shellClassName}`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />

            <div className="pb-12 pt-10 md:pb-16 md:pt-16 lg:min-h-[431px] lg:pb-[57px] lg:pt-[110px]">
              <div className="flex max-w-[379px] flex-col gap-12 lg:max-w-[860px] lg:gap-[96px]">
                <div className="space-y-2">
                  <h1 className="font-display text-[3rem] leading-[0.9] text-white sm:text-[4.1rem] lg:whitespace-nowrap lg:text-[76px] lg:leading-[91.2px]">
                    Our Upcoming Events
                  </h1>
                  <p className="font-copy text-[0.98rem] leading-6 text-white md:text-[1rem] lg:max-w-[379px] lg:text-[20px] lg:leading-[24px]">
                    Check out our upcoming events for an exciting mix of fun and creativity!
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span
                      className={[
                        'h-1 w-12 rounded-[2px]',
                        index === 0 ? 'bg-white' : 'bg-[#8C8C8C]',
                      ].join(' ')}
                      key={`events-indicator-${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pt-10 md:pt-14 lg:pt-[64px]`}>
          <div className="relative rounded-[2px] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.08)]">
            <div className="grid gap-6 lg:grid-cols-[636px_minmax(0,1fr)] lg:items-center">
              <div className="relative overflow-hidden rounded-[2px] bg-white lg:h-[345px] lg:w-[636px]">
                <img
                  alt={activeFeaturedEvent.imageAlt}
                  className="h-[18rem] w-full object-cover object-[center_42%] sm:h-[21rem] lg:absolute lg:left-0 lg:top-[-88px] lg:h-[497px] lg:w-[636px] lg:max-w-none"
                  loading="lazy"
                  src={activeFeaturedEvent.imageSrc}
                />
              </div>

              <div className="flex flex-col items-start pb-2 lg:pl-0">
                <div className="flex w-full flex-col gap-2 pt-2">
                  <span className="inline-flex items-center justify-center rounded-[100px] bg-[#11393B] px-3 py-1.5 font-copy text-[13px] leading-[15.6px] text-white">
                    {activeFeaturedEvent.tag}
                  </span>

                  <div className="space-y-2">
                    <h2 className="font-display text-[2.35rem] leading-[0.98] text-[#1F1F1F] sm:text-[3rem] lg:max-w-[660px] lg:text-[61px] lg:leading-[73.2px]">
                      {activeFeaturedEvent.title}
                    </h2>
                    <p className="font-copy text-base leading-5 text-[#505050]">
                      {activeFeaturedEvent.classType} ({activeFeaturedEvent.ageGroup})
                    </p>
                  </div>

                  <div className="space-y-1 font-copy text-[13px] leading-[15.6px] text-[#505050]">
                    <p>
                      <span className="text-base font-medium leading-5 text-[#606060]">Date: </span>
                      {activeFeaturedEvent.dateLabel}
                    </p>
                    <p>
                      <span className="text-base font-medium leading-5 text-[#606060]">Timing: </span>
                      {activeFeaturedEvent.timeSlot}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <EventPageButton label="Book now" to={ROUTES.SIGNUP_PARENT} />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between lg:flex">
              <div className="-ml-5">
                <div className="pointer-events-auto">
                  <FeaturedArrowButton direction="left" onClick={() => handleFeaturedChange('previous')} />
                </div>
              </div>
              <div className="-mr-5">
                <div className="pointer-events-auto">
                  <FeaturedArrowButton direction="right" onClick={() => handleFeaturedChange('next')} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2.5 lg:mt-[29px]">
            {featuredEvents.map((item, index) => (
              <button
                aria-label={`Show featured event ${index + 1}`}
                className={[
                  'h-2 w-2 rounded-full border border-[#030B18] transition',
                  activeFeaturedIndex === index ? 'bg-[#030B18]' : 'bg-transparent',
                ].join(' ')}
                key={item.id}
                onClick={() => setActiveFeaturedIndex(index)}
                type="button"
              />
            ))}
          </div>
        </section>

        <section className={`${shellClassName} pt-12 md:pt-16 lg:pt-[93px]`}>
          <div className="h-px w-full bg-[#B6B6B6]" />

          <div className="pt-12 lg:pt-[93px]">
            <div className="flex max-w-[618px] flex-col gap-3">
              <div className="h-1 w-14 bg-[#90D4C1]" />
              <h2 className="font-copy text-[1.45rem] font-medium leading-[30px] text-[#121212] lg:text-[25px]">
                Our upcoming events
              </h2>
            </div>

            <form
              className="mt-12 flex flex-col gap-10 lg:mt-[62px] lg:gap-[40px]"
              onSubmit={(event) => {
                event.preventDefault();
                setActiveFilters(pendingFilters);
              }}
            >
              <div className="grid gap-6 lg:grid-cols-[432px_432px_432px] lg:justify-between">
                <EventSelectField
                  label="For any age"
                  onChange={(value) => setPendingFilters((current) => ({ ...current, ageGroup: value }))}
                  options={ageOptions}
                  placeholder="Select age"
                  value={pendingFilters.ageGroup}
                />
                <EventSelectField
                  label="For any day"
                  onChange={(value) => setPendingFilters((current) => ({ ...current, day: value }))}
                  options={dayOptions}
                  placeholder="Select day"
                  value={pendingFilters.day}
                />
                <EventSelectField
                  label="For any time"
                  onChange={(value) => setPendingFilters((current) => ({ ...current, timeSlot: value }))}
                  options={timeOptions}
                  placeholder="Select time"
                  value={pendingFilters.timeSlot}
                />
              </div>

              <div className="grid gap-6 lg:grid-cols-[660px_660px] lg:items-end lg:justify-between">
                <EventSelectField
                  label="Want any specific class?"
                  onChange={(value) => setPendingFilters((current) => ({ ...current, classType: value }))}
                  options={classOptions}
                  placeholder="Select class"
                  value={pendingFilters.classType}
                />
                <EventSelectField
                  label="Want any specific venue?"
                  onChange={(value) => setPendingFilters((current) => ({ ...current, venue: value }))}
                  options={venueOptions}
                  placeholder="Select venue"
                  value={pendingFilters.venue}
                />
              </div>

              <div>
                <button
                  className="inline-flex min-h-[54px] items-center justify-center rounded-[2px] bg-[#90D4C1] px-[18px] py-[12px] font-display text-[1rem] uppercase leading-none tracking-[0.035em] text-[#030B18] transition hover:bg-[#7fcdb8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#08193A] focus-visible:ring-offset-2 lg:text-[25px] lg:leading-[30px]"
                  type="submit"
                >
                  SHOW RESULTS
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className={`${shellClassName} pb-24 pt-12 md:pt-16 lg:pb-[108px] lg:pt-[142px]`}>
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-[432px_432px_432px] lg:justify-between">
              {filteredEvents.map((item) => (
                <EventCard item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2px] border border-[rgba(182,182,182,0.2)] bg-[#F4FBF9] px-6 py-10 text-center">
              <p className="font-copy text-base leading-6 text-[#414141]">
                No events match the selected filters right now.
              </p>
            </div>
          )}
        </section>

        <MarketingFooter contactHref={ROUTES.CONTACT} />
      </main>
    </>
  );
};

export default UpcomingEventsPage;

/**
 * @file OurServicesPage.tsx
 * @description Bespoke public services overview page aligned closely to the supplied marketing design.
 * @module src/pages/public/OurServicesPage
 */
import { Link } from 'react-router-dom';

import { MarketingHeader, marketingShellClassName } from '@/components/layout';
import { MarketingBottomSection } from '@/components/sections';
import { ROUTES, SERVICE_ROUTE_MAP } from '@/constants';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { useScrollRestoration, useServices } from '@/hooks';
import type { IServiceKey } from '@/services/schemas';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TSupportIconName = (typeof SERVICES_COPY.supportSchoolFamily.cards)[number]['icon'];
type TServiceButtonVariant = 'outline-dark' | 'outline-light' | 'solid';

type TServiceOverviewRow = {
  body: string;
  href: string;
  imageAlt: string;
  imageSrc: string;
  key: IServiceKey;
  reverse: boolean;
  title: string;
};

const shellClassName = marketingShellClassName;

const serviceOrder: readonly {
  href: string;
  key: IServiceKey;
  reverse: boolean;
}[] = [
  { href: SERVICE_ROUTE_MAP.curricular, key: 'curricular', reverse: false },
  { href: SERVICE_ROUTE_MAP.holidayCamps, key: 'holidayCamps', reverse: true },
  { href: SERVICE_ROUTE_MAP.extraCurricular, key: 'extraCurricular', reverse: false },
  { href: SERVICE_ROUTE_MAP.wraparound, key: 'wraparound', reverse: true },
] as const;

const ServicePageButton = ({
  label,
  to,
  variant = 'solid',
}: {
  label: string;
  to: string;
  variant?: TServiceButtonVariant;
}) => (
  <Link
    className={[
      'inline-flex items-center justify-center rounded-[2px] px-[18px] py-[12px] font-display text-[1rem] uppercase leading-none tracking-[0.035em] transition',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2',
      'lg:text-[25px] lg:leading-[30px]',
      variant === 'solid'
        ? 'bg-[#90D4C1] text-[#030B18] hover:bg-[#7fcdb8] focus-visible:ring-offset-[#08193A]'
        : '',
      variant === 'outline-dark'
        ? 'border border-[#08193A] text-[#08193A] hover:bg-[#08193A] hover:text-white focus-visible:ring-offset-white'
        : '',
      variant === 'outline-light'
        ? 'border border-[#E6E8EB] text-[#E6E8EB] hover:bg-white/10 focus-visible:ring-offset-[#030B18]'
        : '',
    ].join(' ')}
    to={to}
  >
    {label}
  </Link>
);

const SupportIcon = ({
  name,
}: {
  name: TSupportIconName;
}) => {
  const baseClassName = 'h-5 w-5 text-[#08193A]';

  switch (name) {
    case 'spark':
      return (
        <svg aria-hidden="true" className={baseClassName} fill="none" viewBox="0 0 24 24">
          <path d="M12 2.75V7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M12 16.5V21.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M2.75 12H7.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M16.5 12H21.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M5.45 5.45L8.8 8.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M15.2 15.2L18.55 18.55" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M15.2 8.8L18.55 5.45" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M5.45 18.55L8.8 15.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <circle cx="12" cy="12" fill="currentColor" r="2.25" />
        </svg>
      );
    case 'shield':
      return (
        <svg aria-hidden="true" className={baseClassName} fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2.75L19 5.5V11.5C19 16.04 15.98 19.93 12 21.25C8.02 19.93 5 16.04 5 11.5V5.5L12 2.75Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path d="M9.5 12.25L11.15 13.9L14.75 10.3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
    case 'arrow':
      return (
        <svg aria-hidden="true" className={baseClassName} fill="none" viewBox="0 0 24 24">
          <path d="M4.5 12H18.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <path d="M13.75 6.75L19 12L13.75 17.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M4.5 7.25V16.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      );
    case 'care':
      return (
        <svg aria-hidden="true" className={baseClassName} fill="none" viewBox="0 0 24 24">
          <path
            d="M12 20.5C12 20.5 4.5 16.1 4.5 9.8C4.5 7.14 6.6 5.25 8.98 5.25C10.4 5.25 11.55 5.95 12 6.95C12.45 5.95 13.6 5.25 15.02 5.25C17.4 5.25 19.5 7.14 19.5 9.8C19.5 16.1 12 20.5 12 20.5Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
  }
};

const ServiceOverviewCard = ({
  item,
}: {
  item: TServiceOverviewRow;
}) => {
  if (item.reverse) {
    return (
      <article className="relative">
        <div className="relative lg:h-[478px]">
          <div className="absolute right-0 top-0 hidden h-[466px] w-[507px] rounded-[2px] bg-[#83C1B0] lg:block" />
          <div className="grid gap-7 lg:absolute lg:left-0 lg:top-[25px] lg:grid-cols-[788px_502px] lg:items-start lg:gap-6">
            <div className="flex h-full flex-col justify-between gap-7 lg:h-[401px]">
              <div className="space-y-4 lg:space-y-[19px]">
                <h3 className="font-copy text-[1.18rem] font-bold leading-8 text-black md:text-[1.35rem] lg:text-[25px] lg:leading-[35px]">
                  {item.title}
                </h3>
                <p className="font-copy text-[0.95rem] leading-6 text-[#414141] md:text-[1rem] md:leading-7 lg:text-[20px] lg:leading-[28px]">
                  {item.body}
                </p>
              </div>
              <div>
                <ServicePageButton label={COMMON_COPY.actions.readMore} to={item.href} variant="outline-dark" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -translate-y-3 translate-x-3 rounded-[2px] bg-[#83C1B0] lg:hidden" />
              <img
                alt={item.imageAlt}
                className="relative h-[18rem] w-full rounded-[2px] object-cover shadow-[0_18px_50px_rgba(3,11,24,0.08)] sm:h-[21rem] lg:h-[453px] lg:w-[502px] lg:shadow-none"
                loading="lazy"
                src={item.imageSrc}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="relative">
      <div className="relative lg:h-[478px]">
        <div className="absolute left-0 top-0 hidden h-[466px] w-[507px] rounded-[2px] bg-[#83C1B0] lg:block" />
        <div className="grid gap-7 lg:absolute lg:left-[30px] lg:top-[25px] lg:grid-cols-[502px_788px] lg:items-start lg:gap-6">
          <div className="relative">
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-[2px] bg-[#83C1B0] lg:hidden" />
            <img
              alt={item.imageAlt}
              className="relative h-[18rem] w-full rounded-[2px] object-cover shadow-[0_18px_50px_rgba(3,11,24,0.08)] sm:h-[21rem] lg:h-[453px] lg:w-[502px] lg:shadow-none"
              loading="lazy"
              src={item.imageSrc}
            />
          </div>

          <div className="flex h-full flex-col justify-between gap-7 lg:h-[401px]">
            <div className="space-y-4 lg:space-y-[19px]">
              <h3 className="font-copy text-[1.18rem] font-bold leading-8 text-black md:text-[1.35rem] lg:text-[25px] lg:leading-[35px]">
                {item.title}
              </h3>
              <p className="font-copy text-[0.95rem] leading-6 text-[#414141] md:text-[1rem] md:leading-7 lg:text-[20px] lg:leading-[28px]">
                {item.body}
              </p>
            </div>
            <div>
              <ServicePageButton label={COMMON_COPY.actions.readMore} to={item.href} variant="outline-dark" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const OurServicesPage = () => {
  const servicesQuery = useServices();

  useScrollRestoration();

  const liveServiceMap = new Map(servicesQuery.data.map((service) => [service.key, service]));

  const serviceRows: TServiceOverviewRow[] = serviceOrder.map((item) => {
    const fallbackItem = SERVICES_COPY.overviewPage.featureCards[item.key];
    const liveItem = liveServiceMap.get(item.key);

    return {
      body: fallbackItem.body,
      href: item.href,
      imageAlt: liveItem?.imageAlt ?? fallbackItem.imageAlt,
      imageSrc: liveItem?.imageSrc ?? fallbackItem.imageSrc,
      key: item.key,
      reverse: item.reverse,
      title: fallbackItem.title,
    };
  });

  return (
    <>
      <PageSEO description={SEO_META.services.description} title={SEO_META.services.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>

      <main className="bg-white text-[#09131d]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#08193A] text-white">
          <img
            alt={SERVICES_COPY.overviewPage.heroImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            src={SERVICES_COPY.overviewPage.heroImage}
          />
          <div className="absolute inset-0 bg-[#08193A]/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08193A]/55 via-[#08193A]/30 to-[#08193A]/45" />

          <div className={`relative z-10 min-h-[30rem] ${shellClassName} lg:h-[760px]`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />

            <div className="pb-12 pt-12 md:pb-16 md:pt-20 lg:min-h-[567px] lg:pb-[96px] lg:pt-[244px]">
              <div className="flex max-w-[23.7rem] flex-col gap-10 lg:gap-[96px]">
                <div className="space-y-2">
                  <h1 className="font-display text-[3rem] leading-[0.88] text-white sm:text-[4.4rem] lg:text-[76px] lg:leading-[91.2px]">
                    Our Services
                  </h1>
                  <p className="font-copy text-[0.95rem] leading-6 text-white sm:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                    {SERVICES_COPY.overviewPage.heroDescription}
                  </p>
                </div>

                <div className="flex items-center gap-4 lg:gap-6">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span
                      className={[
                        'h-1 w-12 rounded-[2px]',
                        index === 0 ? 'bg-white' : 'bg-[#8C8C8C]',
                      ].join(' ')}
                      key={`services-indicator-${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pt-10 md:pt-12 lg:pt-[64px]`}>
          <div className="relative overflow-hidden rounded-[2px] bg-[#0b1320]">
            <img
              alt={SERVICES_COPY.videoSection.imageAlt}
              className="h-[18rem] w-full object-cover sm:h-[24rem] lg:h-[586px]"
              loading="lazy"
              src={SERVICES_COPY.videoSection.imageSrc}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="flex h-[74px] w-[74px] items-center justify-center rounded-full border-[3px] border-white bg-white/12 backdrop-blur-[1px] lg:h-[95px] lg:w-[95px]"
              >
                <div className="ml-1 h-0 w-0 border-y-[12px] border-y-transparent border-l-[18px] border-l-white lg:border-y-[15px] lg:border-l-[22px]" />
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-16 md:py-20 lg:pb-[112px] lg:pt-[96px]`}>
          <div className="grid gap-8 lg:grid-cols-[671px_666px] lg:items-start lg:gap-[18px]">
            <h2 className="font-display text-[2.3rem] leading-[0.95] text-[#121212] sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
              {SERVICES_COPY.overviewPage.introTitle}
            </h2>
            <div className="space-y-6">
              {SERVICES_COPY.overviewPage.introParagraphs.map((paragraph) => (
                <p className="font-copy text-[0.95rem] leading-7 text-[#414141] md:text-[1rem] lg:text-[20px] lg:leading-[28px]" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shellClassName} pb-16 lg:pb-[118px]`}>
          <div className="space-y-10 lg:space-y-[96px]">
            <h2 className="font-display text-[2.2rem] leading-[0.92] text-black sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
              What we currently provide
            </h2>

            <div className="space-y-16 lg:space-y-[96px]">
              {serviceRows.map((item) => (
                <ServiceOverviewCard item={item} key={item.key} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#90D4C1]/80 py-12 lg:min-h-[894px] lg:py-[64px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(8,25,58,0.18),transparent_42%)]" />

          <div className={`${shellClassName} relative z-10`}>
            <div className="overflow-hidden rounded-[8px] bg-white shadow-[0_16px_48px_rgba(3,11,24,0.08)] lg:h-[513px]">
              <div className="grid gap-0 lg:grid-cols-[774px_1fr]">
                <div className="relative">
                  <img
                    alt={SERVICES_COPY.supportSchoolFamily.imageAlt}
                    className="h-[18rem] w-full object-cover lg:-mt-[5px] lg:h-[518px] lg:w-[774px] lg:rounded-bl-[2px] lg:rounded-tl-[2px]"
                    loading="lazy"
                    src={SERVICES_COPY.supportSchoolFamily.imageSrc}
                  />
                </div>

                <div className="space-y-6 px-6 py-6 sm:px-8 sm:py-8 lg:px-0 lg:pb-0 lg:pl-[72px] lg:pr-[24px] lg:pt-[24px]">
                  <h2 className="max-w-[504px] font-display text-[2.3rem] leading-[0.95] text-[#08193A] sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
                    {SERVICES_COPY.supportSchoolFamily.title}
                  </h2>
                  <div className="max-w-[523px] space-y-4">
                    <p className="font-copy text-[0.95rem] leading-6 text-[#08193A] md:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                      {SERVICES_COPY.supportSchoolFamily.body}
                    </p>
                    {SERVICES_COPY.supportSchoolFamily.points.map((point) => (
                      <p className="font-copy text-[0.95rem] leading-6 text-[#08193A] md:text-[1rem] lg:text-[20px] lg:leading-[24px]" key={point}>
                        {point}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:mt-[24px] lg:grid-cols-[repeat(4,318px)] lg:gap-[24px]">
              {SERVICES_COPY.supportSchoolFamily.cards.map((card) => (
                <article className="rounded-[4px] bg-white p-4 shadow-[0_8px_24px_rgba(3,11,24,0.05)] lg:h-[229px]" key={card.title}>
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#08193A]">
                      <SupportIcon name={card.icon} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-copy text-base font-medium leading-5 text-[#08193A]">
                        {card.title}
                      </h3>
                      <p className="font-copy text-[13px] leading-[18.2px] text-[#08193A]">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-16 md:py-20 lg:pb-[152px] lg:pt-[196px]`}>
          <div className="grid gap-8 lg:grid-cols-[649px_671px] lg:gap-[24px]">
            <div className="flex flex-col gap-6">
              <h2 className="max-w-[528px] font-display text-[2.3rem] leading-[0.95] text-[#121212] sm:text-[3rem] lg:text-[61px] lg:leading-[73.2px]">
                {SERVICES_COPY.additionalNeeds.title}
              </h2>
              <img
                alt={SERVICES_COPY.additionalNeeds.imageAlt}
                className="h-[21rem] w-full object-cover sm:h-[30rem] lg:h-[718px]"
                loading="lazy"
                src={SERVICES_COPY.additionalNeeds.imageSrc}
              />
            </div>

            <div className="flex flex-col gap-6 lg:pt-[139px]">
              <img
                alt={SERVICES_COPY.additionalNeeds.secondaryImageAlt}
                className="h-[19rem] w-full object-cover sm:h-[24rem] lg:h-[640px]"
                loading="lazy"
                src={SERVICES_COPY.additionalNeeds.secondaryImageSrc}
              />

              <div className="max-w-[594px] space-y-8 lg:space-y-[43px]">
                <p className="font-copy text-[0.95rem] leading-6 text-[#5A5C57] md:text-[1rem] lg:text-[20px] lg:leading-[24px]">
                  {SERVICES_COPY.additionalNeeds.excerpt}
                </p>
                <ServicePageButton label={COMMON_COPY.actions.learnMore} to={SERVICE_ROUTE_MAP.wraparound} />
              </div>
            </div>
          </div>
        </section>

        <MarketingBottomSection
          body={COMMON_COPY.ctaBanner.body}
          id="services-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          primaryActionTo={ROUTES.ABOUT}
          title={COMMON_COPY.ctaBanner.title}
        />
      </main>
    </>
  );
};

export default OurServicesPage;

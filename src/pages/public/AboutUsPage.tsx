/**
 * @file AboutUsPage.tsx
 * @description Custom public about page aligned to the supplied marketing design.
 * @module src/pages/public/AboutUsPage
 */
import { MarketingButton, MarketingHeader, marketingShellClassName } from '@/components/layout';
import { ROUTES, SERVICE_ROUTE_MAP } from '@/constants';
import { ABOUT_COPY, COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { MarketingBottomSection } from '@/components/sections';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

type TAboutFeatureItem = (typeof ABOUT_COPY.provideItems)[number];
type TTeamMember = (typeof ABOUT_COPY.teamMembers)[number];

const shellClassName = marketingShellClassName;

const serviceHrefMap = {
  curricular: SERVICE_ROUTE_MAP.curricular,
  holidayCamps: SERVICE_ROUTE_MAP.holidayCamps,
  league: ROUTES.LEAGUE,
  development: ROUTES.SERVICES,
} as const;

const AboutFeatureRow = ({
  item,
  reverse = false,
}: {
  item: TAboutFeatureItem;
  reverse?: boolean;
}) => (
  <article className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
    <div className={reverse ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}>
      <div className="space-y-4 lg:max-w-[41rem]">
        <h3 className="font-copy text-[1.2rem] font-bold leading-8 text-[#09131d] md:text-[1.42rem]">
          {item.title}
        </h3>
        <p className="max-w-[40rem] font-copy text-[0.98rem] leading-7 text-[#425062] md:text-[1.02rem]">
          {item.body}
        </p>
        <MarketingButton
          label={COMMON_COPY.actions.readMore}
          to={serviceHrefMap[item.id]}
          variant="outline-dark"
        />
      </div>
    </div>
    <div className={reverse ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}>
      <div className="relative mx-auto h-[17rem] w-full max-w-[34rem] md:h-[22rem] lg:h-[28rem]">
        <div
          className={[
            'absolute inset-y-0 w-[32%] bg-[#9ee4d2]',
            reverse ? 'right-0' : 'left-0',
          ].join(' ')}
        />
        <img
          alt={item.imageAlt}
          className={[
            'absolute inset-y-5 h-[calc(100%-2.5rem)] w-[86%] object-cover shadow-[0_18px_50px_rgba(3,11,24,0.12)]',
            reverse ? 'left-0' : 'right-0',
          ].join(' ')}
          loading="lazy"
          src={item.imageSrc}
        />
      </div>
    </div>
  </article>
);

const TeamCard = ({
  member,
}: {
  member: TTeamMember;
}) => {
  const bio = 'bio' in member ? member.bio : undefined;

  return (
    <article className="relative min-h-[19rem] overflow-hidden bg-[#0b1625] lg:min-h-[25.5rem]">
      <img
        alt={member.imageAlt}
        className={bio ? 'h-full w-full object-cover opacity-30' : 'h-full w-full object-cover'}
        loading="lazy"
        src={member.imageSrc}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09131d] via-[#09131d]/50 to-transparent" />
      {bio ? (
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-white lg:p-6">
          <div className="max-w-[15rem] pt-2">
            <p className="font-copy text-[0.82rem] leading-5 text-white/85 lg:text-[0.9rem] lg:leading-6">{bio}</p>
          </div>
          <div>
            <p className="font-copy text-xl font-medium leading-6">{member.name}</p>
          </div>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-copy text-xl font-medium leading-6 text-white">{member.name}</p>
        </div>
      )}
    </article>
  );
};

const AboutUsPage = () => {
  useScrollRestoration();

  return (
    <>
      <PageSEO description={SEO_META.about.description} title={SEO_META.about.title} />
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[2px] focus:bg-[#9ee4d2] focus:px-4 focus:py-2 focus:font-copy focus:font-medium focus:text-[#09131d]"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>
      <main className="bg-white text-[#09131d]" id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-[#09131d] text-white">
          <img
            alt={ABOUT_COPY.heroTitle}
            className="absolute inset-0 h-full w-full object-cover"
            height={1200}
            src={ABOUT_COPY.heroImage}
            width={1600}
          />
          <div className="absolute inset-0 bg-[#09131d]/72" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09131d]/95 via-[#09131d]/68 to-[#09131d]/35" />
          <div className={`relative z-10 min-h-[30rem] ${shellClassName} lg:h-[760px]`}>
            <MarketingHeader contactHref={ROUTES.CONTACT} />
            <div className="grid gap-12 pb-14 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[23rem_minmax(0,1fr)] lg:items-end lg:pb-16 lg:pt-28">
              <div className="max-w-[24rem] space-y-8 lg:space-y-24">
                <div className="space-y-2">
                  <h1 className="font-display text-[3rem] leading-[0.86] tracking-[0.012em] text-white sm:text-[4.2rem] lg:text-[5.85rem]">
                    {ABOUT_COPY.heroTitle}
                  </h1>
                  <p className="max-w-[20rem] font-copy text-[0.98rem] leading-7 text-white/80 md:text-[1.02rem]">
                    {ABOUT_COPY.heroDescription}
                  </p>
                </div>
                <div className="flex gap-4">
                  {Array.from({ length: 4 }, (_, index) => (
                    <span
                      className={[
                        'h-1 w-12 rounded-full',
                        index === 0 ? 'bg-white' : 'bg-white/35',
                      ].join(' ')}
                      key={`hero-indicator-${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-14 md:py-16 lg:py-20`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-10">
            <img
              alt={ABOUT_COPY.founderStoryTitle}
              className="h-[22rem] w-full object-cover md:h-[28rem] lg:h-[39rem]"
              loading="lazy"
              src={ABOUT_COPY.founderImage}
            />
            <div className="space-y-7 lg:pb-2">
              <div className="space-y-4">
                <h2 className="max-w-[40rem] font-display text-[2.15rem] leading-[0.92] tracking-[0.008em] text-[#09131d] sm:text-[2.95rem] lg:text-[3.95rem]">
                  {ABOUT_COPY.founderStoryTitle}
                </h2>
                <p className="max-w-[37rem] font-copy text-[0.98rem] leading-7 text-[#425062] md:text-[1.02rem]">
                  {ABOUT_COPY.founderStoryBody}
                </p>
              </div>
              <MarketingButton label={COMMON_COPY.actions.bookNow} to={ROUTES.SIGNUP} />
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-10 md:py-12 lg:py-16`}>
          <div className="h-2 w-full bg-[#9ee4d2]" />
          <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
            <h2 className="max-w-[32rem] font-display text-[2.2rem] leading-[0.92] tracking-[0.008em] text-[#09131d] sm:text-[3rem] lg:text-[3.9rem]">
              {ABOUT_COPY.missionTitle}
            </h2>
            <p className="max-w-[41rem] font-copy text-[0.98rem] leading-7 text-[#425062] md:text-[1.02rem]">
              {ABOUT_COPY.missionBody}
            </p>
          </div>
          <img
            alt={ABOUT_COPY.missionImageAlt}
            className="h-[18rem] w-full object-cover md:h-[26rem] lg:h-[43rem]"
            loading="lazy"
            src={ABOUT_COPY.missionImage}
          />
        </section>

        <section className={`${shellClassName} py-14 md:py-16 lg:py-20`}>
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="font-display text-[2.2rem] leading-[0.92] tracking-[0.008em] text-[#09131d] sm:text-[3rem] lg:text-[3.9rem]">
                {ABOUT_COPY.visionTitle}
              </h2>
              <p className="font-copy text-[0.98rem] font-medium leading-7 text-[#425062] md:text-[1.02rem]">
                {ABOUT_COPY.visionBody}
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {ABOUT_COPY.visionItems.map((item) => (
                <article
                  className="relative flex min-h-[15rem] items-center justify-center overflow-hidden rounded-[100px] px-8 py-10 text-center lg:min-h-[17rem]"
                  key={item.title}
                >
                  <img
                    alt={item.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    src={item.imageSrc}
                  />
                  <div className="absolute inset-0 bg-[#09131d]/72" />
                  <div className="relative max-w-[11rem] font-copy text-[1rem] font-medium leading-7 text-white lg:text-[1.06rem]">
                    {item.title}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-14 md:py-16 lg:py-20`}>
          <div className="space-y-10 lg:space-y-14">
            <h2 className="font-display text-[2.2rem] leading-[0.92] tracking-[0.008em] text-[#09131d] sm:text-[3rem] lg:text-[3.9rem]">
              {ABOUT_COPY.provideTitle}
            </h2>
            <div className="space-y-16 md:space-y-20 lg:space-y-24">
              {ABOUT_COPY.provideItems.map((item, index) => (
                <AboutFeatureRow
                  item={item}
                  key={item.id}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={`${shellClassName} py-14 md:py-16 lg:py-20`}>
          <div className="space-y-10">
            <div className="max-w-[78rem] space-y-3">
              <h2 className="font-display text-[2.2rem] leading-[0.92] tracking-[0.008em] text-[#09131d] sm:text-[3rem] lg:text-[3.9rem]">
                {ABOUT_COPY.teamTitle}
              </h2>
              <p className="max-w-[72rem] font-copy text-[0.98rem] leading-7 text-[#425062] md:text-[1.02rem]">
                {ABOUT_COPY.teamBody}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {ABOUT_COPY.teamMembers.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        <MarketingBottomSection
          body={ABOUT_COPY.ctaBody}
          id="about-cta"
          imageAlt="Child holding a football"
          imageSrc="/assets/policy-cta-boy.png"
          title={COMMON_COPY.ctaBanner.title}
        />
      </main>
    </>
  );
};

export default AboutUsPage;

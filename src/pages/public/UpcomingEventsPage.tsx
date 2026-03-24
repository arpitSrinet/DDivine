/**
 * @file UpcomingEventsPage.tsx
 * @description Public upcoming events page composed from static content for Phase 5.
 * @module src/pages/public/UpcomingEventsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { CTABanner, FeatureGridSection, PageHero } from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const UpcomingEventsPage = () => (
  <>
    <PageSEO description={SEO_META.events.description} title={SEO_META.events.title} />
    <Navbar />
    <PageWrapper>
      <div className="space-y-8 md:space-y-10">
        <PageHero
          backgroundImageSrc={COMMON_COPY.eventsPage.imageSrc}
          breadcrumbs={[{ label: COMMON_COPY.eventsPage.title }]}
          description={COMMON_COPY.eventsPage.description}
          imageAlt={COMMON_COPY.eventsPage.imageAlt}
          title={COMMON_COPY.eventsPage.title}
        />
        <SectionWrapper background="white">
          <FeatureGridSection items={COMMON_COPY.eventsPage.items} title={COMMON_COPY.eventsPage.title} />
        </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp }}
          secondaryCta={{ href: ROUTES.SERVICES, label: COMMON_COPY.actions.learnMore, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
      </div>
    </PageWrapper>
    <Footer />
  </>
);

export default UpcomingEventsPage;

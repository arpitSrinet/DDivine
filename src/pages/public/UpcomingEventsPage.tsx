/**
 * @file UpcomingEventsPage.tsx
 * @description Phase 4 stub for the public upcoming events route.
 * @module src/pages/public/UpcomingEventsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const UpcomingEventsPage = () => (
  <>
    <PageSEO description={SEO_META.events.description} title={SEO_META.events.title} />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {COMMON_COPY.navigation.events}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default UpcomingEventsPage;

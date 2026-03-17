/**
 * @file SchoolFootballLeaguePage.tsx
 * @description Phase 4 stub for the public school football league route.
 * @module src/pages/public/SchoolFootballLeaguePage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY, LEAGUE_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const SchoolFootballLeaguePage = () => (
  <>
    <PageSEO description={SEO_META.league.description} title={SEO_META.league.title} />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {LEAGUE_COPY.pageTitle}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default SchoolFootballLeaguePage;

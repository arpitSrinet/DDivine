/**
 * @file FreeActivitiesPage.tsx
 * @description Phase 4 stub for the free activities route.
 * @module src/pages/public/knowledge/FreeActivitiesPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const FreeActivitiesPage = () => (
  <>
    <PageSEO
      description={SEO_META.freeActivities.description}
      title={SEO_META.freeActivities.title}
    />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {KNOWLEDGE_COPY.freeActivitiesTitle}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default FreeActivitiesPage;

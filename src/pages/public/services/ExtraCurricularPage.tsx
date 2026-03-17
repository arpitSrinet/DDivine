/**
 * @file ExtraCurricularPage.tsx
 * @description Phase 4 stub for the extra curricular activities service route.
 * @module src/pages/public/services/ExtraCurricularPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const ExtraCurricularPage = () => (
  <>
    <PageSEO
      description={SEO_META.extraCurricular.description}
      title={SEO_META.extraCurricular.title}
    />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {SERVICES_COPY.pages.extraCurricular}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default ExtraCurricularPage;

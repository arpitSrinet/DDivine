/**
 * @file WraparoundChildcarePage.tsx
 * @description Phase 4 stub for the wraparound childcare service route.
 * @module src/pages/public/services/WraparoundChildcarePage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const WraparoundChildcarePage = () => (
  <>
    <PageSEO
      description={SEO_META.wraparound.description}
      title={SEO_META.wraparound.title}
    />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {SERVICES_COPY.pages.wraparound}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default WraparoundChildcarePage;

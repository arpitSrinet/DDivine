/**
 * @file HomePage.tsx
 * @description Phase 4 stub for the public home page route.
 * @module src/pages/public/HomePage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const HomePage = () => (
  <>
    <PageSEO description={SEO_META.home.description} title={SEO_META.home.title} />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {SEO_META.home.title}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default HomePage;

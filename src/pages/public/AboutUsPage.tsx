/**
 * @file AboutUsPage.tsx
 * @description Phase 4 stub for the public about page route.
 * @module src/pages/public/AboutUsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { ABOUT_COPY, COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const AboutUsPage = () => (
  <>
    <PageSEO description={SEO_META.about.description} title={SEO_META.about.title} />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {ABOUT_COPY.heroTitle}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default AboutUsPage;

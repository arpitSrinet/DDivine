/**
 * @file FAQsPage.tsx
 * @description Phase 4 stub for the FAQs route.
 * @module src/pages/public/knowledge/FAQsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const FAQsPage = () => (
  <>
    <PageSEO description={SEO_META.faqs.description} title={SEO_META.faqs.title} />
    <Navbar />
    <PageWrapper>
      <SectionWrapper background="white">
        <h1 className="font-heading text-5xl uppercase tracking-wide text-primary">
          {KNOWLEDGE_COPY.faqsTitle}
        </h1>
        <p className="mt-4 max-w-3xl font-body text-base text-muted">
          {COMMON_COPY.layout.stubDescriptions.public}
        </p>
      </SectionWrapper>
    </PageWrapper>
    <Footer />
  </>
);

export default FAQsPage;

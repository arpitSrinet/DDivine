/**
 * @file FAQsPage.tsx
 * @description Static FAQs page for Phase 5.
 * @module src/pages/public/knowledge/FAQsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { CTABanner, FAQSection, FAQSectionEmpty, FAQSectionSkeleton, PageHero } from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useFaqSections } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const FAQsPage = () => {
  const faqSectionsQuery = useFaqSections();

  return (
    <>
      <PageSEO description={SEO_META.faqs.description} title={SEO_META.faqs.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={KNOWLEDGE_COPY.hubImage}
            breadcrumbs={[
              { href: ROUTES.KNOWLEDGE_HUB, label: KNOWLEDGE_COPY.hubTitle },
              { label: KNOWLEDGE_COPY.faqsTitle },
            ]}
            description={KNOWLEDGE_COPY.faqsIntro}
            imageAlt={KNOWLEDGE_COPY.faqsTitle}
            title={KNOWLEDGE_COPY.faqsTitle}
          />
          <SectionWrapper background="white">
            <SectionErrorBoundary>
              {faqSectionsQuery.isLoading ? (
                <FAQSectionSkeleton />
              ) : faqSectionsQuery.isError ? (
                <ErrorFallback level="section" onRetry={() => void faqSectionsQuery.refetch()} />
              ) : faqSectionsQuery.data.length === 0 ? (
                <FAQSectionEmpty body={COMMON_COPY.emptyStates.faqs.body} title={COMMON_COPY.emptyStates.faqs.title} />
              ) : (
                <FAQSection groups={faqSectionsQuery.data} title={KNOWLEDGE_COPY.faqsTitle} />
              )}
            </SectionErrorBoundary>
          </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.LOGIN, label: COMMON_COPY.actions.logIn }}
          secondaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default FAQsPage;

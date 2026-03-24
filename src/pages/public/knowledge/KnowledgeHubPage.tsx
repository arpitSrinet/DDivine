/**
 * @file KnowledgeHubPage.tsx
 * @description Static knowledge hub landing page for Phase 5.
 * @module src/pages/public/knowledge/KnowledgeHubPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  PageHero,
  PhotoStrip,
  ServicesGrid,
  ServicesGridEmpty,
  ServicesGridSkeleton,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useKnowledgeHubSummary } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const KnowledgeHubPage = () => {
  const knowledgeSummaryQuery = useKnowledgeHubSummary();
  const { caseStudiesCount, faqCount, freeActivitiesCount } = knowledgeSummaryQuery.data;
  const knowledgeItems = [
    {
      ...KNOWLEDGE_COPY.hubCards[0],
      body: `${caseStudiesCount} ${KNOWLEDGE_COPY.hubCardCounts.caseStudies}`,
      href: ROUTES.KNOWLEDGE_CASE_STUDIES,
    },
    {
      ...KNOWLEDGE_COPY.hubCards[1],
      body: `${freeActivitiesCount} ${KNOWLEDGE_COPY.hubCardCounts.freeActivities}`,
      href: ROUTES.KNOWLEDGE_FREE,
    },
    {
      ...KNOWLEDGE_COPY.hubCards[2],
      body: `${faqCount} ${KNOWLEDGE_COPY.hubCardCounts.faqs}`,
      href: ROUTES.KNOWLEDGE_FAQS,
    },
  ];

  return (
    <>
      <PageSEO description={SEO_META.knowledgeHub.description} title={SEO_META.knowledgeHub.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={KNOWLEDGE_COPY.hubImage}
            breadcrumbs={[{ label: KNOWLEDGE_COPY.hubTitle }]}
            description={KNOWLEDGE_COPY.hubDescription}
            imageAlt={KNOWLEDGE_COPY.hubTitle}
            title={KNOWLEDGE_COPY.hubTitle}
          />
          <SectionWrapper background="white">
            <SectionErrorBoundary>
              {knowledgeSummaryQuery.isLoading ? (
                <ServicesGridSkeleton />
              ) : knowledgeSummaryQuery.isError ? (
                <ErrorFallback level="section" onRetry={() => void knowledgeSummaryQuery.refetch()} />
              ) : caseStudiesCount === 0 && freeActivitiesCount === 0 && faqCount === 0 ? (
                <ServicesGridEmpty
                  body={COMMON_COPY.emptyStates.caseStudies.body}
                  title={COMMON_COPY.emptyStates.caseStudies.title}
                />
              ) : (
                <ServicesGrid items={knowledgeItems} title={KNOWLEDGE_COPY.hubTitle} />
              )}
            </SectionErrorBoundary>
          </SectionWrapper>
        <SectionWrapper background="surface">
          <PhotoStrip images={KNOWLEDGE_COPY.galleryImages} title={KNOWLEDGE_COPY.galleryTitle} />
        </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.SERVICES, label: COMMON_COPY.actions.learnMore }}
          secondaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default KnowledgeHubPage;

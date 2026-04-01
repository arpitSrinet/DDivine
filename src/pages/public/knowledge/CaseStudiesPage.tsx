/**
 * @file CaseStudiesPage.tsx
 * @description Case studies page with Phase 6 loading, empty, and error states.
 * @module src/pages/public/knowledge/CaseStudiesPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  FeatureGridSection,
  FeatureGridSectionEmpty,
  FeatureGridSectionSkeleton,
  PageHero,
  PhotoStrip,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useCaseStudies } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const CaseStudiesPage = () => {
  const caseStudiesQuery = useCaseStudies();

  return (
    <>
      <PageSEO description={SEO_META.caseStudies.description} title={SEO_META.caseStudies.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={KNOWLEDGE_COPY.hubImage}
            breadcrumbs={[
              { href: ROUTES.KNOWLEDGE_HUB, label: KNOWLEDGE_COPY.hubTitle },
              { label: KNOWLEDGE_COPY.caseStudiesTitle },
            ]}
            description={KNOWLEDGE_COPY.caseStudiesIntro}
            imageAlt={KNOWLEDGE_COPY.caseStudiesTitle}
            title={KNOWLEDGE_COPY.caseStudiesTitle}
          />
          <SectionWrapper background="white">
            <SectionErrorBoundary>
              {caseStudiesQuery.isLoading ? (
                <FeatureGridSectionSkeleton />
              ) : caseStudiesQuery.isError ? (
                <ErrorFallback level="section" onRetry={() => void caseStudiesQuery.refetch()} />
              ) : caseStudiesQuery.data.length === 0 ? (
                <FeatureGridSectionEmpty
                  body={COMMON_COPY.emptyStates.caseStudies.body}
                  title={COMMON_COPY.emptyStates.caseStudies.title}
                />
              ) : (
                <FeatureGridSection items={caseStudiesQuery.data} title={KNOWLEDGE_COPY.caseStudiesTitle} />
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
          primaryCta={{ href: ROUTES.KNOWLEDGE_HUB, label: COMMON_COPY.actions.learnMore }}
          secondaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default CaseStudiesPage;

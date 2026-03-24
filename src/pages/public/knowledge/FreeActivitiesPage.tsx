/**
 * @file FreeActivitiesPage.tsx
 * @description Static free activities page for Phase 5.
 * @module src/pages/public/knowledge/FreeActivitiesPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  DownloadListSection,
  DownloadListSectionEmpty,
  DownloadListSectionSkeleton,
  PageHero,
  PhotoStrip,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, KNOWLEDGE_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useFreeActivities } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const FreeActivitiesPage = () => {
  const freeActivitiesQuery = useFreeActivities();

  return (
    <>
      <PageSEO description={SEO_META.freeActivities.description} title={SEO_META.freeActivities.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={KNOWLEDGE_COPY.hubImage}
            breadcrumbs={[
              { href: ROUTES.KNOWLEDGE_HUB, label: KNOWLEDGE_COPY.hubTitle },
              { label: KNOWLEDGE_COPY.freeActivitiesTitle },
            ]}
            description={KNOWLEDGE_COPY.freeActivitiesIntro}
            imageAlt={KNOWLEDGE_COPY.freeActivitiesTitle}
            title={KNOWLEDGE_COPY.freeActivitiesTitle}
          />
          <SectionWrapper background="white">
            <SectionErrorBoundary>
              {freeActivitiesQuery.isLoading ? (
                <DownloadListSectionSkeleton />
              ) : freeActivitiesQuery.isError ? (
                <ErrorFallback level="section" onRetry={() => void freeActivitiesQuery.refetch()} />
              ) : freeActivitiesQuery.data.length === 0 ? (
                <DownloadListSectionEmpty
                  body={COMMON_COPY.emptyStates.freeActivities.body}
                  title={COMMON_COPY.emptyStates.freeActivities.title}
                />
              ) : (
                <DownloadListSection groups={freeActivitiesQuery.data} title={KNOWLEDGE_COPY.freeActivitiesTitle} />
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

export default FreeActivitiesPage;

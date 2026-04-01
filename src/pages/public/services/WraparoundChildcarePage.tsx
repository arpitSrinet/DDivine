/**
 * @file WraparoundChildcarePage.tsx
 * @description Wraparound childcare page with live service detail data and Phase 6 runtime states.
 * @module src/pages/public/services/WraparoundChildcarePage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  FeatureGridSection,
  PartnerLogos,
  PhotoStrip,
  ServiceDetailHero,
  ServiceDetailHeroEmpty,
  ServiceDetailHeroSkeleton,
  TestimonialsCarousel,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useServiceDetail } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const WraparoundChildcarePage = () => {
  const serviceDetailQuery = useServiceDetail('wraparound');

  return (
    <>
      <PageSEO description={SEO_META.wraparound.description} title={SEO_META.wraparound.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <SectionErrorBoundary>
            {serviceDetailQuery.isLoading ? (
              <ServiceDetailHeroSkeleton />
            ) : serviceDetailQuery.isError ? (
              <ErrorFallback level="section" onRetry={() => void serviceDetailQuery.refetch()} />
            ) : !serviceDetailQuery.data ? (
              <ServiceDetailHeroEmpty
                body={COMMON_COPY.emptyStates.serviceDetail.body}
                title={COMMON_COPY.emptyStates.serviceDetail.title}
              />
            ) : (
              <ServiceDetailHero
                backgroundImageSrc={serviceDetailQuery.data.imageSrc}
                body={serviceDetailQuery.data.summary}
                breadcrumbs={[
                  { href: ROUTES.SERVICES, label: SERVICES_COPY.overviewTitle },
                  { label: serviceDetailQuery.data.title },
                ]}
                imageAlt={serviceDetailQuery.data.imageAlt}
                primaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.bookNow }}
                title={serviceDetailQuery.data.title}
              />
            )}
          </SectionErrorBoundary>
        <SectionWrapper background="white">
          <PhotoStrip images={SERVICES_COPY.galleryImages} title={SERVICES_COPY.galleryTitle} />
        </SectionWrapper>
        <SectionWrapper background="surface">
          <FeatureGridSection
            items={SERVICES_COPY.pages.wraparound.activities}
            title={SERVICES_COPY.pages.wraparound.activitiesTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="white">
          <FeatureGridSection
            items={SERVICES_COPY.pages.wraparound.includedItems}
            title={SERVICES_COPY.pages.wraparound.includedTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="surface-alt">
          <PartnerLogos items={SERVICES_COPY.pages.wraparound.partnerSchools} title="Partner schools" />
        </SectionWrapper>
        <SectionWrapper background="white">
          <FeatureGridSection
            items={SERVICES_COPY.pages.wraparound.whyChooseItems}
            title={SERVICES_COPY.pages.wraparound.whyChooseTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="surface">
          <TestimonialsCarousel items={SERVICES_COPY.testimonials} title={SERVICES_COPY.testimonialsTitle} />
        </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp }}
          secondaryCta={{ href: ROUTES.SERVICES, label: COMMON_COPY.actions.learnMore, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default WraparoundChildcarePage;

/**
 * @file ExtraCurricularPage.tsx
 * @description Extra curricular activities page with live service detail data and Phase 6 runtime states.
 * @module src/pages/public/services/ExtraCurricularPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  FeatureGridSection,
  PhotoStrip,
  ServiceDetailHero,
  ServiceDetailHeroEmpty,
  ServiceDetailHeroSkeleton,
  SplitContentSection,
  TestimonialsCarousel,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useServiceDetail } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const ExtraCurricularPage = () => {
  const serviceDetailQuery = useServiceDetail('extraCurricular');

  return (
    <>
      <PageSEO description={SEO_META.extraCurricular.description} title={SEO_META.extraCurricular.title} />
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
                primaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp }}
                title={serviceDetailQuery.data.title}
              />
            )}
          </SectionErrorBoundary>
        <SectionWrapper background="white">
          <FeatureGridSection
            items={SERVICES_COPY.pages.extraCurricular.clubItems}
            title={SERVICES_COPY.pages.extraCurricular.clubTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="surface">
          <SplitContentSection
            body={SERVICES_COPY.pages.extraCurricular.capacityBody}
            imageAlt={SERVICES_COPY.pages.extraCurricular.imageAlt}
            imageSrc="https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80"
            points={SERVICES_COPY.pages.extraCurricular.capacityPoints}
            title={SERVICES_COPY.pages.extraCurricular.capacityTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="white">
          <PhotoStrip images={SERVICES_COPY.galleryImages} title={SERVICES_COPY.galleryTitle} />
        </SectionWrapper>
        <SectionWrapper background="surface-alt">
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

export default ExtraCurricularPage;

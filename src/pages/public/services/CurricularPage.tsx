/**
 * @file CurricularPage.tsx
 * @description Static curricular activities service page for Phase 5.
 * @module src/pages/public/services/CurricularPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
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

const CurricularPage = () => {
  const serviceDetailQuery = useServiceDetail('curricular');

  return (
    <>
      <PageSEO description={SEO_META.curricular.description} title={SEO_META.curricular.title} />
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
          <SplitContentSection
            body={SERVICES_COPY.pages.curricular.featureBody}
            imageAlt={SERVICES_COPY.pages.curricular.imageAlt}
            imagePosition="left"
            imageSrc="https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1200&q=80"
            title={SERVICES_COPY.pages.curricular.featureTitle}
          />
        </SectionWrapper>
        <SectionWrapper background="surface">
          <PhotoStrip images={SERVICES_COPY.galleryImages} title={SERVICES_COPY.galleryTitle} />
        </SectionWrapper>
        <SectionWrapper background="white">
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

export default CurricularPage;

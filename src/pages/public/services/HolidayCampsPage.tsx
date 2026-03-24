/**
 * @file HolidayCampsPage.tsx
 * @description Static holiday football camps service page for Phase 5.
 * @module src/pages/public/services/HolidayCampsPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  FeatureGridSection,
  PhotoStrip,
  ServiceDetailHero,
  ServiceDetailHeroEmpty,
  ServiceDetailHeroSkeleton,
  SupportSection,
  TestimonialsCarousel,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useServiceDetail } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const HolidayCampsPage = () => {
  const serviceDetailQuery = useServiceDetail('holidayCamps');

  return (
    <>
      <PageSEO description={SEO_META.holidayCamps.description} title={SEO_META.holidayCamps.title} />
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
          <FeatureGridSection
            items={SERVICES_COPY.pages.holidayCamps.benefits}
            title={SERVICES_COPY.pages.holidayCamps.title}
          />
        </SectionWrapper>
        <SectionWrapper background="dark">
          <div className="space-y-5">
            <h2 className="font-heading text-3xl uppercase tracking-wide md:text-4xl">
              {SERVICES_COPY.pages.holidayCamps.includedTitle}
            </h2>
            <ul className="space-y-3">
              {SERVICES_COPY.pages.holidayCamps.includedItems.map((item) => (
                <li className="flex gap-3 font-body text-sm text-surface" key={item}>
                  <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>
        <SupportSection
          body={SERVICES_COPY.pages.holidayCamps.sendBody}
          imageAlt={SERVICES_COPY.pages.holidayCamps.imageAlt}
          imageSrc="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80"
          points={SERVICES_COPY.pages.holidayCamps.sendPoints}
          title={SERVICES_COPY.pages.holidayCamps.sendTitle}
        />
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

export default HolidayCampsPage;

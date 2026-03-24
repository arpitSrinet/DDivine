/**
 * @file OurServicesPage.tsx
 * @description Public services overview page composed from static marketing sections for Phase 5.
 * @module src/pages/public/OurServicesPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  PageHero,
  ServicesGrid,
  ServicesGridEmpty,
  ServicesGridSkeleton,
  SplitContentSection,
  SupportSection,
} from '@/components/sections';
import { ROUTES, SERVICE_ROUTE_MAP } from '@/constants';
import { COMMON_COPY, SERVICES_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useServices } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const OurServicesPage = () => {
  const servicesQuery = useServices();
  const serviceItems = servicesQuery.data.map((item) => ({
    body: item.summary,
    href: SERVICE_ROUTE_MAP[item.key],
    imageAlt: item.imageAlt,
    imageSrc: item.imageSrc,
    title: item.title,
  }));

  return (
    <>
      <PageSEO description={SEO_META.services.description} title={SEO_META.services.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={SERVICES_COPY.heroImage}
            breadcrumbs={[{ label: SERVICES_COPY.overviewTitle }]}
            description={SERVICES_COPY.heroDescription}
            imageAlt={SERVICES_COPY.overviewTitle}
            title={SERVICES_COPY.overviewTitle}
          />
          <SectionWrapper background="white">
            <SplitContentSection
              body={SERVICES_COPY.videoSection.body}
              imageAlt={SERVICES_COPY.videoSection.imageAlt}
              imageSrc={SERVICES_COPY.videoSection.imageSrc}
              title={SERVICES_COPY.videoSection.title}
            />
          </SectionWrapper>
          <SectionWrapper background="surface">
            <SectionErrorBoundary>
              {servicesQuery.isLoading ? (
                <ServicesGridSkeleton />
              ) : servicesQuery.isError ? (
                <ErrorFallback level="section" onRetry={() => void servicesQuery.refetch()} />
              ) : serviceItems.length === 0 ? (
                <ServicesGridEmpty
                  body={COMMON_COPY.emptyStates.services.body}
                  title={COMMON_COPY.emptyStates.services.title}
                />
              ) : (
                <ServicesGrid body={SERVICES_COPY.overviewBody} items={serviceItems} title={SERVICES_COPY.overviewTitle} />
              )}
            </SectionErrorBoundary>
          </SectionWrapper>
        <SupportSection
          background="dark"
          body={SERVICES_COPY.supportSchoolFamily.body}
          imageAlt={SERVICES_COPY.supportSchoolFamily.imageAlt}
          imageSrc={SERVICES_COPY.supportSchoolFamily.imageSrc}
          points={SERVICES_COPY.supportSchoolFamily.points}
          title={SERVICES_COPY.supportSchoolFamily.title}
        />
        <SupportSection
          body={SERVICES_COPY.additionalNeeds.body}
          imageAlt={SERVICES_COPY.additionalNeeds.imageAlt}
          imageSrc={SERVICES_COPY.additionalNeeds.imageSrc}
          points={SERVICES_COPY.additionalNeeds.points}
          title={SERVICES_COPY.additionalNeeds.title}
        />
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.SIGNUP, label: COMMON_COPY.actions.signUp }}
          secondaryCta={{ href: ROUTES.ABOUT, label: COMMON_COPY.actions.learnMore, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default OurServicesPage;

/**
 * @file PoliciesPage.tsx
 * @description Public policies overview page composed from static content for Phase 5.
 * @module src/pages/public/PoliciesPage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import { CTABanner, FeatureGridSection, PageHero } from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const PoliciesPage = () => (
  <>
    <PageSEO description={SEO_META.policies.description} title={SEO_META.policies.title} />
    <Navbar />
    <PageWrapper>
      <div className="space-y-8 md:space-y-10">
        <PageHero
          backgroundImageSrc={COMMON_COPY.policiesPage.imageSrc}
          breadcrumbs={[{ label: COMMON_COPY.policiesPage.title }]}
          description={COMMON_COPY.policiesPage.description}
          imageAlt={COMMON_COPY.policiesPage.imageAlt}
          title={COMMON_COPY.policiesPage.title}
        />
        <SectionWrapper background="white">
          <FeatureGridSection items={COMMON_COPY.policiesPage.highlights} title={COMMON_COPY.policiesPage.title} />
        </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.LOGIN, label: COMMON_COPY.actions.logIn }}
          secondaryCta={{ href: ROUTES.SERVICES, label: COMMON_COPY.actions.learnMore, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
      </div>
    </PageWrapper>
    <Footer />
  </>
);

export default PoliciesPage;

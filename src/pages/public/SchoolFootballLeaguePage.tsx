/**
 * @file SchoolFootballLeaguePage.tsx
 * @description Static school football league marketing page for Phase 5.
 * @module src/pages/public/SchoolFootballLeaguePage
 */
import { Footer, Navbar, PageWrapper, SectionWrapper } from '@/components/layout';
import {
  CTABanner,
  FeatureGridSection,
  LeagueTablePreviewEmpty,
  LeagueTablePreviewSkeleton,
  LeagueTablePreview,
  PageHero,
  PhotoStrip,
  SupportSection,
  TestimonialsCarousel,
} from '@/components/sections';
import { ROUTES } from '@/constants';
import { COMMON_COPY, LEAGUE_COPY } from '@/copy';
import { ErrorFallback, SectionErrorBoundary } from '@/errors';
import { useLeagueTable } from '@/hooks';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const SchoolFootballLeaguePage = () => {
  const leagueTableQuery = useLeagueTable();

  return (
    <>
      <PageSEO description={SEO_META.league.description} title={SEO_META.league.title} />
      <Navbar />
      <PageWrapper>
        <div className="space-y-8 md:space-y-10">
          <PageHero
            backgroundImageSrc={LEAGUE_COPY.heroImage}
            breadcrumbs={[{ label: LEAGUE_COPY.pageTitle }]}
            description={LEAGUE_COPY.pageDescription}
            imageAlt={LEAGUE_COPY.pageTitle}
            title={LEAGUE_COPY.pageTitle}
          />
          <SectionErrorBoundary>
            {leagueTableQuery.isLoading ? (
              <LeagueTablePreviewSkeleton />
            ) : leagueTableQuery.isError ? (
              <ErrorFallback level="section" onRetry={() => void leagueTableQuery.refetch()} />
            ) : leagueTableQuery.data.length === 0 ? (
              <LeagueTablePreviewEmpty
                body={COMMON_COPY.emptyStates.league.body}
                title={COMMON_COPY.emptyStates.league.title}
              />
            ) : (
              <LeagueTablePreview
                badgeLabel={COMMON_COPY.status.liveData}
                ctas={[
                  { href: ROUTES.SIGNUP_SCHOOL, label: LEAGUE_COPY.registerCta },
                  { href: ROUTES.SERVICES, label: LEAGUE_COPY.learnMoreCta, variant: 'outline' },
                ]}
                rows={leagueTableQuery.data}
                sidebarBody={LEAGUE_COPY.readyToCompeteBody}
                sidebarTitle={LEAGUE_COPY.readyToCompeteHeading}
                title={LEAGUE_COPY.pageTitle}
              />
            )}
          </SectionErrorBoundary>
        <SectionWrapper background="surface">
          <PhotoStrip images={LEAGUE_COPY.galleryImages} title={LEAGUE_COPY.galleryTitle} />
        </SectionWrapper>
        <SectionWrapper background="white">
          <FeatureGridSection items={LEAGUE_COPY.whyJoinItems} title={LEAGUE_COPY.whyJoinTitle} />
        </SectionWrapper>
        <SupportSection
          background="dark"
          body={LEAGUE_COPY.includedBody}
          imageAlt={LEAGUE_COPY.includedTitle}
          imageSrc={LEAGUE_COPY.includedImage}
          points={LEAGUE_COPY.includedItems}
          title={LEAGUE_COPY.includedTitle}
        />
        <SectionWrapper background="surface-alt">
          <TestimonialsCarousel items={LEAGUE_COPY.testimonials} title="Positive feedback we have received" />
        </SectionWrapper>
        <CTABanner
          body={COMMON_COPY.ctaBanner.body}
          imageAlt={COMMON_COPY.ctaBanner.imageAlt}
          imageSrc={COMMON_COPY.ctaBanner.imageSrc}
          primaryCta={{ href: ROUTES.SIGNUP_SCHOOL, label: LEAGUE_COPY.registerCta }}
          secondaryCta={{ href: ROUTES.SERVICES, label: COMMON_COPY.actions.learnMore, variant: 'outline' }}
          title={COMMON_COPY.ctaBanner.title}
        />
        </div>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default SchoolFootballLeaguePage;

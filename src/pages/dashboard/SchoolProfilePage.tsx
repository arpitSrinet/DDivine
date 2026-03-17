/**
 * @file SchoolProfilePage.tsx
 * @description Phase 4 stub for the school profile dashboard route.
 * @module src/pages/dashboard/SchoolProfilePage
 */
import { DashboardLayout } from '@/components/layout';
import { COMMON_COPY, DASHBOARD_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const SchoolProfilePage = () => (
  <>
    <PageSEO
      description={SEO_META.dashboard.description}
      noIndex={SEO_META.dashboard.noIndex}
      title={DASHBOARD_COPY.school.pageTitle}
    />
    <DashboardLayout
      description={COMMON_COPY.layout.stubDescriptions.dashboard}
      title={DASHBOARD_COPY.school.pageTitle}
    >
      <p className="font-body text-base text-muted">
        {COMMON_COPY.layout.stubDescriptions.dashboard}
      </p>
    </DashboardLayout>
  </>
);

export default SchoolProfilePage;

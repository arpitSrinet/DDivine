/**
 * @file ChildrenPage.tsx
 * @description Phase 4 stub for the children dashboard route.
 * @module src/pages/dashboard/ChildrenPage
 */
import { DashboardLayout } from '@/components/layout';
import { COMMON_COPY, DASHBOARD_COPY } from '@/copy';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';

const ChildrenPage = () => (
  <>
    <PageSEO
      description={SEO_META.dashboard.description}
      noIndex={SEO_META.dashboard.noIndex}
      title={DASHBOARD_COPY.children.pageTitle}
    />
    <DashboardLayout
      description={COMMON_COPY.layout.stubDescriptions.dashboard}
      title={DASHBOARD_COPY.children.pageTitle}
    >
      <p className="font-body text-base text-muted">
        {COMMON_COPY.layout.stubDescriptions.dashboard}
      </p>
    </DashboardLayout>
  </>
);

export default ChildrenPage;

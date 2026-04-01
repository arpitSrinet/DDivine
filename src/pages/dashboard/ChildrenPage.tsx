/**
 * @file ChildrenPage.tsx
 * @description Add/Edit child profiles for the parent dashboard.
 * @module src/pages/dashboard/ChildrenPage
 */
import { useState } from 'react';

import { ParentDashboardLayout } from '@/components/layout';
import { AddChildCard, AddChildModal, ChildCard } from '@/components/features/dashboard';
import { DASHBOARD_COPY } from '@/copy';
import { useChildren } from '@/hooks/useChildren';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { useAuthStore } from '@/store';

const ChildrenPage = () => {
  const authUser = useAuthStore((s) => s.user);
  const userName = authUser ? `${authUser.firstName} ${authUser.lastName}` : '—';
  const { data: children, isLoading, isError } = useChildren();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <>
      <PageSEO description={SEO_META.dashboard.description} noIndex={SEO_META.dashboard.noIndex} title={DASHBOARD_COPY.children.pageTitle} />
      <ParentDashboardLayout activeTab="children" userName={userName}>
        {isLoading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3].map((i) => (
              <div className="h-[160px] animate-pulse rounded-sm bg-gray-100" key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="font-body text-sm text-red-600" role="alert">
            Failed to load child profiles. Please refresh.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {children?.map((child) => (
              <ChildCard child={child} key={child.id} />
            ))}
            <AddChildCard onClick={() => setShowAdd(true)} />
          </div>
        )}

        <AddChildModal isOpen={showAdd} onClose={() => setShowAdd(false)} />
      </ParentDashboardLayout>
    </>
  );
};

export default ChildrenPage;

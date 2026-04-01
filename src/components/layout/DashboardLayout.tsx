/**
 * @file DashboardLayout.tsx
 * @description Dashboard shell with sidebar navigation and top summary area for protected route stubs.
 * @module src/components/layout/DashboardLayout
 */
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { logger } from '@/monitoring';
import { authService } from '@/services';
import { useAuthStore } from '@/store';

import { OfflineBanner } from './OfflineBanner';

export interface IDashboardLayoutProps {
  children: ReactNode;
  description: string;
  title: string;
}

const dashboardLinks = [
  { href: ROUTES.DASHBOARD_PROFILE, label: COMMON_COPY.layout.dashboardNavigation.profile },
  { href: ROUTES.DASHBOARD_BOOKINGS, label: COMMON_COPY.layout.dashboardNavigation.bookings },
  { href: ROUTES.DASHBOARD_CHILDREN, label: COMMON_COPY.layout.dashboardNavigation.children },
  { href: ROUTES.DASHBOARD_SCHOOL, label: COMMON_COPY.layout.dashboardNavigation.school },
] as const;

export const DashboardLayout = ({
  children,
  description,
  title,
}: IDashboardLayoutProps) => {
  useScrollRestoration();
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      logger.warn('Logout request failed; clearing session locally', { error });
    } finally {
      clearAuth();
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto w-full max-w-content px-4 pt-4 md:px-8">
        <OfflineBanner />
      </div>
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-4 px-4 md:px-8">
          <div>
            <p className="font-heading text-2xl uppercase tracking-wide text-primary">
              {COMMON_COPY.brandName}
            </p>
            <p className="font-body text-sm text-muted">
              {COMMON_COPY.layout.dashboardPanelBody}
            </p>
          </div>
          <button
            className="rounded-lg border border-border px-4 py-2 font-body text-sm font-semibold text-dark transition-colors duration-200 hover:bg-danger hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            onClick={() => { void handleLogout(); }}
            type="button"
          >
            {COMMON_COPY.actions.logout}
          </button>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-content gap-6 px-4 py-8 md:px-8 lg:grid-cols-[16rem_1fr]">
        <aside className="rounded-3xl border border-border bg-white p-6 shadow-md">
          <h2 className="font-heading text-2xl uppercase tracking-wide text-primary">
            {COMMON_COPY.layout.dashboardPanelTitle}
          </h2>
          <nav aria-label="Dashboard" className="mt-6 flex flex-col gap-2">
            {dashboardLinks.map((link) => (
              <Link
                className="rounded-lg px-3 py-2 font-body text-sm font-medium text-dark transition-colors duration-200 hover:bg-surface-alt hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                key={link.href}
                to={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="rounded-3xl border border-border bg-white p-8 shadow-md">
          <h1 className="font-heading text-4xl uppercase tracking-wide text-primary">
            {title}
          </h1>
          <p className="mt-4 font-body text-base text-muted">{description}</p>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

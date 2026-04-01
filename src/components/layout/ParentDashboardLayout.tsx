/**
 * @file ParentDashboardLayout.tsx
 * @description Dark-nav tab-based layout for the parent dashboard.
 *   Renders the site navbar, profile header, tab navigation, and page content.
 * @module src/components/layout/ParentDashboardLayout
 */
import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { MAIN_NAV_ITEMS, ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { getNavigationLabel } from '@/components/layout/navigation.utils';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';
import { logger } from '@/monitoring';
import { authService } from '@/services';
import { useAuthStore } from '@/store';

import { MarketingFooter } from './marketing';
import { OfflineBanner } from './OfflineBanner';

export type TDashboardTab = 'profile' | 'bookings' | 'children';

const TAB_ROUTES: Record<TDashboardTab, string> = {
  profile: ROUTES.DASHBOARD_PROFILE,
  bookings: ROUTES.DASHBOARD_BOOKINGS,
  children: ROUTES.DASHBOARD_CHILDREN,
};

const TAB_LABELS: Record<TDashboardTab, string> = {
  profile: 'Profile',
  bookings: 'My bookings',
  children: 'Add/Edit child info',
};

export interface IParentDashboardLayoutProps {
  activeTab: TDashboardTab;
  avatarSrc?: string;
  children: ReactNode;
  memberSince?: string;
  userName: string;
}

export const ParentDashboardLayout = ({
  activeTab,
  avatarSrc,
  children,
  memberSince,
  userName,
}: IParentDashboardLayoutProps) => {
  useScrollRestoration();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      logger.warn('Logout failed; clearing session locally', { error });
    } finally {
      clearAuth();
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <OfflineBanner />

      {/* ── Top navbar ─────────────────────────────────── */}
      <header className="bg-[#08193A] text-white">
        <div className="mx-auto flex h-[76px] w-full max-w-[90rem] items-center justify-between px-12">
          <Link aria-label={COMMON_COPY.brandName} className="shrink-0" to={ROUTES.HOME}>
            <span className="font-display text-[1.8rem] uppercase tracking-[0.14em] text-white">
              {COMMON_COPY.brandName}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 xl:flex">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                className="px-2 py-6 font-display text-[1.42rem] uppercase tracking-[0.035em] text-white/85 transition hover:text-white"
                key={item.id}
                to={item.href}
              >
                {getNavigationLabel(item.id)}
              </Link>
            ))}
          </nav>

          <div className="relative flex items-center gap-3">
            <button
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label="Open account menu"
              className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#90D4C1]"
              onClick={() => setMenuOpen((o) => !o)}
              type="button"
            >
              <img
                alt={userName}
                className="h-12 w-12 rounded-full border border-white/20 object-cover"
                src={avatarSrc ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=90D4C1&color=08193A`}
              />
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 8">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            </button>

            {menuOpen && (
              <>
                <button
                  aria-label="Close menu"
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                  type="button"
                />
                <div className="absolute right-0 top-14 z-20 w-52 rounded-lg bg-white py-1 shadow-xl">
                  <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
                    <img
                      alt={userName}
                      className="h-8 w-8 rounded-full object-cover"
                      src={avatarSrc ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=90D4C1&color=08193A`}
                    />
                    <span className="font-body text-sm font-semibold text-[#121212]">{userName}</span>
                  </div>
                  {(Object.entries(TAB_ROUTES) as [TDashboardTab, string][]).map(([tab, href]) => (
                    <Link
                      className="block px-4 py-2 font-body text-sm text-[#414141] hover:bg-gray-50"
                      key={tab}
                      onClick={() => setMenuOpen(false)}
                      to={href}
                    >
                      {TAB_LABELS[tab]}
                    </Link>
                  ))}
                  <button
                    className="w-full px-4 py-2 text-left font-body text-sm text-[#DC2626] hover:bg-gray-50"
                    onClick={() => { void handleLogout(); }}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            <button
              aria-expanded={mobileNavOpen}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              className="ml-2 xl:hidden"
              onClick={() => setMobileNavOpen((o) => !o)}
              type="button"
            >
              <span className="font-display text-2xl leading-none">{mobileNavOpen ? '×' : '≡'}</span>
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="border-t border-white/10 bg-[#08193A] px-12 pb-4">
            <nav className="flex flex-col gap-3 pt-3">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  className="font-copy text-base text-white/90 transition hover:text-white"
                  key={item.id}
                  onClick={() => setMobileNavOpen(false)}
                  to={item.href}
                >
                  {getNavigationLabel(item.id)}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* ── Profile header ─────────────────────────────── */}
      <div className="mx-auto w-full max-w-[90rem] px-12 pt-10 pb-0">
        <div className="flex items-center gap-3">
          <img
            alt={userName}
            className="h-32 w-32 rounded-full border border-black/10 object-cover shadow-sm"
            src={avatarSrc ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=90D4C1&color=08193A&size=128`}
          />
          <div className="flex flex-col gap-1">
            <p className="font-display text-[3.8rem] leading-none text-[#121212]">{userName}</p>
            {memberSince && (
              <p className="font-body text-base text-[#64748B]">Member since {memberSince}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab navigation ─────────────────────────────── */}
      <div className="mx-auto w-full max-w-[90rem] px-12">
        <nav aria-label="Dashboard sections" className="mt-6 flex items-end gap-8 border-b border-[#B6B6B6]">
          {(Object.entries(TAB_ROUTES) as [TDashboardTab, string][]).map(([tab, href]) => {
            const isActive = location.pathname === href || activeTab === tab;
            return (
              <Link
                className={[
                  'pb-2 font-body text-base transition',
                  isActive
                    ? 'border-b-2 border-[#08193A] font-medium text-[#08193A]'
                    : 'text-[#B6B6B6] hover:text-[#414141]',
                ].join(' ')}
                key={tab}
                to={href}
              >
                {TAB_LABELS[tab]}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ── Page content ───────────────────────────────── */}
      <main className="mx-auto w-full max-w-[90rem] px-12 py-8" id="main-content" tabIndex={-1}>
        {children}
      </main>

      <MarketingFooter contactHref={ROUTES.CONTACT} />
    </div>
  );
};

/**
 * @file MarketingHeader.tsx
 * @description Shared dark marketing header used by bespoke public landing pages.
 * @module src/components/layout/marketing/MarketingHeader
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { MAIN_NAV_ITEMS, ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';

import { getNavigationLabel } from '../navigation.utils';
import { OfflineBanner } from '../OfflineBanner';
import { MarketingButton } from './MarketingButton';

export const marketingShellClassName = 'mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-12';

export interface IMarketingHeaderProps {
  avatarAlt?: string;
  avatarSrc?: string;
  compact?: boolean;
  contactHref: string;
  variant?: 'default' | 'logged-in';
}

export const MarketingHeader = ({
  avatarAlt = 'Signed-in account avatar',
  avatarSrc,
  compact = false,
  contactHref,
  variant = 'default',
}: IMarketingHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedInVariant = variant === 'logged-in';

  return (
    <>
      <header className={compact ? 'flex h-14 items-center justify-between gap-6' : 'flex h-16 items-center justify-between gap-6 md:h-20'}>
        <Link
          className="shrink-0 font-display text-[1.6rem] uppercase tracking-[0.14em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09131d] sm:text-[1.8rem]"
          to={ROUTES.HOME}
        >
          {COMMON_COPY.brandName}
        </Link>
        <nav className="hidden items-center gap-6 xl:flex">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              className="font-display text-[1.42rem] uppercase tracking-[0.035em] text-white/85 transition hover:text-white"
              key={item.href}
              to={item.href}
            >
              {getNavigationLabel(item.id)}
            </Link>
          ))}
        </nav>
        {isLoggedInVariant ? (
          <button
            aria-label="Open profile menu"
            className="hidden items-center gap-2 md:flex"
            type="button"
          >
            <img
              alt={avatarAlt}
              className="h-12 w-12 rounded-full border border-black/10 object-cover"
              src={avatarSrc ?? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'}
            />
            <span className="flex h-5 w-5 items-center justify-center text-white" aria-hidden="true">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            </span>
          </button>
        ) : (
          <div className="hidden items-center gap-3 md:flex">
            <MarketingButton label={COMMON_COPY.actions.signUp} to={ROUTES.SIGNUP} variant="outline-light" />
            <MarketingButton label={COMMON_COPY.actions.enquire} to={ROUTES.SERVICES} />
          </div>
        )}
        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? COMMON_COPY.layout.menuClose : COMMON_COPY.layout.menuOpen}
          className="inline-flex h-11 w-11 items-center justify-center border border-white/30 text-white md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          type="button"
        >
          <span className="font-display text-2xl leading-none">
            {isMobileMenuOpen ? '×' : '≡'}
          </span>
        </button>
      </header>
      {isMobileMenuOpen ? (
        <div className="mb-6 border border-white/15 bg-[#09131d]/95 p-5 shadow-[0_20px_40px_rgba(3,11,24,0.35)] md:hidden">
          <nav className="flex flex-col gap-4">
            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                className="font-copy text-base text-white/90 transition hover:text-white"
                key={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                to={item.href}
              >
                {getNavigationLabel(item.id)}
              </Link>
            ))}
            <Link
              className="font-copy text-base text-white/90 transition hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
              to={contactHref}
            >
              Contact us
            </Link>
          </nav>
          {!isLoggedInVariant ? (
            <div className="mt-5 flex flex-wrap gap-3">
              <MarketingButton label={COMMON_COPY.actions.signUp} to={ROUTES.SIGNUP} variant="outline-light" />
              <MarketingButton label={COMMON_COPY.actions.enquire} to={ROUTES.SERVICES} />
            </div>
          ) : null}
        </div>
      ) : null}
      <OfflineBanner />
    </>
  );
};

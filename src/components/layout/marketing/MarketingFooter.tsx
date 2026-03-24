/**
 * @file MarketingFooter.tsx
 * @description Shared dark footer used by bespoke marketing pages.
 * @module src/components/layout/marketing/MarketingFooter
 */
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';

import { MarketingSocialIcon } from './MarketingSocialIcon';
import { marketingShellClassName } from './MarketingHeader';

const socialItems = [
  { label: 'IG', href: ROUTES.HOME },
  { label: 'FB', href: ROUTES.HOME },
  { label: 'X', href: ROUTES.HOME },
] as const;

export interface IMarketingFooterProps {
  contactHref: string;
}

export const MarketingFooter = ({
  contactHref,
}: IMarketingFooterProps) => (
  <footer className="bg-[#09131d] text-white">
    <div className={`${marketingShellClassName} py-10 md:py-12`}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <Link className="font-display text-2xl uppercase tracking-[0.12em] text-white" to={ROUTES.HOME}>
            {COMMON_COPY.brandName}
          </Link>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-center">
            <Link className="font-copy text-base text-white/80 transition hover:text-white" to={ROUTES.ABOUT}>
              About us
            </Link>
            <Link className="font-copy text-base text-white/80 transition hover:text-white" to={ROUTES.SERVICES}>
              Our Services
            </Link>
            <a className="font-copy text-base text-white/80 transition hover:text-white" href={contactHref}>
              Contact us
            </a>
            <Link className="font-copy text-base text-white/80 transition hover:text-white" to={ROUTES.KNOWLEDGE_FAQS}>
              FAQs
            </Link>
            <Link className="font-copy text-base text-white/80 transition hover:text-white" to={ROUTES.POLICIES}>
              Complaints Procedure
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            {socialItems.map((item) => (
              <Link
                aria-label={item.label}
                className="flex h-5 w-5 items-center justify-center text-white/80 transition hover:text-white"
                key={item.label}
                to={item.href}
              >
                <MarketingSocialIcon label={item.label} />
              </Link>
            ))}
          </div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-3 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p className="font-copy">© Copyright 2026, All Rights Reserved</p>
          <div className="flex flex-wrap gap-4">
            <Link className="font-copy transition hover:text-white" to={ROUTES.POLICIES}>
              Privacy Policy
            </Link>
            <Link className="font-copy transition hover:text-white" to={ROUTES.POLICIES}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

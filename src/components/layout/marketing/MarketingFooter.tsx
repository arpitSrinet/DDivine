/**
 * @file MarketingFooter.tsx
 * @description Shared dark footer used by bespoke marketing pages.
 * @module src/components/layout/marketing/MarketingFooter
 */
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { MarketingSocialIcon } from './MarketingSocialIcon';
import { MarketingBrandLockup } from './MarketingBrandLockup';
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
  <footer className="bg-[#030B18] text-white">
    <div className={`${marketingShellClassName} py-10 md:py-12 lg:py-[50px]`}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <MarketingBrandLockup />
          <nav className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-center lg:gap-x-[66px]">
            <Link className="font-copy text-base leading-[19.2px] text-white transition hover:text-white/80" to={ROUTES.ABOUT}>
              About us
            </Link>
            <Link className="font-copy text-base leading-[19.2px] text-white transition hover:text-white/80" to={ROUTES.SERVICES}>
              Our Services
            </Link>
            <Link className="font-copy text-base leading-[19.2px] text-white transition hover:text-white/80" to={contactHref}>
              Contact us
            </Link>
            <Link className="font-copy text-base leading-[19.2px] text-white transition hover:text-white/80" to={ROUTES.KNOWLEDGE_FAQS}>
              FAQs
            </Link>
            <Link className="font-copy text-base leading-[19.2px] text-white transition hover:text-white/80" to={ROUTES.POLICIES}>
              Complaints Procedure
            </Link>
          </nav>
          <div className="flex items-center gap-6 lg:gap-[34px]">
            {socialItems.map((item) => (
              <Link
                aria-label={item.label}
                className="flex h-5 w-5 items-center justify-center text-white transition hover:text-white/80"
                key={item.label}
                to={item.href}
              >
                <MarketingSocialIcon label={item.label} />
              </Link>
            ))}
          </div>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="font-copy text-sm leading-[26px] text-white">© Copyright 2026, All Rights Reserved</p>
          <div className="flex flex-wrap gap-4 md:gap-8">
            <Link className="font-copy text-sm leading-[26px] text-white transition hover:text-white/80" to={ROUTES.POLICIES}>
              Privacy Policy
            </Link>
            <Link className="font-copy text-sm leading-[26px] text-white transition hover:text-white/80" to={ROUTES.POLICIES}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

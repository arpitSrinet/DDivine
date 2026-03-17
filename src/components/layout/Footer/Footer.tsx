/**
 * @file Footer.tsx
 * @description Public site footer with summary text and navigation links.
 * @module src/components/layout/Footer/Footer
 */
import { COMMON_COPY } from '@/copy';

import { FooterLinks } from './FooterLinks';

export const Footer = () => (
  <footer className="mt-auto bg-dark text-white">
    <div className="mx-auto flex w-full max-w-content flex-col gap-6 px-4 py-10 md:px-8">
      <div className="space-y-3">
        <h2 className="font-heading text-2xl uppercase tracking-wide">
          {COMMON_COPY.brandName}
        </h2>
        <p className="max-w-2xl font-body text-sm text-surface">
          {COMMON_COPY.layout.footerSummary}
        </p>
      </div>
      <FooterLinks />
      <p className="font-body text-xs text-surface">
        {COMMON_COPY.layout.footerCopyright}
      </p>
    </div>
  </footer>
);

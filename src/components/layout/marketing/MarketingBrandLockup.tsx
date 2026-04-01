/**
 * @file MarketingBrandLockup.tsx
 * @description Shared SVG brand lockup used by marketing footers.
 * @module src/components/layout/marketing/MarketingBrandLockup
 */
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';

export const MarketingBrandLockup = () => (
  <Link
    aria-label={COMMON_COPY.brandName}
    className="inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030B18]"
    to={ROUTES.HOME}
  >
    <svg aria-hidden="true" className="h-[60px] w-[120px] text-white" fill="none" viewBox="0 0 120 60">
      <path d="M6 6H24C35.05 6 44 14.95 44 26V34C44 45.05 35.05 54 24 54H6V6Z" stroke="currentColor" strokeWidth="4" />
      <path d="M17 19L12.8 22L14.4 27L20 27.1L22 21.6L17 19Z" fill="currentColor" />
      <path d="M11.4 28.5L8.4 31.4L9.2 36.5L14.2 38.1L18.2 34.6L17.2 29.6L11.4 28.5Z" fill="currentColor" />
      <path d="M18.8 30.1L20.6 35L25.8 35.9L29.2 31.7L27.1 27L21.8 26.7L18.8 30.1Z" fill="currentColor" />
      <path d="M22.6 18.1L27.5 19.4L31.1 15.8L29.1 10.9L24.1 10.2L20.9 14.1L22.6 18.1Z" fill="currentColor" />
      <path d="M29.2 20.5L31.6 25.2L36.9 25.4L39.8 21L37.5 16.3L32.2 16.3L29.2 20.5Z" fill="currentColor" />
      <path d="M53 6H67C85.23 6 100 20.77 100 39V54H84V39C84 29.61 76.39 22 67 22H53V6Z" fill="currentColor" />
      <text fill="currentColor" fontFamily="Ubuntu, sans-serif" fontSize="12" fontWeight="500" letterSpacing="0.12em" x="55" y="53">
        DIVINE
      </text>
    </svg>
  </Link>
);

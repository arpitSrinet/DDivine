/**
 * @file PageWrapper.tsx
 * @description Shared page wrapper that applies the main content container and skip link behavior.
 * @module src/components/layout/PageWrapper
 */
import type { ReactNode } from 'react';

import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

import { OfflineBanner } from './OfflineBanner';

export interface IPageWrapperProps {
  children: ReactNode;
}

export const PageWrapper = ({ children }: IPageWrapperProps) => {
  useScrollRestoration();

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-body focus:font-medium focus:text-dark"
        href="#main-content"
      >
        {COMMON_COPY.layout.skipToContent}
      </a>
      <main className="mx-auto min-h-[60vh] w-full max-w-content space-y-4 px-4 py-12 md:px-8" id="main-content" tabIndex={-1}>
        <OfflineBanner />
        {children}
      </main>
    </>
  );
};

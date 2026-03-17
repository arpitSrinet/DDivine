/**
 * @file AuthLayout.tsx
 * @description Split-screen layout shell for authentication route stubs.
 * @module src/components/layout/AuthLayout
 */
import type { ReactNode } from 'react';

import { COMMON_COPY } from '@/copy';
import { useScrollRestoration } from '@/hooks/useScrollRestoration';

export interface IAuthLayoutProps {
  children: ReactNode;
  description: string;
  title: string;
}

export const AuthLayout = ({
  children,
  description,
  title,
}: IAuthLayoutProps) => {
  useScrollRestoration();

  return (
    <div className="grid min-h-screen bg-surface lg:grid-cols-[0.42fr_0.58fr]">
      <aside className="hidden bg-primary p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="font-heading text-3xl uppercase tracking-wide">
            {COMMON_COPY.brandName}
          </p>
          <p className="mt-6 max-w-sm font-body text-base text-surface">
            {COMMON_COPY.layout.authPanelBody}
          </p>
        </div>
        <div>
          <h2 className="font-heading text-4xl uppercase tracking-wide">
            {COMMON_COPY.layout.authPanelTitle}
          </h2>
        </div>
      </aside>
      <main className="flex items-center justify-center px-4 py-12 md:px-8">
        <section className="w-full max-w-2xl rounded-3xl border border-border bg-white p-8 shadow-xl">
          <h1 className="font-heading text-4xl uppercase tracking-wide text-primary md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 font-body text-base text-muted">{description}</p>
          <div className="mt-8">{children}</div>
        </section>
      </main>
    </div>
  );
};

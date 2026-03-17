/**
 * @file SectionWrapper.tsx
 * @description Reusable section container with token-based background variants and spacing.
 * @module src/components/layout/SectionWrapper
 */
import type { ReactNode } from 'react';

import { cn } from '@/utils';

export interface ISectionWrapperProps {
  background?: 'surface' | 'surface-alt' | 'white' | 'dark';
  children: ReactNode;
  id?: string;
}

const backgroundClassNames: Record<NonNullable<ISectionWrapperProps['background']>, string> = {
  surface: 'bg-surface text-dark',
  'surface-alt': 'bg-surface-alt text-dark',
  white: 'bg-white text-dark',
  dark: 'bg-dark text-white',
};

export const SectionWrapper = ({
  background = 'white',
  children,
  id,
}: ISectionWrapperProps) => (
  <section
    className={cn(
      'rounded-3xl px-6 py-10 shadow-sm md:px-8 md:py-12',
      backgroundClassNames[background],
    )}
    id={id}
  >
    {children}
  </section>
);

/**
 * @file Badge.tsx
 * @description Compact status badge with token-based variants.
 * @module src/components/ui/Badge/Badge
 */
import { cn } from '@/utils';

import type { ReactNode } from 'react';

export interface IBadgeProps {
  variant: 'success' | 'warning' | 'danger' | 'neutral';
  children: ReactNode;
}

const badgeVariantClassNames: Record<IBadgeProps['variant'], string> = {
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  danger: 'bg-danger/15 text-danger',
  neutral: 'bg-surface-alt text-dark',
};

export const Badge = ({ variant, children }: IBadgeProps) => (
  <span
    className={cn(
      'inline-flex min-h-7 items-center rounded-full px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide',
      badgeVariantClassNames[variant],
    )}
  >
    {children}
  </span>
);

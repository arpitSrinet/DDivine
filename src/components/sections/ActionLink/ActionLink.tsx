/**
 * @file ActionLink.tsx
 * @description Shared link styled as a CTA for public section components.
 * @module src/components/sections/ActionLink
 */
import { Link } from 'react-router-dom';

import { cn } from '@/utils';

export interface IActionLinkProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}

const variantClassNames: Record<NonNullable<IActionLinkProps['variant']>, string> = {
  primary: 'bg-accent text-dark hover:bg-accent-hover focus-visible:ring-accent',
  secondary: 'bg-primary text-white hover:bg-primary-light focus-visible:ring-primary-light',
  outline:
    'border border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-dark focus-visible:ring-white',
  ghost: 'bg-surface-alt text-dark hover:bg-white focus-visible:ring-accent',
};

export const ActionLink = ({
  href,
  label,
  variant = 'primary',
}: IActionLinkProps) => (
  <Link
    className={cn(
      'inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 font-body text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      variantClassNames[variant],
    )}
    to={href}
  >
    {label}
  </Link>
);

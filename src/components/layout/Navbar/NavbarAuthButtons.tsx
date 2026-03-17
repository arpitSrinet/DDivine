/**
 * @file NavbarAuthButtons.tsx
 * @description Shared auth action links displayed in the navigation bar.
 * @module src/components/layout/Navbar/NavbarAuthButtons
 */
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';
import { cn } from '@/utils';

export interface INavbarAuthButtonsProps {
  stacked?: boolean;
}

export const NavbarAuthButtons = ({
  stacked = false,
}: INavbarAuthButtonsProps) => (
  <div className={cn('flex items-center gap-3', stacked && 'flex-col items-stretch')}>
    <Link
      className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary px-5 font-body text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      to={ROUTES.SIGNUP}
    >
      {COMMON_COPY.actions.signUp}
    </Link>
    <Link
      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-5 font-body text-sm font-semibold text-dark transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      to={ROUTES.LOGIN}
    >
      {COMMON_COPY.actions.enquire}
    </Link>
  </div>
);

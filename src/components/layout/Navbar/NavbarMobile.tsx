/**
 * @file NavbarMobile.tsx
 * @description Mobile navigation drawer content for the primary application header.
 * @module src/components/layout/Navbar/NavbarMobile
 */
import { Link } from 'react-router-dom';

import { getNavigationLabel } from '@/components/layout/navigation.utils';
import { MAIN_NAV_ITEMS } from '@/constants';

import { NavbarAuthButtons } from './NavbarAuthButtons';

export interface INavbarMobileProps {
  onNavigate: () => void;
}

export const NavbarMobile = ({ onNavigate }: INavbarMobileProps) => (
  <nav aria-label="Mobile" className="space-y-4 rounded-2xl border border-border bg-white p-4 shadow-md lg:hidden">
    <div className="flex flex-col gap-3">
      {MAIN_NAV_ITEMS.map((item) => (
        <Link
          className="rounded-lg px-3 py-2 font-body text-sm font-medium text-dark transition-colors duration-200 hover:bg-surface-alt hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          key={item.id}
          onClick={onNavigate}
          to={item.href}
        >
          {getNavigationLabel(item.id)}
        </Link>
      ))}
    </div>
    <NavbarAuthButtons stacked />
  </nav>
);

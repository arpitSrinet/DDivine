/**
 * @file NavbarDesktop.tsx
 * @description Desktop navigation links for the primary application header.
 * @module src/components/layout/Navbar/NavbarDesktop
 */
import { Link } from 'react-router-dom';

import { MAIN_NAV_ITEMS } from '@/constants';
import { getNavigationLabel } from '@/components/layout/navigation.utils';

export const NavbarDesktop = () => (
  <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
    {MAIN_NAV_ITEMS.map((item) => (
      <Link
        className="font-body text-sm font-medium text-dark transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        key={item.id}
        to={item.href}
      >
        {getNavigationLabel(item.id)}
      </Link>
    ))}
  </nav>
);

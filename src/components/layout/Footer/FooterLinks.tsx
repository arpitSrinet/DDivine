/**
 * @file FooterLinks.tsx
 * @description Footer navigation links for the public site shell.
 * @module src/components/layout/Footer/FooterLinks
 */
import { Link } from 'react-router-dom';

import { getNavigationLabel } from '@/components/layout/navigation.utils';
import { MAIN_NAV_ITEMS } from '@/constants';

export const FooterLinks = () => (
  <div className="flex flex-wrap gap-4">
    {MAIN_NAV_ITEMS.map((item) => (
      <Link
        className="font-body text-sm text-surface transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
        key={item.id}
        to={item.href}
      >
        {getNavigationLabel(item.id)}
      </Link>
    ))}
  </div>
);

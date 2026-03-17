/**
 * @file Navbar.tsx
 * @description Responsive application header with desktop navigation and a mobile menu toggle.
 * @module src/components/layout/Navbar/Navbar
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { COMMON_COPY } from '@/copy';

import { NavbarAuthButtons } from './NavbarAuthButtons';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  };
  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-4 py-4 md:px-8">
        <Link
          className="font-heading text-2xl uppercase tracking-wide text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          onClick={closeMobileMenu}
          to={ROUTES.HOME}
        >
          {COMMON_COPY.brandName}
        </Link>
        <NavbarDesktop />
        <div className="hidden lg:flex">
          <NavbarAuthButtons />
        </div>
        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? COMMON_COPY.layout.menuClose : COMMON_COPY.layout.menuOpen}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-surface text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
          onClick={toggleMobileMenu}
          type="button"
        >
          <span className="font-body text-sm font-semibold">
            {isMobileMenuOpen ? COMMON_COPY.layout.menuClose : COMMON_COPY.layout.menuOpen}
          </span>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="mx-auto w-full max-w-content px-4 pb-4 md:px-8">
          <NavbarMobile onNavigate={closeMobileMenu} />
        </div>
      )}
    </header>
  );
};

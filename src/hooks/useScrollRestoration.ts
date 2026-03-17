/**
 * @file useScrollRestoration.ts
 * @description Scrolls the viewport to the top whenever the active route path changes.
 * @module src/hooks/useScrollRestoration
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollRestoration = (): void => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
};

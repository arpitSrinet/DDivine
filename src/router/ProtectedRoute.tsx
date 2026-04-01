/**
 * @file ProtectedRoute.tsx
 * @description Route guard that requires an authenticated session. Unauthenticated
 *   visitors are redirected to /login with a ?returnUrl= param so they land back
 *   on their intended page after signing in.
 * @module src/router/ProtectedRoute
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate replace to={`${ROUTES.LOGIN}?returnUrl=${returnUrl}`} />;
  }

  return <Outlet />;
};

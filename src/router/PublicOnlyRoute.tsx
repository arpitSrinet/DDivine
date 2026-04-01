/**
 * @file PublicOnlyRoute.tsx
 * @description Route guard that blocks already-authenticated users from accessing
 *   public auth pages (login, signup). Redirects them to their role-appropriate
 *   dashboard instead.
 * @module src/router/PublicOnlyRoute
 */
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store';

export const PublicOnlyRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated) {
    const dashboard = role === 'school' ? ROUTES.DASHBOARD_SCHOOL : ROUTES.DASHBOARD_PROFILE;
    return <Navigate replace to={dashboard} />;
  }

  return <Outlet />;
};

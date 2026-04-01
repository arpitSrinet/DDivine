/**
 * @file RoleRoute.tsx
 * @description Route guard that enforces role-based access. Users with the wrong
 *   role are redirected to their own dashboard rather than shown a 403 screen.
 * @module src/router/RoleRoute
 */
import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '@/constants';
import { useAuthStore } from '@/store';

export interface IRoleRouteProps {
  allowedRoles: ReadonlyArray<'parent' | 'school'>;
}

export const RoleRoute = ({ allowedRoles }: IRoleRouteProps) => {
  const role = useAuthStore((state) => state.role);

  if (!role || !allowedRoles.includes(role)) {
    const fallback = role === 'school' ? ROUTES.DASHBOARD_SCHOOL : ROUTES.DASHBOARD_PROFILE;
    return <Navigate replace to={fallback} />;
  }

  return <Outlet />;
};

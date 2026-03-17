/**
 * @file RoleRoute.tsx
 * @description Stub role-based route wrapper that ignores role checks in Phase 4.
 * @module src/router/RoleRoute
 */
import { Outlet } from 'react-router-dom';

export interface IRoleRouteProps {
  allowedRoles: Array<'parent' | 'school'>;
}

export const RoleRoute = (_props: IRoleRouteProps) => <Outlet />;

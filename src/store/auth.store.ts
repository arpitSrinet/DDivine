/**
 * @file auth.store.ts
 * @description Zustand auth store with sessionStorage persistence. Holds the active
 *   session token, role, and user. Cleared on logout or 401 responses.
 * @module src/store/auth
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { IAuthSession, IUserRole } from '@/services/schemas';

interface IAuthUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: IUserRole;
}

interface IAuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  role: IUserRole | null;
  user: IAuthUser | null;
  clearAuth: () => void;
  setAuth: (session: IAuthSession) => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      role: null,
      user: null,

      setAuth: (session) =>
        set({
          accessToken: session.accessToken,
          isAuthenticated: true,
          role: session.role,
          user: session.user,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          role: null,
          user: null,
        }),
    }),
    {
      name: 'ddivine-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
        user: state.user,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

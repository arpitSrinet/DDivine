/**
 * @file useProfile.ts
 * @description Fetches the authenticated user's profile via GET /users/me.
 * @module src/hooks/useProfile
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { userService } from '@/services';

export const useProfile = () =>
  useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: ({ signal }) => userService.getProfile(signal),
  });

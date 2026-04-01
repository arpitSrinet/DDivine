/**
 * @file useChildren.ts
 * @description Fetches the authenticated parent's children via GET /users/me/children.
 * @module src/hooks/useChildren
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { userService } from '@/services';

export const useChildren = () =>
  useQuery({
    queryKey: queryKeys.users.children(),
    queryFn: ({ signal }) => userService.getChildren(signal),
  });

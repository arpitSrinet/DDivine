/**
 * @file useFreeActivities.ts
 * @description React Query hook for knowledge hub free activity download groups.
 * @module src/hooks/useFreeActivities
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { knowledgeService } from '@/services';

export const useFreeActivities = () => {
  const query = useQuery({
    queryFn: ({ signal }) => knowledgeService.getFreeActivities(signal),
    queryKey: queryKeys.knowledge.freeActivities(),
    staleTime: Number.POSITIVE_INFINITY,
  });

  return {
    data: query.data ?? [],
    error: query.error ?? null,
    isError: query.isError,
    isFetching: query.isFetching,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
};

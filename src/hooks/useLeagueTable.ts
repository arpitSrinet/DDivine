/**
 * @file useLeagueTable.ts
 * @description React Query hook for the public school football league table.
 * @module src/hooks/useLeagueTable
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { leagueService } from '@/services';

export const useLeagueTable = () => {
  const query = useQuery({
    queryFn: ({ signal }) => leagueService.getLeagueTable(signal),
    queryKey: queryKeys.league.table(),
    staleTime: 60 * 1000,
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

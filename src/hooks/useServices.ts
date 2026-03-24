/**
 * @file useServices.ts
 * @description React Query hook for the public services collection used across marketing pages.
 * @module src/hooks/useServices
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { servicesService } from '@/services';

export const useServices = () => {
  const query = useQuery({
    queryFn: ({ signal }) => servicesService.getServices(signal),
    queryKey: queryKeys.services.all(),
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

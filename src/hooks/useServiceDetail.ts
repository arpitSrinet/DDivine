/**
 * @file useServiceDetail.ts
 * @description Derives a single public service entry from the shared services query.
 * @module src/hooks/useServiceDetail
 */
import { useServices } from '@/hooks/useServices';
import type { IServiceKey } from '@/services/schemas';

export const useServiceDetail = (serviceKey: IServiceKey) => {
  const servicesQuery = useServices();
  const service = servicesQuery.data.find((item) => item.key === serviceKey) ?? null;

  return {
    data: service,
    error: servicesQuery.error,
    isError: servicesQuery.isError,
    isFetching: servicesQuery.isFetching,
    isLoading: servicesQuery.isLoading,
    refetch: servicesQuery.refetch,
  };
};

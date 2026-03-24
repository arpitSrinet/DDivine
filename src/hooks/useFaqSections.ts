/**
 * @file useFaqSections.ts
 * @description React Query hook for frequently asked question groups.
 * @module src/hooks/useFaqSections
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { knowledgeService } from '@/services';

export const useFaqSections = () => {
  const query = useQuery({
    queryFn: ({ signal }) => knowledgeService.getFaqSections(signal),
    queryKey: queryKeys.knowledge.faqs(),
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

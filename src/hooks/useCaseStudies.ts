/**
 * @file useCaseStudies.ts
 * @description React Query hook for knowledge hub case studies.
 * @module src/hooks/useCaseStudies
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { knowledgeService } from '@/services';

export const useCaseStudies = () => {
  const query = useQuery({
    queryFn: ({ signal }) => knowledgeService.getCaseStudies(signal),
    queryKey: queryKeys.knowledge.caseStudies(),
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

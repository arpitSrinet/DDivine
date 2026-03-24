/**
 * @file queryClient.config.ts
 * @description Shared TanStack Query client configuration for public data fetching.
 * @module src/config/queryClient
 */
import { QueryClient } from '@tanstack/react-query';

import { logger } from '@/monitoring';
import { isApiError } from '@/types';

const isNonRetryableStatus = (status: number): boolean => [401, 403, 404, 422].includes(status);

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: 'online',
      onError: (error) => {
        logger.error('Mutation failed', error instanceof Error ? error : undefined);
      },
    },
    queries: {
      gcTime: 10 * 60 * 1000,
      networkMode: 'online',
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isApiError(error) && isNonRetryableStatus(error.status)) {
          return false;
        }

        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000,
    },
  },
});

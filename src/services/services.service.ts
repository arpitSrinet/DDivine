/**
 * @file services.service.ts
 * @description Public services service methods used by marketing pages.
 * @module src/services/services
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { parseCollectionResponse, ServiceSchema } from './schemas';

export const servicesService = {
  getServices: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.services.all, { signal });
      return parseCollectionResponse('services.all', ServiceSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch services', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

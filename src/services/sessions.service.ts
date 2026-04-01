/**
 * @file sessions.service.ts
 * @description Session service methods for browsing and filtering available sessions.
 * @module src/services/sessions
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { parseCollectionResponse, parseSingleResponse, SessionSchema } from './schemas';

export interface ISessionFilters {
  date?: string;
  location?: string;
  page?: number;
  pageSize?: number;
  serviceId?: string;
}

export const sessionsService = {
  getSessions: async (filters: ISessionFilters = {}, signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.sessions.all, {
        params: filters,
        signal,
      });
      return parseCollectionResponse('sessions.all', SessionSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch sessions', error instanceof Error ? error : undefined);
      throw error;
    }
  },

  getSessionById: async (sessionId: string, signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.sessions.detail(sessionId), { signal });
      return parseSingleResponse('sessions.detail', SessionSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch session detail', error instanceof Error ? error : undefined, { sessionId });
      throw error;
    }
  },
};

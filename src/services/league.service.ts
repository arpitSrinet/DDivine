/**
 * @file league.service.ts
 * @description Public league service methods used by the school football league page.
 * @module src/services/league
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { LeagueTableRowSchema, parseCollectionResponse } from './schemas';

export const leagueService = {
  getLeagueTable: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.league.table, { signal });
      return parseCollectionResponse('league.table', LeagueTableRowSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch league table', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

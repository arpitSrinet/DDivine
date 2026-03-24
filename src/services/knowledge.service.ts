/**
 * @file knowledge.service.ts
 * @description Knowledge hub service methods used by case studies, activities, and FAQs.
 * @module src/services/knowledge
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { CaseStudySchema, FAQGroupSchema, FreeActivityGroupSchema, parseCollectionResponse } from './schemas';

export const knowledgeService = {
  getCaseStudies: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.knowledge.caseStudies, { signal });
      return parseCollectionResponse('knowledge.caseStudies', CaseStudySchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch case studies', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  getFaqSections: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.knowledge.faqs, { signal });
      return parseCollectionResponse('knowledge.faqs', FAQGroupSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch FAQ sections', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  getFreeActivities: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.knowledge.freeActivities, { signal });
      return parseCollectionResponse('knowledge.freeActivities', FreeActivityGroupSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch free activities', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

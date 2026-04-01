/**
 * @file user.service.ts
 * @description User profile service methods backed by the shared API client.
 * @module src/services/user
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { ChildSchema, parseCollectionResponse, parseSingleResponse, UserProfileSchema } from './schemas';

export const userService = {
  getChildren: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.users.children, { signal });
      return parseCollectionResponse('users.children', ChildSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch child profiles', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  createChild: async (payload: Record<string, unknown>) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.users.children, payload);
      return parseSingleResponse('users.createChild', ChildSchema, response.data);
    } catch (error) {
      logger.error('Failed to create child profile', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  updateChild: async (childId: string, payload: Record<string, unknown>) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.users.child(childId), payload);
      return parseSingleResponse('users.updateChild', ChildSchema, response.data);
    } catch (error) {
      logger.error('Failed to update child profile', error instanceof Error ? error : undefined, { childId });
      throw error;
    }
  },
  deleteChild: async (childId: string) => {
    try {
      await apiClient.delete(API_ENDPOINTS.users.child(childId));
    } catch (error) {
      logger.error('Failed to delete child profile', error instanceof Error ? error : undefined, { childId });
      throw error;
    }
  },
  getProfile: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.users.me, { signal });
      return parseSingleResponse('users.me', UserProfileSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch user profile', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  updateProfile: async (payload: Record<string, unknown>) => {
    try {
      const response = await apiClient.patch(API_ENDPOINTS.users.me, payload);
      return parseSingleResponse('users.updateProfile', UserProfileSchema, response.data);
    } catch (error) {
      logger.error('Failed to update user profile', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

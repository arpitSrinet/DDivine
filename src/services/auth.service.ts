/**
 * @file auth.service.ts
 * @description Authentication service methods backed by the shared API client.
 * @module src/services/auth
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import {
  AuthAcknowledgementSchema,
  AuthSessionSchema,
  parseSingleResponse,
  UserRoleSchema,
} from './schemas';

interface ILoginPayload {
  email: string;
  password: string;
  role: 'parent' | 'school';
}

export const authService = {
  login: async (payload: ILoginPayload) => {
    try {
      const validatedRole = UserRoleSchema.parse(payload.role);
      const response = await apiClient.post(API_ENDPOINTS.auth.login, {
        ...payload,
        role: validatedRole,
      });

      return parseSingleResponse('auth.login', AuthSessionSchema, response.data);
    } catch (error) {
      logger.error('Failed to log in user', error instanceof Error ? error : undefined, {
        email: payload.email,
      });
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.auth.logout);
      return parseSingleResponse('auth.logout', AuthAcknowledgementSchema, response.data);
    } catch (error) {
      logger.error('Failed to log out user', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  signUpParent: async (payload: Record<string, unknown>) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.auth.signUpParent, payload);
      return parseSingleResponse('auth.signUpParent', AuthAcknowledgementSchema, response.data);
    } catch (error) {
      logger.error('Failed to sign up parent', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  signUpSchool: async (payload: Record<string, unknown>) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.auth.signUpSchool, payload);
      return parseSingleResponse('auth.signUpSchool', AuthAcknowledgementSchema, response.data);
    } catch (error) {
      logger.error('Failed to sign up school', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

/**
 * @file axios.config.ts
 * @description Shared Axios client configuration with auth token injection,
 *   Phase 6 error normalisation, and 401 session-clearing.
 * @module src/config/axios
 */
import axios from 'axios';
import type { AxiosError, RawAxiosResponseHeaders } from 'axios';

import { API_ERROR_CODES, ROUTES } from '@/constants';
import { logger } from '@/monitoring';
import { useAuthStore } from '@/store';
import { ApiError, type IApiErrorPayload } from '@/types';

import { env } from './env.config';

const parseRetryAfter = (headers?: RawAxiosResponseHeaders): number | undefined => {
  const rawValue = headers?.['retry-after'];

  if (!rawValue) {
    return undefined;
  }

  const parsedValue = Number.parseInt(`${rawValue}`, 10);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const normalizeAxiosError = (error: AxiosError): ApiError => {
  if (error.response) {
    const retryAfter = parseRetryAfter(error.response.headers);
    const payload = (error.response.data ?? {}) as Partial<IApiErrorPayload>;

    return new ApiError({
      code:
        error.response.status === 429
          ? API_ERROR_CODES.RATE_LIMITED
          : payload.code ?? API_ERROR_CODES.SERVER_ERROR,
      errors: payload.errors,
      message:
        payload.message ??
        (error.response.status === 429
          ? `Too many attempts. Please try again in ${retryAfter ?? 60} seconds.`
          : 'An unexpected error occurred.'),
      retryAfter,
      status: error.response.status,
    });
  }

  if (error.request) {
    return new ApiError({
      code: API_ERROR_CODES.NETWORK_ERROR,
      message: 'Network error. Please check your connection.',
      status: 0,
    });
  }

  return new ApiError({
    code: API_ERROR_CODES.SERVER_ERROR,
    message: 'Request failed. Please try again.',
    status: 0,
  });
};

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  logger.debug('API request started', {
    method: config.method?.toUpperCase(),
    url: config.url,
  });

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalizedError = normalizeAxiosError(error);

    logger.error('API request failed', normalizedError, {
      method: error.config?.method?.toUpperCase(),
      status: normalizedError.status,
      url: error.config?.url,
    });

    if (normalizedError.code === API_ERROR_CODES.TOKEN_EXPIRED) {
      useAuthStore.getState().clearAuth();
      window.location.replace(ROUTES.LOGIN);
    }

    return Promise.reject(normalizedError);
  },
);

/**
 * @file common.schema.ts
 * @description Shared response schemas and validation helpers for API-backed data.
 * @module src/services/schemas/common
 */
import { z, ZodError } from 'zod';

import { API_ERROR_CODES } from '@/constants';
import { logger } from '@/monitoring';
import { ApiError } from '@/types';

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().positive(),
  });

export const collectionResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.union([z.array(itemSchema), paginatedResponseSchema(itemSchema)]);

const createValidationError = (context: string, error: ZodError): ApiError => {
  logger.error('API response validation failed', error, {
    context,
    issues: error.issues,
  });

  return new ApiError({
    code: API_ERROR_CODES.RESPONSE_VALIDATION_ERROR,
    message: 'Received unexpected data from the server.',
    status: 0,
  });
};

export const parseCollectionResponse = <T extends z.ZodTypeAny>(
  context: string,
  itemSchema: T,
  payload: unknown,
): z.infer<T>[] => {
  try {
    const parsedPayload = collectionResponseSchema(itemSchema).parse(payload);

    return Array.isArray(parsedPayload) ? parsedPayload : parsedPayload.data;
  } catch (error) {
    if (error instanceof ZodError) {
      throw createValidationError(context, error);
    }

    throw error;
  }
};

export const parseSingleResponse = <T extends z.ZodTypeAny>(
  context: string,
  schema: T,
  payload: unknown,
): z.infer<T> => {
  try {
    return schema.parse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createValidationError(context, error);
    }

    throw error;
  }
};

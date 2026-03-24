/**
 * @file api.types.ts
 * @description Shared API error types and helpers for the runtime data layer.
 * @module src/types/api
 */
export interface IApiFieldError {
  field: string;
  message: string;
}

export interface IApiErrorPayload {
  code: string;
  errors?: IApiFieldError[];
  message: string;
  retryAfter?: number;
  status: number;
}

export class ApiError extends Error {
  public readonly code: string;

  public readonly errors?: IApiFieldError[];

  public readonly retryAfter?: number;

  public readonly status: number;

  public constructor({ code, errors, message, retryAfter, status }: IApiErrorPayload) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.errors = errors;
    this.retryAfter = retryAfter;
    this.status = status;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

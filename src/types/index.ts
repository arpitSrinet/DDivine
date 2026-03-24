/**
 * @file index.ts
 * @description Barrel exports for shared UI-only TypeScript types.
 * @module src/types
 */
export type {
  ICopyKeyedItem,
  ILinkItem,
  IPaginationParams,
  ISelectOption,
  IStatValue,
} from './ui.types';
export { ApiError, isApiError } from './api.types';
export type { IApiErrorPayload, IApiFieldError } from './api.types';

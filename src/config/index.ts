/**
 * @file index.ts
 * @description Barrel exports for shared runtime configuration.
 * @module src/config
 */
export { apiClient } from './axios.config';
export { env } from './env.config';
export { FEATURE_FLAGS, type IFeatureFlag } from './featureFlags';
export { queryClient } from './queryClient.config';

/**
 * @file featureFlags.ts
 * @description Feature flag values resolved from environment variables at startup.
 *   Never hardcode flags to true in source. Use VITE_FLAG_* env vars.
 * @module src/config/featureFlags
 */

export const FEATURE_FLAGS = {
  enableLeagueSubmission: import.meta.env.VITE_FLAG_LEAGUE_SUBMISSION === 'true',
  enableNewDashboard: import.meta.env.VITE_FLAG_NEW_DASHBOARD === 'true',
} as const;

export type IFeatureFlag = keyof typeof FEATURE_FLAGS;

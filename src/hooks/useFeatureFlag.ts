/**
 * @file useFeatureFlag.ts
 * @description Hook that returns the boolean value of a named feature flag.
 *   Flag values are resolved from environment variables at startup — this hook
 *   is a stable read-only accessor.
 * @module src/hooks/useFeatureFlag
 */
import { FEATURE_FLAGS, type IFeatureFlag } from '@/config';

export const useFeatureFlag = (flag: IFeatureFlag): boolean => FEATURE_FLAGS[flag];

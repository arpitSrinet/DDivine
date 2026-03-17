/**
 * @file useReducedMotion.ts
 * @description Returns whether the user prefers reduced motion based on the matching media query.
 * @module src/hooks/useReducedMotion
 */
import { useMediaQuery } from './useMediaQuery';

export const useReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');


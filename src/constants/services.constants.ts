/**
 * @file services.constants.ts
 * @description Static service identifiers and route mappings used across the app.
 * @module src/constants/services
 */
import { ROUTES } from './routes.constants';

export const SERVICE_KEYS = [
  'curricular',
  'extraCurricular',
  'holidayCamps',
  'wraparound',
] as const;

export const SERVICE_ROUTE_MAP = {
  curricular: ROUTES.SERVICES_CURRICULAR,
  extraCurricular: ROUTES.SERVICES_EXTRA,
  holidayCamps: ROUTES.SERVICES_HOLIDAY,
  wraparound: ROUTES.SERVICES_WRAPAROUND,
} as const;

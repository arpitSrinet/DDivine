/**
 * @file session.schema.ts
 * @description Zod schema for session list and detail payloads (Module 7).
 * @module src/services/schemas/session
 */
import { z } from 'zod';

export const SessionSchema = z.object({
  availableSpots: z.number().int().nonnegative(),
  coachName: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected ISO date YYYY-MM-DD'),
  id: z.string(),
  location: z.string(),
  maxAgeYears: z.number().int().positive(),
  maxCapacity: z.number().int().positive(),
  minAgeYears: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
  serviceId: z.string(),
  serviceName: z.string(),
  time: z.string(),
});

export type ISession = z.infer<typeof SessionSchema>;

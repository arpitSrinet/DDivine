/**
 * @file service.schema.ts
 * @description Zod schemas for public service content used across marketing pages.
 * @module src/services/schemas/service
 */
import { z } from 'zod';

export const ServiceKeySchema = z.enum(['curricular', 'extraCurricular', 'holidayCamps', 'wraparound']);

export const ServiceSchema = z.object({
  id: z.string(),
  imageAlt: z.string(),
  imageSrc: z.string().min(1),
  key: ServiceKeySchema,
  summary: z.string(),
  title: z.string(),
});

export type IService = z.infer<typeof ServiceSchema>;
export type IServiceKey = z.infer<typeof ServiceKeySchema>;

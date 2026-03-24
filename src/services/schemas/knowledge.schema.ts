/**
 * @file knowledge.schema.ts
 * @description Zod schemas for case studies, downloads, and FAQ resources.
 * @module src/services/schemas/knowledge
 */
import { z } from 'zod';

export const CaseStudySchema = z.object({
  body: z.string(),
  id: z.string(),
  tag: z.string().optional(),
  title: z.string(),
});

export const FreeActivityGroupSchema = z.object({
  description: z.string(),
  downloads: z.array(z.string()),
  id: z.string(),
  title: z.string(),
});

export const FAQItemSchema = z.object({
  answer: z.string(),
  question: z.string(),
});

export const FAQGroupSchema = z.object({
  items: z.array(FAQItemSchema),
  title: z.string(),
});

export type ICaseStudy = z.infer<typeof CaseStudySchema>;
export type IFAQGroup = z.infer<typeof FAQGroupSchema>;
export type IFreeActivityGroup = z.infer<typeof FreeActivityGroupSchema>;

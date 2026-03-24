/**
 * @file user.schema.ts
 * @description Zod schemas for user profile and child profile payloads.
 * @module src/services/schemas/user
 */
import { z } from 'zod';

export const ChildSchema = z.object({
  dateOfBirth: z.string(),
  firstName: z.string(),
  gender: z.string(),
  id: z.string(),
  lastName: z.string(),
  medicalConditions: z.string().optional(),
  yearGroup: z.string(),
});

export const UserProfileSchema = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  county: z.string().optional(),
  email: z.string().email(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  phone: z.string().optional(),
  postcode: z.string().optional(),
  town: z.string().optional(),
});

export type IChild = z.infer<typeof ChildSchema>;
export type IUserProfile = z.infer<typeof UserProfileSchema>;

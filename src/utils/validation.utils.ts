/**
 * @file validation.utils.ts
 * @description Shared primitive validation schemas for forms and reusable input rules.
 * @module src/utils/validation
 */
import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Enter a valid email address.');

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[0-9+\s()-]{7,20}$/, 'Enter a valid phone number.');

export const postcodeSchema = z
  .string()
  .trim()
  .regex(/^[A-Z0-9 ]{3,10}$/i, 'Enter a valid postcode.');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .regex(/[0-9]/, 'Password must contain at least one number.')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.');

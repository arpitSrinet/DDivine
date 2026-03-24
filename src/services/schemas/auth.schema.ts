/**
 * @file auth.schema.ts
 * @description Zod schemas for authentication request and response payloads.
 * @module src/services/schemas/auth
 */
import { z } from 'zod';

export const UserRoleSchema = z.enum(['parent', 'school']);

export const AuthUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
  role: UserRoleSchema,
});

export const AuthSessionSchema = z.object({
  accessToken: z.string().min(1),
  role: UserRoleSchema,
  user: AuthUserSchema,
});

export const AuthAcknowledgementSchema = z.object({
  message: z.string(),
});

export type IAuthAcknowledgement = z.infer<typeof AuthAcknowledgementSchema>;
export type IAuthSession = z.infer<typeof AuthSessionSchema>;
export type IUserRole = z.infer<typeof UserRoleSchema>;

/**
 * @file env.config.ts
 * @description Typed environment configuration with startup validation for runtime dependencies.
 * @module src/config/env
 */
import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().min(1, 'VITE_API_BASE_URL is required'),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

const parsedEnv = envSchema.safeParse(import.meta.env);

if (!parsedEnv.success) {
  throw new Error(parsedEnv.error.issues.map((issue) => issue.message).join(', '));
}

export const env = {
  apiBaseUrl: parsedEnv.data.VITE_API_BASE_URL,
  appEnv: parsedEnv.data.VITE_APP_ENV,
} as const;

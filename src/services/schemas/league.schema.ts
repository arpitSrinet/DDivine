/**
 * @file league.schema.ts
 * @description Zod schemas for league table rows used in the public league view.
 * @module src/services/schemas/league
 */
import { z } from 'zod';

export const LeagueTableRowSchema = z.object({
  draws: z.number().int().nonnegative(),
  losses: z.number().int().nonnegative(),
  matchesPlayed: z.number().int().nonnegative(),
  points: z.number().int().nonnegative(),
  teamName: z.string(),
  wins: z.number().int().nonnegative(),
});

export type ILeagueTableRow = z.infer<typeof LeagueTableRowSchema>;

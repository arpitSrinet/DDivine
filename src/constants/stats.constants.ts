/**
 * @file stats.constants.ts
 * @description Static stat values used by the marketing site before data wiring is introduced.
 * @module src/constants/stats
 */
import type { IStatValue } from '@/types';

export const HOME_STATS = [
  { id: 'schoolsContacted', value: 26, suffix: '' },
  { id: 'childrenCoached', value: 967, suffix: '' },
  { id: 'clubsCovered', value: 5, suffix: '' },
  { id: 'staffMembers', value: 8, suffix: '' },
] as const satisfies readonly IStatValue[];

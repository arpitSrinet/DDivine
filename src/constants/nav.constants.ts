/**
 * @file nav.constants.ts
 * @description Navigation route definitions keyed by copy identifiers.
 * @module src/constants/nav
 */
import type { ILinkItem } from '@/types';

import { ROUTES } from './routes.constants';

export const MAIN_NAV_ITEMS: readonly ILinkItem[] = [
  { id: 'about', href: ROUTES.ABOUT },
  { id: 'services', href: ROUTES.SERVICES },
  { id: 'policies', href: ROUTES.POLICIES },
  { id: 'events', href: ROUTES.UPCOMING_EVENTS },
  { id: 'knowledgeHub', href: ROUTES.KNOWLEDGE_HUB },
  { id: 'league', href: ROUTES.LEAGUE },
] as const;

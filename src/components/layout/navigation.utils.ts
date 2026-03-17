/**
 * @file navigation.utils.ts
 * @description Shared helpers for mapping layout navigation items to copy labels.
 * @module src/components/layout/navigation
 */
import { COMMON_COPY } from '@/copy';

export const getNavigationLabel = (navigationId: string): string => {
  switch (navigationId) {
    case 'about':
      return COMMON_COPY.navigation.about;
    case 'services':
      return COMMON_COPY.navigation.services;
    case 'policies':
      return COMMON_COPY.navigation.policies;
    case 'events':
      return COMMON_COPY.navigation.events;
    case 'knowledgeHub':
      return COMMON_COPY.navigation.knowledgeHub;
    case 'league':
      return COMMON_COPY.navigation.league;
    default:
      return navigationId;
  }
};

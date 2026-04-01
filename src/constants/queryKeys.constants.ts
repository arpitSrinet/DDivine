/**
 * @file queryKeys.constants.ts
 * @description Stable query key factory definitions for all API-backed resources.
 * @module src/constants/queryKeys
 */
import type { IPaginationParams } from '@/types';

const normalizePagination = (params: IPaginationParams = {}) => ({
  page: params.page ?? 1,
  pageSize: params.pageSize ?? 10,
});

export const queryKeys = {
  auth: {
    session: () => ['auth', 'session'] as const,
    me: () => ['auth', 'me'] as const,
  },
  users: {
    profile: () => ['users', 'profile'] as const,
    children: () => ['users', 'children'] as const,
  },
  bookings: {
    all: () => ['bookings'] as const,
    mine: (params?: IPaginationParams) => ['bookings', 'mine', normalizePagination(params)] as const,
    detail: (bookingId: string) => ['bookings', 'detail', bookingId] as const,
  },
  children: {
    all: () => ['children'] as const,
  },
  services: {
    all: () => ['services'] as const,
    detail: (serviceKey: string) => ['services', 'detail', serviceKey] as const,
  },
  league: {
    table: () => ['league', 'table'] as const,
    games: (params?: IPaginationParams) => ['league', 'games', normalizePagination(params)] as const,
  },
  knowledge: {
    caseStudies: (params?: IPaginationParams) => ['knowledge', 'case-studies', normalizePagination(params)] as const,
    freeActivities: (params?: IPaginationParams) =>
      ['knowledge', 'free-activities', normalizePagination(params)] as const,
    faqs: () => ['knowledge', 'faqs'] as const,
  },
} as const;

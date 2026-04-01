/**
 * @file index.ts
 * @description Barrel exports for API service modules.
 * @module src/services
 */
export { authService } from './auth.service';
export { bookingService } from './booking.service';
export { knowledgeService } from './knowledge.service';
export { leagueService } from './league.service';
export { sessionsService } from './sessions.service';
export type { ISessionFilters } from './sessions.service';
export { servicesService } from './services.service';
export { userService } from './user.service';

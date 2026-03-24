/**
 * @file index.ts
 * @description Barrel exports for all service-layer Zod schemas and inferred types.
 * @module src/services/schemas
 */
export {
  AuthAcknowledgementSchema,
  AuthSessionSchema,
  AuthUserSchema,
  type IAuthAcknowledgement,
  type IAuthSession,
  type IUserRole,
  UserRoleSchema,
} from './auth.schema';
export { BookingSchema, type IBooking } from './booking.schema';
export { collectionResponseSchema, paginatedResponseSchema, parseCollectionResponse, parseSingleResponse } from './common.schema';
export { type ICaseStudy, CaseStudySchema, FAQGroupSchema, type IFAQGroup, type IFreeActivityGroup, FreeActivityGroupSchema } from './knowledge.schema';
export { type ILeagueTableRow, LeagueTableRowSchema } from './league.schema';
export { type IService, type IServiceKey, ServiceKeySchema, ServiceSchema } from './service.schema';
export { ChildSchema, type IChild, type IUserProfile, UserProfileSchema } from './user.schema';

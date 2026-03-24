/**
 * @file booking.schema.ts
 * @description Zod schemas for booking list and detail payloads.
 * @module src/services/schemas/booking
 */
import { z } from 'zod';

export const BookingSchema = z.object({
  coachName: z.string().optional(),
  date: z.string().datetime(),
  id: z.string(),
  location: z.string(),
  price: z.number().nonnegative().optional(),
  serviceName: z.string(),
  status: z.enum(['confirmed', 'pending', 'cancelled']),
  time: z.string(),
});

export type IBooking = z.infer<typeof BookingSchema>;

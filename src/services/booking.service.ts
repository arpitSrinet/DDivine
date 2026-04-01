/**
 * @file booking.service.ts
 * @description Booking service methods for authenticated dashboard flows.
 * @module src/services/booking
 */
import { API_ENDPOINTS } from '@/constants';
import { logger } from '@/monitoring';

import { apiClient } from '@/config';

import { BookingSchema, parseCollectionResponse, parseSingleResponse } from './schemas';

export const bookingService = {
  createBooking: async (payload: { sessionId: string; childId?: string; idempotencyKey?: string }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.bookings.create, payload);
      return parseSingleResponse('bookings.create', BookingSchema, response.data);
    } catch (error) {
      logger.error('Failed to create booking', error instanceof Error ? error : undefined);
      throw error;
    }
  },
  cancelBooking: async (bookingId: string) => {
    try {
      const response = await apiClient.delete(API_ENDPOINTS.bookings.detail(bookingId));
      return response.data as void;
    } catch (error) {
      logger.error('Failed to cancel booking', error instanceof Error ? error : undefined, {
        bookingId,
      });
      throw error;
    }
  },
  getBookingById: async (bookingId: string, signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.bookings.detail(bookingId), { signal });
      return parseSingleResponse('bookings.detail', BookingSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch booking detail', error instanceof Error ? error : undefined, {
        bookingId,
      });
      throw error;
    }
  },
  getMyBookings: async (signal?: AbortSignal) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.bookings.mine, { signal });
      return parseCollectionResponse('bookings.mine', BookingSchema, response.data);
    } catch (error) {
      logger.error('Failed to fetch bookings', error instanceof Error ? error : undefined);
      throw error;
    }
  },
};

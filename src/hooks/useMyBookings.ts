/**
 * @file useMyBookings.ts
 * @description Fetches the authenticated user's bookings via GET /bookings/mine.
 * @module src/hooks/useMyBookings
 */
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { bookingService } from '@/services';

export const useMyBookings = () =>
  useQuery({
    queryKey: queryKeys.bookings.mine(),
    queryFn: ({ signal }) => bookingService.getMyBookings(signal),
  });

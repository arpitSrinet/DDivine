/**
 * @file MyBookingsPage.tsx
 * @description Parent bookings list with event-details and cancel-booking modals.
 * @module src/pages/dashboard/MyBookingsPage
 */
import { useState } from 'react';

import { ParentDashboardLayout } from '@/components/layout';
import { BookingCard, EventDetailsModal } from '@/components/features/dashboard';
import { DASHBOARD_COPY } from '@/copy';
import { useMyBookings } from '@/hooks/useMyBookings';
import type { IBooking } from '@/services/schemas';
import { PageSEO } from '@/seo/PageSEO';
import { SEO_META } from '@/seo/seo.constants';
import { useAuthStore } from '@/store';

const MyBookingsPage = () => {
  const authUser = useAuthStore((s) => s.user);
  const userName = authUser ? `${authUser.firstName} ${authUser.lastName}` : '—';
  const { data: bookings, isLoading, isError } = useMyBookings();
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  return (
    <>
      <PageSEO description={SEO_META.dashboard.description} noIndex={SEO_META.dashboard.noIndex} title={DASHBOARD_COPY.bookings.pageTitle} />
      <ParentDashboardLayout activeTab="bookings" userName={userName}>
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div className="h-[129px] animate-pulse rounded-sm bg-gray-100" key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="font-body text-sm text-red-600" role="alert">
            Failed to load bookings. Please refresh.
          </p>
        )}

        {!isLoading && !isError && bookings?.length === 0 && (
          <div className="py-16 text-center">
            <p className="font-body text-lg font-medium text-[#121212]">{DASHBOARD_COPY.bookings.emptyHeading}</p>
            <p className="mt-2 font-body text-sm text-[#64748B]">{DASHBOARD_COPY.bookings.emptyBody}</p>
          </div>
        )}

        {!isLoading && !isError && bookings && bookings.length > 0 && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <BookingCard
                booking={booking}
                key={booking.id}
                onViewDetails={(b) => setSelectedBooking(b)}
              />
            ))}
          </div>
        )}

        {selectedBooking && (
          <EventDetailsModal
            booking={selectedBooking}
            isOpen={Boolean(selectedBooking)}
            onClose={() => setSelectedBooking(null)}
          />
        )}
      </ParentDashboardLayout>
    </>
  );
};

export default MyBookingsPage;

/**
 * @file CancelBookingModal.tsx
 * @description Confirmation dialog for cancelling a booking.
 * @module src/components/features/dashboard/CancelBookingModal
 */
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/constants';
import { logger } from '@/monitoring';
import { bookingService } from '@/services';
import type { IBooking } from '@/services/schemas';
import { Modal } from '@/components/ui';

interface ICancelBookingModalProps {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

export const CancelBookingModal = ({ booking, isOpen, onClose }: ICancelBookingModalProps) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const handleCancel = async () => {
    setError('');
    setIsCancelling(true);
    try {
      await bookingService.cancelBooking(booking.id);
      await queryClient.invalidateQueries({ queryKey: queryKeys.bookings.mine() });
      onClose();
    } catch {
      setError('Failed to cancel booking. Please try again.');
      logger.error('Cancel booking failed', undefined, { bookingId: booking.id });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Modal ariaLabel="Cancel booking" isOpen={isOpen} onClose={onClose} size="sm">
      <Modal.Body>
        <h2 className="font-body text-xl font-semibold text-[#121212]">
          Are you sure you want to cancel?
        </h2>

        <div className="mt-4 rounded-sm bg-[#F8FAFC] p-4">
          <p className="font-body text-xs font-medium uppercase tracking-wide text-[#94A3B8]">
            Event to be cancelled
          </p>
          <p className="mt-2 font-body text-base font-semibold text-[#121212]">
            {booking.serviceName}
          </p>
          <p className="mt-1 font-body text-sm text-[#414141]">
            📅 {booking.date}
          </p>
        </div>

        {error && (
          <p className="mt-3 font-body text-sm text-red-600" role="alert">{error}</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button
          className="rounded-sm px-5 py-2.5 font-body text-sm font-medium text-[#414141] transition hover:bg-gray-100"
          disabled={isCancelling}
          onClick={onClose}
          type="button"
        >
          No, keep booking
        </button>
        <button
          className="rounded-sm bg-[#DC2626] px-5 py-2.5 font-body text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          disabled={isCancelling}
          onClick={() => { void handleCancel(); }}
          type="button"
        >
          {isCancelling ? 'Cancelling…' : 'Yes, cancel booking'}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

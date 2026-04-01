/**
 * @file EventDetailsModal.tsx
 * @description Full booking detail view with cancel booking option.
 * @module src/components/features/dashboard/EventDetailsModal
 */
import { useState } from 'react';

import type { IBooking } from '@/services/schemas';
import { Modal } from '@/components/ui';

import { CancelBookingModal } from './CancelBookingModal';

interface IEventDetailsModalProps {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailsModal = ({ booking, isOpen, onClose }: IEventDetailsModalProps) => {
  const [showCancel, setShowCancel] = useState(false);

  return (
    <>
      <Modal ariaLabel="Event details" isOpen={isOpen} onClose={onClose} size="md">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div>
            <p className="font-body text-xs font-medium text-[#94A3B8]">
              Booking ID: #{booking.id.slice(0, 8).toUpperCase()}
            </p>
            <h2 className="mt-1 font-body text-2xl font-semibold text-[#121212]">
              {booking.serviceName}
            </h2>
          </div>
          <button aria-label="Close" className="mt-1 text-[#94A3B8] hover:text-[#121212]" onClick={onClose} type="button">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 20 20"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>
          </button>
        </div>

        <Modal.Body>
          {/* Date / Time / Location chips */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: '📅', label: booking.date },
              { icon: '🕐', label: booking.time },
              { icon: '📍', label: booking.location },
            ].map(({ icon, label }) => (
              <span
                className="flex items-center gap-1.5 rounded-sm bg-[#F8FAFC] px-3 py-2 font-body text-sm text-[#414141]"
                key={label}
              >
                {icon} {label}
              </span>
            ))}
          </div>

          {/* Details grid */}
          <div className="mt-5 grid grid-cols-2 gap-6">
            <div>
              <p className="font-body text-sm font-semibold text-[#121212]">Attendee Information</p>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <dt className="font-body text-sm text-[#64748B]">Coach</dt>
                  <dd className="font-body text-sm text-[#121212]">{booking.coachName ?? '—'}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-body text-sm text-[#64748B]">Status</dt>
                  <dd className="font-body text-sm capitalize text-[#121212]">{booking.status}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="font-body text-sm font-semibold text-[#121212]">Payment Summary</p>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <dt className="font-body text-sm text-[#64748B]">Base Price</dt>
                  <dd className="font-body text-sm text-[#121212]">
                    {booking.price != null ? `£${booking.price.toFixed(2)}` : '—'}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2">
                  <dt className="font-body text-sm font-semibold text-[#121212]">Total Amount</dt>
                  <dd className="font-body text-sm font-semibold text-[#121212]">
                    {booking.price != null ? `£${booking.price.toFixed(2)}` : '—'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="font-body text-sm text-[#415372] underline underline-offset-4 transition hover:text-[#08193A]"
            type="button"
          >
            Download receipt
          </button>
          {booking.status !== 'cancelled' && (
            <button
              className="rounded-sm bg-[#90D4C1] px-5 py-2.5 font-body text-sm font-medium text-[#121212] transition hover:bg-[#7dc9b6]"
              onClick={() => setShowCancel(true)}
              type="button"
            >
              Cancel booking
            </button>
          )}
        </Modal.Footer>
      </Modal>

      {showCancel && (
        <CancelBookingModal
          booking={booking}
          isOpen={showCancel}
          onClose={() => {
            setShowCancel(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

/**
 * @file BookingCard.tsx
 * @description Single booking row card matching the My Bookings design.
 * @module src/components/features/dashboard/BookingCard
 */
import type { IBooking } from '@/services/schemas';

const statusConfig = {
  confirmed: { label: 'Confirmed', bg: 'bg-[#DCFCE7]', text: 'text-[#15803D]' },
  pending:   { label: 'Pending',   bg: 'bg-yellow-50', text: 'text-yellow-700' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-50',    text: 'text-red-600'   },
  upcoming:  { label: 'Upcoming',  bg: 'bg-[#DCFCE7]', text: 'text-[#4F756A]' },
} as const;

interface IBookingCardProps {
  booking: IBooking;
  onViewDetails: (booking: IBooking) => void;
}

export const BookingCard = ({ booking, onViewDetails }: IBookingCardProps) => {
  const status = statusConfig[booking.status as keyof typeof statusConfig] ?? statusConfig.pending;

  return (
    <article className="flex h-[129px] overflow-hidden rounded-sm bg-white shadow-sm outline outline-[0.5px] outline-[#B6B6B6]">
      <div className="w-64 shrink-0">
        <img
          alt={booking.serviceName}
          className="h-full w-full object-cover"
          src={`https://placehold.co/256x129?text=${encodeURIComponent(booking.serviceName)}`}
        />
      </div>

      <div className="flex flex-1 items-center justify-between px-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 font-copy text-[10px] leading-3 ${status.bg} ${status.text}`}>
              {status.label}
            </span>
            <span className="font-copy text-[13px] font-medium text-[#94A3B8]">
              Booking ID: #{booking.id.slice(0, 8).toUpperCase()}
            </span>
          </div>

          <p className="font-copy text-[20px] font-medium leading-6 text-[#121212]">
            {booking.serviceName}
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-copy text-[13px] text-[#414141]">
              <svg className="h-3.5 w-3" fill="none" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#414141" height="12" rx="1" width="12" y="2" />
                <rect fill="white" height="2" width="2" x="2" y="5" />
              </svg>
              {booking.date}
            </span>
            <span className="flex items-center gap-1.5 font-copy text-[13px] text-[#414141]">
              <svg className="h-3 w-3" fill="#414141" viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="5" stroke="#414141" strokeWidth="1" fill="none" />
                <path d="M6 3v3l2 1" stroke="#414141" strokeWidth="1" strokeLinecap="round" />
              </svg>
              {booking.time}
            </span>
            <span className="flex items-center gap-1.5 font-copy text-[13px] text-[#414141]">
              <svg className="h-3.5 w-2.5" fill="#414141" viewBox="0 0 8 12">
                <path d="M4 0C1.8 0 0 1.8 0 4c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4zm0 5.5C3.2 5.5 2.5 4.8 2.5 4S3.2 2.5 4 2.5 5.5 3.2 5.5 4 4.8 5.5 4 5.5z" />
              </svg>
              {booking.location}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            className="flex h-[54px] w-[166px] items-center justify-center rounded-sm border border-[#08193A] font-copy text-base text-[#08193A] transition hover:bg-[#08193A] hover:text-white"
            type="button"
          >
            View Receipt
          </button>
          <button
            className="flex h-[54px] items-center justify-center rounded-sm bg-[#90D4C1] px-6 font-display text-[25px] font-medium leading-[30px] text-[#121212] transition hover:bg-[#7dc9b6]"
            onClick={() => onViewDetails(booking)}
            type="button"
          >
            Event Details
          </button>
        </div>
      </div>
    </article>
  );
};

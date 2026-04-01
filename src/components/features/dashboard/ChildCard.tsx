/**
 * @file ChildCard.tsx
 * @description Child profile card and the "Add New Child" placeholder card.
 * @module src/components/features/dashboard/ChildCard
 */
import type { IChild } from '@/services/schemas';

interface IChildCardProps {
  child: IChild;
  onEdit?: (child: IChild) => void;
}

const getAgeFromDOB = (dob: string): number => {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

export const ChildCard = ({ child, onEdit }: IChildCardProps) => (
  <article className="flex flex-col gap-3 rounded-sm border border-[#B6B6B6] bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EEF2F5] text-[#64748B]">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" fill="currentColor" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="currentColor" />
        </svg>
      </div>
      {onEdit && (
        <button
          aria-label={`Edit ${child.firstName}`}
          className="text-[#94A3B8] transition hover:text-[#08193A]"
          onClick={() => onEdit(child)}
          type="button"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16">
            <path
              d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      )}
    </div>

    <div>
      <p className="font-body text-base font-semibold text-[#121212]">
        {child.firstName} {child.lastName}
      </p>
      <div className="mt-1.5 flex flex-col gap-1 font-body text-sm text-[#414141]">
        <span className="flex items-center gap-1.5">
          <span className="text-[#94A3B8]">🎂</span>
          {getAgeFromDOB(child.dateOfBirth)} years old
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-[#94A3B8]">👤</span>
          {child.gender}
        </span>
        {child.medicalConditions && (
          <span className="flex items-start gap-1.5 text-[#DC2626]">
            <span className="mt-0.5">⚠</span>
            {child.medicalConditions}
          </span>
        )}
      </div>
    </div>
  </article>
);

interface IAddChildCardProps {
  onClick: () => void;
}

export const AddChildCard = ({ onClick }: IAddChildCardProps) => (
  <button
    className="flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-[#B6B6B6] bg-white p-5 text-[#94A3B8] transition hover:border-[#08193A] hover:text-[#08193A]"
    onClick={onClick}
    type="button"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-current">
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    </div>
    <span className="font-body text-base font-medium">Add New Child</span>
  </button>
);

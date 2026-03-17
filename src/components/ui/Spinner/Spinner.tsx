/**
 * @file Spinner.tsx
 * @description Circular loading indicator with token-based sizing.
 * @module src/components/ui/Spinner/Spinner
 */
import { cn } from '@/utils';

export interface ISpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label: string;
}

const spinnerSizes: Record<NonNullable<ISpinnerProps['size']>, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-[3px]',
  lg: 'h-8 w-8 border-4',
};

export const Spinner = ({ size = 'md', label }: ISpinnerProps) => (
  <span
    aria-label={label}
    className="inline-flex items-center justify-center"
    role="status"
  >
    <span
      aria-hidden="true"
      className={cn(
        'animate-spin rounded-full border-primary border-t-transparent',
        spinnerSizes[size],
      )}
    />
  </span>
);

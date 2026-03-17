/**
 * @file Select.tsx
 * @description Labeled select input with placeholder support and inline error handling.
 * @module src/components/ui/Select/Select
 */
import { cn } from '@/utils';

import type { ISelectProps } from './Select.types';

export const Select = ({
  label,
  name,
  options,
  placeholder,
  error,
  id,
  ...rest
}: ISelectProps) => {
  const selectId = id ?? name;
  const descriptionId = `${selectId}-description`;

  return (
    <div className="w-full space-y-2">
      <label className="block font-body text-sm font-semibold text-dark" htmlFor={selectId}>
        {label}
      </label>
      <select
        aria-describedby={error ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        className={cn(
          'min-h-11 w-full rounded-lg border bg-white px-4 py-3 font-body text-sm text-dark outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          error ? 'border-danger' : 'border-border',
        )}
        id={selectId}
        name={name}
        {...rest}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option disabled={option.disabled} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="font-body text-sm text-danger" id={descriptionId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * @file Input.tsx
 * @description Labeled text input with inline hint and error messaging.
 * @module src/components/ui/Input/Input
 */
import { cn } from '@/utils';

import type { IInputProps } from './Input.types';

export const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  hint,
  leftIcon,
  rightElement,
  required = false,
  id,
  ...rest
}: IInputProps) => {
  const inputId = id ?? name;
  const descriptionId = `${inputId}-description`;

  return (
    <div className="w-full space-y-2">
      <label className="block font-body text-sm font-semibold text-dark" htmlFor={inputId}>
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
            {leftIcon}
          </span>
        )}
        <input
          aria-describedby={hint || error ? descriptionId : undefined}
          aria-invalid={Boolean(error)}
          className={cn(
            'min-h-11 w-full rounded-lg border bg-white px-4 py-3 font-body text-sm text-dark outline-none transition-colors duration-200 placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
            leftIcon ? 'pl-10' : undefined,
            rightElement ? 'pr-12' : undefined,
            error ? 'border-danger' : 'border-border',
          )}
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          type={type}
          {...rest}
        />
        {rightElement && (
          <span className="absolute inset-y-0 right-3 flex items-center text-muted">
            {rightElement}
          </span>
        )}
      </div>
      {error ? (
        <p className="font-body text-sm text-danger" id={descriptionId} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="font-body text-sm text-muted" id={descriptionId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
};

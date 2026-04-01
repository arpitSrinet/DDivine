/**
 * @file auth.shared.tsx
 * @description Shared helpers and UI fragments for auth route implementation.
 * @module src/pages/auth/auth.shared
 */
import { useEffect, useRef, type ChangeEventHandler, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import type { ZodError } from 'zod';

import { isApiError } from '@/types';
import { cn } from '@/utils';

export type TAuthRole = 'parent' | 'school';
export type TFieldErrors = Record<string, string>;

export const authTextLinkClassName =
  'font-copy text-[1rem] leading-7 text-[#415372] underline underline-offset-4 transition hover:text-[#10295C]';

export const getAuthRoleFromPathname = (pathname: string): TAuthRole =>
  pathname.includes('/school') ? 'school' : 'parent';

export const getZodFieldErrors = (error: ZodError): TFieldErrors =>
  error.issues.reduce<TFieldErrors>((accumulator, issue) => {
    const [field] = issue.path;

    if (typeof field === 'string' && !accumulator[field]) {
      accumulator[field] = issue.message;
    }

    return accumulator;
  }, {});

export const getApiFieldErrors = (error: unknown): TFieldErrors => {
  if (!isApiError(error) || !error.errors) {
    return {};
  }

  return error.errors.reduce<TFieldErrors>((accumulator, item) => {
    if (!accumulator[item.field]) {
      accumulator[item.field] = item.message;
    }

    return accumulator;
  }, {});
};

export const getAuthErrorMessage = (error: unknown, fallback: string): string => {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const baseFieldClassName =
  'w-full border bg-white px-4 font-copy text-[1rem] text-[#121212] outline-none transition placeholder:text-[#BCBCBC] focus:border-[#9EDFD0] focus:ring-2 focus:ring-[#9EDFD0]/35';

const ErrorLine = ({
  children,
}: {
  children: string;
}) => (
  <p className="mt-2 flex items-center gap-2 font-copy text-[0.9rem] text-[#E35656]" role="alert">
    <span
      aria-hidden="true"
      className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[0.72rem] leading-none"
    >
      !
    </span>
    <span>{children}</span>
  </p>
);

interface IAuthTextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  error?: string;
  label: string;
  rightElement?: ReactNode;
}

export const AuthTextField = ({
  className,
  error,
  label,
  rightElement,
  ...props
}: IAuthTextFieldProps) => (
  <label className="block">
    <span className="mb-2 block font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
      {label}
    </span>
    <div className="relative">
      <input
        className={cn(
          baseFieldClassName,
          'h-[3.55rem]',
          error ? 'border-[#E35656]' : 'border-[#CFCFCF]',
          rightElement ? 'pr-12' : '',
          className,
        )}
        {...props}
      />
      {rightElement ? (
        <span className="absolute inset-y-0 right-3 flex items-center">
          {rightElement}
        </span>
      ) : null}
    </div>
    {error ? <ErrorLine>{error}</ErrorLine> : null}
  </label>
);

interface IAuthSelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  error?: string;
  label: string;
  options: readonly { label: string; value: string }[];
  placeholder?: string;
}

export const AuthSelectField = ({
  error,
  label,
  options,
  placeholder,
  ...props
}: IAuthSelectFieldProps) => (
  <label className="block">
    <span className="mb-2 block font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
      {label}
    </span>
    <div className="relative">
      <select
        className={cn(
          baseFieldClassName,
          'h-[3.55rem] appearance-none pr-12',
          error ? 'border-[#E35656]' : 'border-[#CFCFCF]',
        )}
        {...props}
      >
        {placeholder ? (
          <option value="">
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#8A8A8A]"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
      </span>
    </div>
    {error ? <ErrorLine>{error}</ErrorLine> : null}
  </label>
);

interface IAuthTextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label: string;
}

export const AuthTextAreaField = ({
  error,
  label,
  ...props
}: IAuthTextAreaFieldProps) => (
  <label className="block">
    <span className="mb-2 block font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
      {label}
    </span>
    <textarea
      className={cn(
        baseFieldClassName,
        'min-h-[8.5rem] py-3',
        error ? 'border-[#E35656]' : 'border-[#CFCFCF]',
      )}
      {...props}
    />
    {error ? <ErrorLine>{error}</ErrorLine> : null}
  </label>
);

export const AuthPrimaryButton = ({
  children,
  className,
  disabled,
  isLoading = false,
  type = 'button',
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit';
}) => (
  <button
    className={cn(
      'flex h-[3.85rem] w-full items-center justify-center bg-[#9EDFD0] px-6 font-display text-[1.8rem] leading-none text-[#10295C] transition hover:bg-[#90D5C5] disabled:cursor-not-allowed disabled:opacity-55',
      className,
    )}
    disabled={disabled || isLoading}
    type={type}
  >
    {isLoading ? 'Please wait...' : children}
  </button>
);

export const AuthStatusMessage = ({
  message,
  tone = 'info',
}: {
  message: string;
  tone?: 'error' | 'info' | 'success';
}) => (
  <div
    className={cn(
      'flex items-center gap-3 px-4 py-3 font-copy text-[0.98rem] leading-6',
      tone === 'error' ? 'bg-[#FFF1F1] text-[#A43B3B]' : '',
      tone === 'info' ? 'bg-[#CBD1DB] text-[#44526A]' : '',
      tone === 'success' ? 'bg-[#E9F7F2] text-[#25624F]' : '',
    )}
    role={tone === 'error' ? 'alert' : 'status'}
  >
    <span
      aria-hidden="true"
      className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[0.72rem] leading-none"
    >
      {tone === 'success' ? '✓' : 'i'}
    </span>
    <span>{message}</span>
  </div>
);

const ParentIllustration = () => (
  <div aria-hidden="true" className="relative h-[200px] w-[200px] overflow-hidden">
    <div style={{ position: 'absolute', width: 81, height: 96, left: 104, top: 0, background: '#7F7369' }} />
    <div style={{ position: 'absolute', width: 47, height: 96, left: 104, top: 0, background: '#72655A' }} />
    <div style={{ position: 'absolute', width: 100, height: 110, left: 0, top: 90, background: '#DD9A5E' }} />
    <div style={{ position: 'absolute', width: 24, height: 92, left: 0, top: 108, background: '#D38D54' }} />
    <div style={{ position: 'absolute', width: 10, height: 21, left: 43, top: 90, background: '#D38D54' }} />
    <div style={{ position: 'absolute', width: 111, height: 109, left: 89, top: 91, background: '#EAB883' }} />
    <div style={{ position: 'absolute', width: 26, height: 93, left: 89, top: 107, background: '#D8A373' }} />
    <div style={{ position: 'absolute', width: 103, height: 109, left: 93, top: 91, background: '#D83D3D' }} />
    <div style={{ position: 'absolute', width: 22, height: 47, left: 93, top: 107, background: '#A82626' }} />
    <div style={{ position: 'absolute', width: 96, height: 99, left: 4, top: 101, background: '#70BBEF' }} />
    <div style={{ position: 'absolute', width: 20, height: 46, left: 4, top: 108, background: '#4CAEE5' }} />
    <div style={{ position: 'absolute', width: 43, height: 28, left: 123, top: 90, background: '#EAB883' }} />
    <div style={{ position: 'absolute', width: 76, height: 49, left: 17, top: 0, background: '#4C4846' }} />
    <div style={{ position: 'absolute', width: 42, height: 49, left: 17, top: 0, background: '#3F3B39' }} />
    <div style={{ position: 'absolute', width: 10, height: 16, left: 86, top: 44, background: '#DD9A5E' }} />
    <div style={{ position: 'absolute', width: 10, height: 16, left: 15, top: 44, background: '#DD9A5E' }} />
    <div style={{ position: 'absolute', width: 10, height: 12, left: 86, top: 49, background: '#D38D54' }} />
    <div style={{ position: 'absolute', width: 10, height: 12, left: 15, top: 49, background: '#D38D54' }} />
    <div style={{ position: 'absolute', width: 61, height: 65, left: 25, top: 29, background: '#EDAE6B' }} />
    <div style={{ position: 'absolute', width: 23, height: 64, left: 25, top: 29, background: '#DD9A5E' }} />
    <div style={{ position: 'absolute', width: 6, height: 28, left: 52, top: 109, background: '#4CAEE5' }} />
    <div style={{ position: 'absolute', width: 22, height: 19, left: 55, top: 101, background: '#DADADA' }} />
    <div style={{ position: 'absolute', width: 17, height: 16, left: 55, top: 101, background: '#CECCCA' }} />
    <div style={{ position: 'absolute', width: 22, height: 19, left: 34, top: 101, background: '#DADADA' }} />
    <div style={{ position: 'absolute', width: 17, height: 16, left: 38, top: 101, background: '#CECCCA' }} />
    <div style={{ position: 'absolute', width: 20, height: 24, left: 123, top: 90, background: '#D8A373' }} />
    <div style={{ position: 'absolute', width: 61, height: 59, left: 114, top: 34, background: '#F7CF9C' }} />
    <div style={{ position: 'absolute', width: 36, height: 54, left: 114, top: 39, background: '#EAB883' }} />
    <div style={{ position: 'absolute', width: 27, height: 22, left: 144, top: 105, background: '#B72C2C' }} />
    <div style={{ position: 'absolute', width: 27, height: 22, left: 117, top: 105, background: '#B72C2C' }} />
    <div style={{ position: 'absolute', width: 27, height: 14, left: 117, top: 113, background: '#A82626' }} />
    <div style={{ position: 'absolute', width: 27, height: 14, left: 144, top: 113, background: '#A82626' }} />
  </div>
);

const SchoolIllustration = () => (
  <div aria-hidden="true" className="relative h-[200px] w-[200px] overflow-hidden">
    <div style={{ position: 'absolute', width: 15, height: 16, left: 106, top: 14, background: '#FF8086' }} />
    <div style={{ position: 'absolute', width: 9, height: 16, left: 100, top: 14, background: '#E5646E' }} />
    <div style={{ position: 'absolute', width: 6, height: 38, left: 97, top: 11, background: '#FFC269' }} />
    <div style={{ position: 'absolute', width: 188, height: 24, left: 6, top: 70, background: '#FF8086' }} />
    <div style={{ position: 'absolute', width: 190, height: 9, left: 5, top: 92, background: '#E5646E' }} />
    <div style={{ position: 'absolute', width: 177, height: 130, left: 13, top: 56, background: '#FFC269' }} />
    <div style={{ position: 'absolute', width: 38, height: 34, left: 81, top: 145, background: '#C38C66' }} />
    <div style={{ position: 'absolute', width: 6, height: 31, left: 97, top: 145, background: '#B57F5F' }} />
    <div style={{ position: 'absolute', width: 38, height: 38, left: 81, top: 86, background: '#FFF0AF' }} />
    <div style={{ position: 'absolute', width: 25, height: 25, left: 88, top: 92, background: '#FFFFFF' }} />
    <div style={{ position: 'absolute', width: 13, height: 16, left: 97, top: 98, background: '#857E87' }} />
    <div style={{ position: 'absolute', width: 50, height: 13, left: 75, top: 173, background: '#C8C5C9' }} />
    <div style={{ position: 'absolute', width: 181, height: 138, left: 9, top: 48, background: '#FFA95F' }} />
    <div style={{ position: 'absolute', width: 106, height: 56, left: 47, top: 45, background: '#DB4655' }} />
    <div style={{ position: 'absolute', width: 200, height: 6, left: 0, top: 183, background: '#DAD8DB' }} />
    <div style={{ position: 'absolute', width: 41, height: 16, left: 25, top: 145, background: '#EDF4FF' }} />
    <div style={{ position: 'absolute', width: 44, height: 19, left: 22, top: 145, background: '#DBEAFF' }} />
    <div style={{ position: 'absolute', width: 6, height: 14, left: 41, top: 145, background: '#FFE09F' }} />
    <div style={{ position: 'absolute', width: 6, height: 6, left: 41, top: 158, background: '#FFC269' }} />
    <div style={{ position: 'absolute', width: 6, height: 6, left: 97, top: 102, background: '#4B3F4E' }} />
    <div style={{ position: 'absolute', width: 41, height: 16, left: 25, top: 114, background: '#EDF4FF' }} />
    <div style={{ position: 'absolute', width: 44, height: 19, left: 22, top: 114, background: '#DBEAFF' }} />
    <div style={{ position: 'absolute', width: 6, height: 14, left: 41, top: 114, background: '#FFE09F' }} />
    <div style={{ position: 'absolute', width: 6, height: 6, left: 41, top: 127, background: '#FFC269' }} />
    <div style={{ position: 'absolute', width: 41, height: 16, left: 138, top: 145, background: '#EDF4FF' }} />
    <div style={{ position: 'absolute', width: 44, height: 19, left: 134, top: 145, background: '#DBEAFF' }} />
    <div style={{ position: 'absolute', width: 6, height: 14, left: 153, top: 145, background: '#FFE09F' }} />
    <div style={{ position: 'absolute', width: 6, height: 6, left: 153, top: 158, background: '#FFC269' }} />
    <div style={{ position: 'absolute', width: 41, height: 16, left: 138, top: 114, background: '#EDF4FF' }} />
    <div style={{ position: 'absolute', width: 44, height: 19, left: 134, top: 114, background: '#DBEAFF' }} />
    <div style={{ position: 'absolute', width: 6, height: 14, left: 153, top: 114, background: '#FFE09F' }} />
    <div style={{ position: 'absolute', width: 6, height: 6, left: 153, top: 127, background: '#FFC269' }} />
  </div>
);

export const AuthRoleCard = ({
  accountType,
  body,
  cta,
  title,
  to,
}: {
  accountType: TAuthRole;
  body: string;
  cta: string;
  title: string;
  to: string;
}) => (
  <article className="flex w-full flex-col items-center gap-6 sm:w-96">
    <div className="flex flex-col items-center gap-2 self-stretch">
      {accountType === 'parent' ? <ParentIllustration /> : <SchoolIllustration />}
      <div className="flex flex-col self-stretch">
        <h2 className="self-stretch text-center font-display text-[39px] font-medium leading-[54px] text-black">
          {title}
        </h2>
        <p className="self-stretch text-center font-copy text-xl font-normal leading-7 text-[#414141]">
          {body}
        </p>
      </div>
    </div>
    <Link
      className="flex h-[60px] w-full items-center justify-center rounded-sm bg-[#90D4C1] px-[18px] py-3 font-display text-[25px] font-normal leading-[30px] text-[#030B18] transition hover:bg-[#7dc9b6]"
      to={to}
    >
      {cta}
    </Link>
  </article>
);

export const AuthStepIndicator = ({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: readonly string[];
}) => (
  <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 font-copy text-[0.9rem] leading-6">
    {steps.map((step, index) => (
      <div className="flex items-center gap-2" key={step}>
        <span className={index === currentStep ? 'font-medium text-[#121212]' : 'text-[#B0B0B0]'}>
          {step}
        </span>
        {index < steps.length - 1 ? <span className="text-[#C6C6C6]">›</span> : null}
      </div>
    ))}
  </div>
);

export const AuthBackButton = ({
  onClick,
}: {
  onClick: () => void;
}) => (
  <button
    className="mb-6 inline-flex items-center gap-2 font-copy text-[0.98rem] leading-6 text-[#415372] underline underline-offset-4 transition hover:text-[#10295C]"
    onClick={onClick}
    type="button"
  >
    <span aria-hidden="true">‹</span>
    <span>Back</span>
  </button>
);

export const AuthRadioGroup = ({
  error,
  label,
  name,
  onChange,
  options,
  value,
}: {
  error?: string;
  label: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  options: readonly { label: string; value: string }[];
  value: string;
}) => (
  <fieldset>
    <legend className="mb-2 font-copy text-[0.98rem] leading-6 text-[#3C3C3C]">
      {label}
    </legend>
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map((option) => (
        <label className="inline-flex items-center gap-2 font-copy text-[0.95rem] leading-6 text-[#5C5C5C]" key={option.value}>
          <input
            checked={value === option.value}
            className="h-4 w-4 border-[#CFCFCF] text-[#10295C] focus:ring-[#9EDFD0]"
            name={name}
            onChange={onChange}
            type="radio"
            value={option.value}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
    {error ? <ErrorLine>{error}</ErrorLine> : null}
  </fieldset>
);

export const AuthOtpInput = ({
  length = 6,
  onChange,
  value,
}: {
  length?: number;
  onChange: (value: string) => void;
  value: string;
}) => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const values = Array.from({ length }, (_, index) => value[index] ?? '');

  useEffect(() => {
    if (value.length === 0) {
      refs.current[0]?.focus();
    }
  }, [value.length]);

  const updateValueAtIndex = (index: number, nextCharacter: string) => {
    const nextValues = [...values];
    nextValues[index] = nextCharacter;
    onChange(nextValues.join(''));
  };

  return (
    <div
      onPaste={(event) => {
        event.preventDefault();
        const pastedValue = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);

        if (!pastedValue) {
          return;
        }

        onChange(pastedValue);
        refs.current[Math.min(pastedValue.length, length) - 1]?.focus();
      }}
    >
      <div className="grid grid-cols-6 gap-0 border border-[#CFCFCF]">
        {values.map((digit, index) => (
          <input
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            className="h-[4rem] border-r border-[#CFCFCF] text-center font-copy text-[1.2rem] text-[#121212] outline-none focus:bg-[#F4FBF8] last:border-r-0"
            inputMode="numeric"
            key={index}
            maxLength={1}
            onChange={(event) => {
              const nextValue = event.target.value.replace(/\D/g, '');

              if (!nextValue) {
                updateValueAtIndex(index, '');
                return;
              }

              updateValueAtIndex(index, nextValue[0]);
              refs.current[index + 1]?.focus();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Backspace' && !digit) {
                refs.current[Math.max(0, index - 1)]?.focus();
              }
            }}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="text"
            value={digit}
          />
        ))}
      </div>
    </div>
  );
};

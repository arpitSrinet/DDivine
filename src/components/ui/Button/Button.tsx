/**
 * @file Button.tsx
 * @description Accessible button primitive with design-token-backed variants and loading states.
 * @module src/components/ui/Button/Button
 */
import { cn } from '@/utils';

import type { IButtonProps } from './Button.types';

const variantClassNames: Record<IButtonProps['variant'], string> = {
  primary:
    'bg-accent text-dark hover:bg-accent-hover focus-visible:ring-accent',
  secondary:
    'bg-primary text-white hover:bg-primary-light focus-visible:ring-primary-light',
  ghost:
    'bg-transparent text-dark hover:bg-surface-alt focus-visible:ring-accent',
  danger:
    'bg-danger text-white hover:opacity-90 focus-visible:ring-danger',
  outline:
    'border border-accent bg-transparent text-accent hover:bg-accent hover:text-dark focus-visible:ring-accent',
};

const sizeClassNames: Record<IButtonProps['size'], string> = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

export const Button = ({
  variant,
  size,
  leftIcon,
  rightIcon,
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
}: IButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-lg font-body font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      variantClassNames[variant],
      sizeClassNames[size],
      fullWidth && 'w-full',
      (isDisabled || isLoading) && 'cursor-not-allowed opacity-60',
    )}
    disabled={isDisabled || isLoading}
    onClick={onClick}
    type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
  >
    {isLoading ? (
      <span
        aria-hidden="true"
        className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
    ) : (
      leftIcon
    )}
    <span>{children}</span>
    {!isLoading && rightIcon}
  </button>
);

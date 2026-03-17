/**
 * @file Button.types.ts
 * @description Type definitions for the reusable Button component.
 * @module src/components/ui/Button/Button.types
 */
import type { ReactNode } from 'react';

export interface IButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
}

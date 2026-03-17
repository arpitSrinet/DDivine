/**
 * @file Input.types.ts
 * @description Type definitions for the reusable Input component.
 * @module src/components/ui/Input/Input.types
 */
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface IInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'date' | 'time';
  placeholder?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  required?: boolean;
}

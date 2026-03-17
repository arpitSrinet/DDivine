/**
 * @file Select.types.ts
 * @description Type definitions for the reusable Select component.
 * @module src/components/ui/Select/Select.types
 */
import type { SelectHTMLAttributes } from 'react';

import type { ISelectOption } from '@/types';

export interface ISelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  name: string;
  options: readonly ISelectOption[];
  placeholder?: string;
  error?: string;
}

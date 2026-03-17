/**
 * @file ui.types.ts
 * @description Shared UI-only type definitions for static configuration and reusable view models.
 * @module src/types/ui
 */
export interface ILinkItem {
  id: string;
  href: string;
}

export interface ICopyKeyedItem {
  id: string;
  copyKey: string;
}

export interface ISelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface IStatValue {
  id: string;
  value: number;
  suffix?: string;
}

export interface IPaginationParams {
  page?: number;
  pageSize?: number;
}

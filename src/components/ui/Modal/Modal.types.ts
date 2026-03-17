/**
 * @file Modal.types.ts
 * @description Type definitions for the compound Modal component.
 * @module src/components/ui/Modal/Modal.types
 */
import type { FC, ReactNode } from 'react';

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlay?: boolean;
  ariaLabel: string;
  children: ReactNode;
}

export interface IModalSectionProps {
  children: ReactNode;
}

export interface IModalComponent extends FC<IModalProps> {
  Header: FC<IModalSectionProps>;
  Body: FC<IModalSectionProps>;
  Footer: FC<IModalSectionProps>;
}

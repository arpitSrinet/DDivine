/**
 * @file Modal.Header.tsx
 * @description Header slot for the compound Modal component.
 * @module src/components/ui/Modal/Modal.Header
 */
import type { IModalSectionProps } from './Modal.types';

export const ModalHeader = ({ children }: IModalSectionProps) => (
  <div className="border-b border-border px-6 py-4">
    <h2 className="font-heading text-2xl uppercase tracking-wide text-primary">{children}</h2>
  </div>
);

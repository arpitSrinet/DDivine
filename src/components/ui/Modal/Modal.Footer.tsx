/**
 * @file Modal.Footer.tsx
 * @description Footer slot for the compound Modal component.
 * @module src/components/ui/Modal/Modal.Footer
 */
import type { IModalSectionProps } from './Modal.types';

export const ModalFooter = ({ children }: IModalSectionProps) => (
  <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border px-6 py-4">
    {children}
  </div>
);

/**
 * @file Modal.Body.tsx
 * @description Body slot for the compound Modal component.
 * @module src/components/ui/Modal/Modal.Body
 */
import type { IModalSectionProps } from './Modal.types';

export const ModalBody = ({ children }: IModalSectionProps) => (
  <div className="px-6 py-5 font-body text-sm text-muted">{children}</div>
);

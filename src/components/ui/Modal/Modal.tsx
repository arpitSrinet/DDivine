/**
 * @file Modal.tsx
 * @description Compound modal dialog with overlay close, Escape support, focus trapping, and body scroll lock.
 * @module src/components/ui/Modal/Modal
 */
import { useEffect, useRef } from 'react';

import { cn } from '@/utils';

import { ModalBody } from './Modal.Body';
import { ModalFooter } from './Modal.Footer';
import { ModalHeader } from './Modal.Header';
import type { IModalComponent, IModalProps } from './Modal.types';

const modalSizeClassNames: Record<NonNullable<IModalProps['size']>, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-5xl',
};

const getFocusableElements = (container: HTMLElement): HTMLElement[] =>
  Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('disabled'));

const ModalRoot = ({
  isOpen,
  onClose,
  size = 'md',
  closeOnOverlay = true,
  ariaLabel,
  children,
}: IModalProps) => {
  const dialogReference = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const dialogElement = dialogReference.current;

    if (dialogElement) {
      const focusableElements = getFocusableElements(dialogElement);
      const [firstFocusableElement] = focusableElements;
      (firstFocusableElement ?? dialogElement).focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialogReference.current) {
        return;
      }

      const focusableElements = getFocusableElements(dialogReference.current);

      if (!focusableElements.length) {
        event.preventDefault();
        dialogReference.current.focus();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      {closeOnOverlay ? (
        <button
          aria-label={ariaLabel}
          className="absolute inset-0 bg-dark/70"
          onClick={onClose}
          type="button"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-dark/70" />
      )}
      <div
        aria-label={ariaLabel}
        aria-modal="true"
        className={cn(
          'relative z-10 w-full overflow-hidden rounded-2xl bg-white shadow-xl outline-none',
          modalSizeClassNames[size],
        )}
        ref={dialogReference}
        role="dialog"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
};

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
}) as IModalComponent;

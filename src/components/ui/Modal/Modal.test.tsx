/**
 * @file Modal.test.tsx
 * @description Unit tests for the Modal component.
 * @module src/components/ui/Modal/Modal.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Modal } from './Modal';

describe('Modal', () => {
  it('renders dialog content when open', () => {
    render(
      <Modal ariaLabel="Preview modal" isOpen onClose={vi.fn()}>
        <Modal.Header>Preview modal</Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Preview modal' })).toBeInTheDocument();
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });
});

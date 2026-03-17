/**
 * @file Input.test.tsx
 * @description Unit tests for the Input component.
 * @module src/components/ui/Input/Input.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders a labeled input field', () => {
    render(<Input label="Email" name="email" placeholder="name@example.com" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('name@example.com')).toBeInTheDocument();
  });
});

/**
 * @file Spinner.test.tsx
 * @description Unit tests for the Spinner component.
 * @module src/components/ui/Spinner/Spinner.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders a status indicator with an accessible label', () => {
    render(<Spinner label="Loading content" />);

    expect(screen.getByRole('status', { name: 'Loading content' })).toBeInTheDocument();
  });
});

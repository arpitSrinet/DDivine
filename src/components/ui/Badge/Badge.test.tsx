/**
 * @file Badge.test.tsx
 * @description Unit tests for the Badge component.
 * @module src/components/ui/Badge/Badge.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge variant="success">Confirmed</Badge>);

    expect(screen.getByText('Confirmed')).toBeInTheDocument();
  });
});

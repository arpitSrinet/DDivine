/**
 * @file Card.test.tsx
 * @description Unit tests for the Card component.
 * @module src/components/ui/Card/Card.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders its title and description', () => {
    render(<Card description="Supportive sessions" title="PE Teaching" />);

    expect(screen.getByRole('heading', { name: 'PE Teaching' })).toBeInTheDocument();
    expect(screen.getByText('Supportive sessions')).toBeInTheDocument();
  });
});

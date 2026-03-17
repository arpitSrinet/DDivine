/**
 * @file Button.test.tsx
 * @description Unit tests for the Button component.
 * @module src/components/ui/Button/Button.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('renders its accessible label and content', () => {
    render(
      <Button size="md" variant="primary">
        Press me
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Press me' })).toBeInTheDocument();
  });
});

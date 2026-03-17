/**
 * @file Tooltip.test.tsx
 * @description Unit tests for the Tooltip component.
 * @module src/components/ui/Tooltip/Tooltip.test
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows tooltip content on hover', () => {
    render(
      <Tooltip content="Helpful hint">
        <span>Hover target</span>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText('Hover target'));

    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful hint');
  });
});

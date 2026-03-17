/**
 * @file Avatar.test.tsx
 * @description Unit tests for the Avatar component.
 * @module src/components/ui/Avatar/Avatar.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when no image is provided', () => {
    render(<Avatar name="Danny Divine" />);

    expect(screen.getByRole('img', { name: 'Danny Divine' })).toHaveTextContent('DD');
  });
});

/**
 * @file Select.test.tsx
 * @description Unit tests for the Select component.
 * @module src/components/ui/Select/Select.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from './Select';

describe('Select', () => {
  it('renders a labeled select control with options', () => {
    render(
      <Select
        label="Role"
        name="role"
        options={[
          { label: 'Parent', value: 'parent' },
          { label: 'School', value: 'school' },
        ]}
      />,
    );

    expect(screen.getByLabelText('Role')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Parent' })).toBeInTheDocument();
  });
});

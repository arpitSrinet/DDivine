/**
 * @file Accordion.test.tsx
 * @description Unit tests for the Accordion component.
 * @module src/components/ui/Accordion/Accordion.test
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion } from './Accordion';

describe('Accordion', () => {
  it('renders items and expands content', () => {
    render(
      <Accordion
        items={[
          { id: 'one', title: 'Question one', content: 'Answer one' },
          { id: 'two', title: 'Question two', content: 'Answer two' },
        ]}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Question one' }));

    expect(screen.getByText('Answer one')).toBeInTheDocument();
  });
});

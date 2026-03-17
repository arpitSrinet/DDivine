/**
 * @file AnimatedCounter.test.tsx
 * @description Unit tests for the AnimatedCounter component.
 * @module src/components/ui/AnimatedCounter/AnimatedCounter.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AnimatedCounter } from './AnimatedCounter';

describe('AnimatedCounter', () => {
  it('renders the target label', () => {
    vi.useFakeTimers();
    render(<AnimatedCounter duration={10} label="Children coached" target={12} />);
    vi.runAllTimers();

    expect(screen.getByText('Children coached')).toBeInTheDocument();
    vi.useRealTimers();
  });
});

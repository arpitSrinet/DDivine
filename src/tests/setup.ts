/**
 * @file setup.ts
 * @description Shared Vitest setup for component and utility tests.
 * @module src/tests/setup
 */
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;

  readonly rootMargin = '0px';

  readonly thresholds = [0];

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

globalThis.IntersectionObserver = MockIntersectionObserver;
globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number =>
  window.setTimeout(() => callback(performance.now()), 16);
globalThis.cancelAnimationFrame = (handle: number): void => {
  window.clearTimeout(handle);
};

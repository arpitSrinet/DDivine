/**
 * @file useFormPersistence.ts
 * @description Hook that persists and restores form values to sessionStorage under a
 *   given key. Values are saved on every change and restored on mount. Exposes
 *   clearPersistence() to call after a successful submission.
 * @module src/hooks/useFormPersistence
 */
import { useCallback, useEffect } from 'react';

export const useFormPersistence = <T extends Record<string, unknown>>(
  key: string,
  values: T,
  restoreValues: (stored: T) => void,
): { clearPersistence: () => void } => {
  useEffect(() => {
    const raw = sessionStorage.getItem(key);

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as T;
      restoreValues(parsed);
    } catch {
      sessionStorage.removeItem(key);
    }
    // Only run on mount — restoreValues intentionally excluded from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);

  const clearPersistence = useCallback(() => {
    sessionStorage.removeItem(key);
  }, [key]);

  return { clearPersistence };
};

/**
 * @file storage.utils.ts
 * @description Safe storage helpers for browser-based local and session storage access.
 * @module src/utils/storage
 */
type TStorageType = 'localStorage' | 'sessionStorage';

const getStorage = (storageType: TStorageType): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window[storageType];
};

export const getStorageValue = <T>(storageType: TStorageType, key: string): T | null => {
  try {
    const storage = getStorage(storageType);

    if (!storage) {
      return null;
    }

    const rawValue = storage.getItem(key);

    return rawValue ? (JSON.parse(rawValue) as T) : null;
  } catch {
    return null;
  }
};

export const setStorageValue = <T>(storageType: TStorageType, key: string, value: T): void => {
  const storage = getStorage(storageType);

  if (!storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
};

export const removeStorageValue = (storageType: TStorageType, key: string): void => {
  const storage = getStorage(storageType);

  if (!storage) {
    return;
  }

  storage.removeItem(key);
};

export const clearStorageValue = (storageType: TStorageType): void => {
  const storage = getStorage(storageType);

  if (!storage) {
    return;
  }

  storage.clear();
};

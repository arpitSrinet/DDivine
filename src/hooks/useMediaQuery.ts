/**
 * @file useMediaQuery.ts
 * @description Evaluates a media query and keeps the result in sync with viewport changes.
 * @module src/hooks/useMediaQuery
 */
import { useEffect, useState } from 'react';

const getInitialMatch = (query: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() => getInitialMatch(query));

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event: MediaQueryListEvent): void => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

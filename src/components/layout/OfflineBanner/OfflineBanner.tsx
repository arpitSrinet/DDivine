/**
 * @file OfflineBanner.tsx
 * @description Sticky offline status banner shown after connectivity is lost.
 * @module src/components/layout/OfflineBanner
 */
import { useEffect, useState } from 'react';

import { COMMON_COPY } from '@/copy';
import { useOnlineStatus } from '@/hooks';

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  const [hasInitialised, setHasInitialised] = useState(false);
  const [shouldShowBanner, setShouldShowBanner] = useState(false);

  useEffect(() => {
    if (!hasInitialised) {
      setHasInitialised(true);
      return;
    }

    if (!isOnline) {
      setShouldShowBanner(true);
      return;
    }

    setShouldShowBanner(false);
  }, [hasInitialised, isOnline]);

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="sticky top-0 z-40 rounded-2xl border border-warning/30 bg-warning/15 px-4 py-3 font-body text-sm font-medium text-dark shadow-sm"
      role="status"
    >
      {COMMON_COPY.status.offline}
    </div>
  );
};

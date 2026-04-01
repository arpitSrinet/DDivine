/**
 * @file RateLimitMessage.tsx
 * @description Alert component shown when the API returns a 429 rate-limit response.
 *   Displays the error message and a live countdown to when the user may retry.
 * @module src/components/ui/RateLimitMessage
 */
import { useEffect, useState } from 'react';

export interface IRateLimitMessageProps {
  message?: string;
  retryAfter?: number;
}

export const RateLimitMessage = ({
  message = 'Too many attempts. Please wait before trying again.',
  retryAfter = 60,
}: IRateLimitMessageProps) => {
  const [countdown, setCountdown] = useState(retryAfter);

  useEffect(() => {
    setCountdown(retryAfter);
  }, [retryAfter]);

  useEffect(() => {
    if (countdown <= 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [countdown]);

  return (
    <div
      className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 px-4 py-3"
      role="alert"
    >
      <span aria-hidden="true" className="mt-0.5 text-warning">
        ⚠
      </span>
      <div className="flex-1">
        <p className="font-body text-sm font-medium text-dark">{message}</p>
        {countdown > 0 && (
          <p className="mt-1 font-body text-sm text-muted">
            {'Try again in '}
            <span className="font-semibold tabular-nums text-dark">{countdown}s</span>
          </p>
        )}
      </div>
    </div>
  );
};

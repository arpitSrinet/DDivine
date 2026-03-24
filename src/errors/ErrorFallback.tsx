/**
 * @file ErrorFallback.tsx
 * @description Reusable fallback UI for page-level and section-level runtime failures.
 * @module src/errors/ErrorFallback
 */
import { Button } from '@/components/ui';
import { COMMON_COPY } from '@/copy';

export interface IErrorFallbackProps {
  level: 'page' | 'section';
  onRetry?: () => void;
}

export const ErrorFallback = ({
  level,
  onRetry,
}: IErrorFallbackProps) => {
  const content = level === 'page' ? COMMON_COPY.errors.page : COMMON_COPY.errors.section;

  return (
    <div
      className={
        level === 'page'
          ? 'rounded-[2rem] border border-danger/20 bg-white p-8 shadow-md'
          : 'rounded-[2rem] border border-danger/20 bg-surface-alt p-6 shadow-sm'
      }
      role="alert"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-heading text-2xl uppercase tracking-wide text-danger">{content.title}</h2>
          <p className="font-body text-sm leading-6 text-muted">{content.body}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} size="md" variant="outline">
            {COMMON_COPY.actions.tryAgain}
          </Button>
        )}
      </div>
    </div>
  );
};

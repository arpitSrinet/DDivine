/**
 * @file Tooltip.tsx
 * @description Minimal hover and focus tooltip for short contextual hints.
 * @module src/components/ui/Tooltip/Tooltip
 */
import { useId, useState } from 'react';

import type { ReactNode } from 'react';

export interface ITooltipProps {
  content: string;
  children: ReactNode;
}

export const Tooltip = ({ content, children }: ITooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = useId();
  const showTooltip = (): void => setIsVisible(true);
  const hideTooltip = (): void => setIsVisible(false);

  return (
    <span className="relative inline-flex">
      <button
        aria-describedby={isVisible ? tooltipId : undefined}
        className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        onBlur={hideTooltip}
        onFocus={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        type="button"
      >
        {children}
      </button>
      {isVisible && (
        <span
          className="absolute bottom-[calc(100%+0.5rem)] left-1/2 z-10 -translate-x-1/2 rounded-lg bg-dark px-3 py-2 font-body text-xs text-white shadow-lg"
          id={tooltipId}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

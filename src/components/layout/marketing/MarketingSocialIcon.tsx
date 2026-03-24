/**
 * @file MarketingSocialIcon.tsx
 * @description Minimal social icon set for marketing page footers.
 * @module src/components/layout/marketing/MarketingSocialIcon
 */
export type TMarketingSocialIconProps = {
  label: 'FB' | 'IG' | 'X';
};

export const MarketingSocialIcon = ({
  label,
}: TMarketingSocialIconProps) => {
  if (label === 'IG') {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
        <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.8" width="14" x="5" y="5" />
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" fill="currentColor" r="1" />
      </svg>
    );
  }

  if (label === 'FB') {
    return (
      <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.3 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.6 1.6-1.6h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4v1.9H7V13h2.9v8h3.4Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.9 3H21l-4.7 5.4L22 21h-4.5l-3.6-4.8L9.7 21H7.6l5-5.8L7 3h4.6l3.3 4.5L18.9 3Zm-1.6 16h1.2L10.1 4.9H8.8L17.3 19Z" />
    </svg>
  );
};

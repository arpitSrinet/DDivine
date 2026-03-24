/**
 * @file MarketingButton.tsx
 * @description Shared marketing button used by the bespoke public landing pages.
 * @module src/components/layout/marketing/MarketingButton
 */
import { Link } from 'react-router-dom';

export type TMarketingButtonProps = {
  href?: string;
  label: string;
  to: string;
  variant?: 'outline-dark' | 'outline-light' | 'solid';
};

export const MarketingButton = ({
  href,
  label,
  to,
  variant = 'solid',
}: TMarketingButtonProps) => {
  const className = [
    'inline-flex items-center justify-center rounded-[2px] px-4 py-3 text-[1rem] uppercase tracking-[0.075em] transition',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ee4d2] focus-visible:ring-offset-2',
    'font-display leading-none sm:text-[1.08rem]',
    variant === 'solid'
      ? 'bg-[#9ee4d2] text-[#09131d] hover:bg-[#8bd9c5] focus-visible:ring-offset-[#09131d]'
      : '',
    variant === 'outline-light'
      ? 'border border-white/60 text-white hover:border-white hover:bg-white/10 focus-visible:ring-offset-[#09131d]'
      : '',
    variant === 'outline-dark'
      ? 'border border-[#09131d] text-[#09131d] hover:bg-[#09131d] hover:text-white focus-visible:ring-offset-white'
      : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a className={className} href={href}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={to}>
      {label}
    </Link>
  );
};

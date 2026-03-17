/**
 * @file Card.tsx
 * @description Flexible card primitive for plain, image-top, and overlay layouts.
 * @module src/components/ui/Card/Card
 */
import type { ReactNode } from 'react';

import { cn } from '@/utils';

export interface ICardProps {
  variant?: 'default' | 'image-top' | 'overlay';
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

export const Card = ({
  variant = 'default',
  title,
  description,
  imageSrc,
  imageAlt,
  footer,
  children,
}: ICardProps) => (
  <article
    className={cn(
      'overflow-hidden rounded-2xl border border-border bg-white shadow-md',
      variant === 'overlay' && 'relative min-h-80 bg-dark text-white',
    )}
  >
    {imageSrc && variant !== 'overlay' && (
      <img
        alt={imageAlt ?? title ?? ''}
        className="h-48 w-full object-cover"
        height={192}
        loading="lazy"
        src={imageSrc}
        width={384}
      />
    )}
    {variant === 'overlay' && imageSrc && (
      <>
        <img
          alt={imageAlt ?? title ?? ''}
          className="absolute inset-0 h-full w-full object-cover"
          height={320}
          loading="lazy"
          src={imageSrc}
          width={384}
        />
        <div className="absolute inset-0 bg-dark/60" />
      </>
    )}
    <div className={cn('space-y-3 p-6', variant === 'overlay' && 'relative z-10 flex min-h-80 flex-col justify-end')}>
      {title && <h3 className="font-heading text-2xl uppercase tracking-wide">{title}</h3>}
      {description && (
        <p className={cn('font-body text-sm', variant === 'overlay' ? 'text-surface' : 'text-muted')}>
          {description}
        </p>
      )}
      {children}
      {footer}
    </div>
  </article>
);

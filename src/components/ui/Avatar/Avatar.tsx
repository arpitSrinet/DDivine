/**
 * @file Avatar.tsx
 * @description Avatar component with image support and initials fallback.
 * @module src/components/ui/Avatar/Avatar
 */
import { useMemo, useState } from 'react';

import { cn } from '@/utils';

export interface IAvatarProps {
  name: string;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const avatarSizes: Record<NonNullable<IAvatarProps['size']>, string> = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-xl',
};

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((segment) => segment.charAt(0).toUpperCase())
    .join('');

export const Avatar = ({ name, src, alt, size = 'md' }: IAvatarProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const initials = useMemo(() => getInitials(name), [name]);

  return (
    <span
      aria-label={alt ?? name}
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-primary font-heading text-white',
        avatarSizes[size],
      )}
      role="img"
    >
      {src && !hasImageError ? (
        <img
          alt={alt ?? name}
          className="h-full w-full object-cover"
          onError={() => setHasImageError(true)}
          src={src}
        />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </span>
  );
};

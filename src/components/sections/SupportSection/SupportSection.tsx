/**
 * @file SupportSection.tsx
 * @description Branded support section for childcare, SEND support, and school-family messaging.
 * @module src/components/sections/SupportSection
 */
import { cn } from '@/utils';

export interface ISupportSectionProps {
  background?: 'dark' | 'surface';
  body: string;
  imageAlt: string;
  imageSrc: string;
  points: readonly string[];
  title: string;
}

export const SupportSection = ({
  background = 'surface',
  body,
  imageAlt,
  imageSrc,
  points,
  title,
}: ISupportSectionProps) => (
  <section
    className={cn(
      'overflow-hidden rounded-[2rem] shadow-lg',
      background === 'dark' ? 'bg-dark text-white' : 'bg-surface text-dark',
    )}
  >
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
      <div className="space-y-5 px-6 py-10 md:px-8 md:py-12">
        <h2 className={cn('font-heading text-3xl uppercase tracking-wide md:text-4xl', background === 'dark' ? 'text-white' : 'text-primary')}>
          {title}
        </h2>
        <p className={cn('font-body text-base leading-7', background === 'dark' ? 'text-surface' : 'text-muted')}>
          {body}
        </p>
        <ul className="space-y-3">
          {points.map((point) => (
            <li className="flex gap-3 font-body text-sm" key={point}>
              <span
                aria-hidden="true"
                className={cn('mt-1 h-2.5 w-2.5 rounded-full', background === 'dark' ? 'bg-accent' : 'bg-primary')}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <img
        alt={imageAlt}
        className="h-full min-h-[20rem] w-full object-cover"
        height={720}
        loading="lazy"
        src={imageSrc}
        width={960}
      />
    </div>
  </section>
);

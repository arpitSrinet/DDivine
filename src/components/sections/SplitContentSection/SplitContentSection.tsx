/**
 * @file SplitContentSection.tsx
 * @description Two-column text and media section for alternating public page layouts.
 * @module src/components/sections/SplitContentSection
 */
import { cn } from '@/utils';

import { ActionLink } from '../ActionLink';
import type { IActionLinkProps } from '../ActionLink';

export interface ISplitContentSectionProps {
  body: string;
  ctas?: readonly IActionLinkProps[];
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  imageSrc: string;
  kicker?: string;
  points?: readonly string[];
  title: string;
}

export const SplitContentSection = ({
  body,
  ctas,
  imageAlt,
  imagePosition = 'right',
  imageSrc,
  kicker,
  points,
  title,
}: ISplitContentSectionProps) => (
  <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
    <div className={cn(imagePosition === 'left' && 'lg:order-2', 'space-y-4')}>
      {kicker && (
        <span className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {kicker}
        </span>
      )}
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      <p className="font-body text-base leading-7 text-muted">{body}</p>
      {points && (
        <ul className="space-y-3">
          {points.map((point) => (
            <li className="flex gap-3 font-body text-sm text-dark" key={point}>
              <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
      {ctas && (
        <div className="flex flex-wrap gap-3">
          {ctas.map((cta) => (
            <ActionLink {...cta} key={`${cta.href}-${cta.label}`} />
          ))}
        </div>
      )}
    </div>
    <div className={cn(imagePosition === 'left' && 'lg:order-1')}>
      <img
        alt={imageAlt}
        className="h-full min-h-[20rem] w-full rounded-[2rem] object-cover shadow-md"
        height={720}
        loading="lazy"
        src={imageSrc}
        width={960}
      />
    </div>
  </section>
);

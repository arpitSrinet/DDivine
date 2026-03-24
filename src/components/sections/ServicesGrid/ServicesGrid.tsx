/**
 * @file ServicesGrid.tsx
 * @description Grid of service cards used on the home page and services overview page.
 * @module src/components/sections/ServicesGrid
 */
import { Card } from '@/components/ui';
import { COMMON_COPY } from '@/copy';

import { ActionLink } from '../ActionLink';

export interface IServicesGridItem {
  body: string;
  href: string;
  imageAlt: string;
  imageSrc: string;
  title: string;
}

export interface IServicesGridProps {
  body?: string;
  items: readonly IServicesGridItem[];
  title: string;
}

export const ServicesGrid = ({
  body,
  items,
  title,
}: IServicesGridProps) => (
  <section className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="font-body text-base text-muted">{body}</p>}
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <Card
          description={item.body}
          footer={<ActionLink href={item.href} label={COMMON_COPY.actions.readMore} variant="ghost" />}
          imageAlt={item.imageAlt}
          imageSrc={item.imageSrc}
          key={item.href}
          title={item.title}
          variant="overlay"
        />
      ))}
    </div>
  </section>
);

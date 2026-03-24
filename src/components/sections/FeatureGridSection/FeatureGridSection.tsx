/**
 * @file FeatureGridSection.tsx
 * @description Responsive card grid for benefits, values, and supporting content blocks.
 * @module src/components/sections/FeatureGridSection
 */
import { Card } from '@/components/ui';

export interface IFeatureGridItem {
  body: string;
  tag?: string;
  title: string;
}

export interface IFeatureGridSectionProps {
  body?: string;
  items: readonly IFeatureGridItem[];
  title: string;
}

export const FeatureGridSection = ({
  body,
  items,
  title,
}: IFeatureGridSectionProps) => (
  <section className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="font-body text-base text-muted">{body}</p>}
    </div>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={`${item.title}-${item.body}`}>
          {item.tag && (
            <span className="inline-flex rounded-full bg-surface px-3 py-1 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {item.tag}
            </span>
          )}
          <h3 className="font-heading text-2xl uppercase tracking-wide text-primary">{item.title}</h3>
          <p className="font-body text-sm leading-6 text-muted">{item.body}</p>
        </Card>
      ))}
    </div>
  </section>
);

/**
 * @file FeatureGridSection.empty.tsx
 * @description Empty-state fallback for feature-grid content collections.
 * @module src/components/sections/FeatureGridSection
 */
import { Card } from '@/components/ui';

export interface IFeatureGridSectionEmptyProps {
  body: string;
  title: string;
}

export const FeatureGridSectionEmpty = ({
  body,
  title,
}: IFeatureGridSectionEmptyProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
    <Card>
      <p className="font-body text-sm text-muted">{body}</p>
    </Card>
  </section>
);

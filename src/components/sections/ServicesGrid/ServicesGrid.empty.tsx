/**
 * @file ServicesGrid.empty.tsx
 * @description Empty-state fallback for service card collections.
 * @module src/components/sections/ServicesGrid
 */
import { Card } from '@/components/ui';

export interface IServicesGridEmptyProps {
  body: string;
  title: string;
}

export const ServicesGridEmpty = ({
  body,
  title,
}: IServicesGridEmptyProps) => (
  <section className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
      <p className="font-body text-base text-muted">{body}</p>
    </div>
    <Card>
      <p className="font-body text-sm text-muted">{body}</p>
    </Card>
  </section>
);

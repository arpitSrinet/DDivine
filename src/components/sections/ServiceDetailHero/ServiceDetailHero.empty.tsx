/**
 * @file ServiceDetailHero.empty.tsx
 * @description Empty-state fallback for service detail hero content.
 * @module src/components/sections/ServiceDetailHero
 */
import { Card } from '@/components/ui';

export interface IServiceDetailHeroEmptyProps {
  body: string;
  title: string;
}

export const ServiceDetailHeroEmpty = ({
  body,
  title,
}: IServiceDetailHeroEmptyProps) => (
  <Card>
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
    <p className="font-body text-sm text-muted">{body}</p>
  </Card>
);

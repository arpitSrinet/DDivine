/**
 * @file FAQSection.empty.tsx
 * @description Empty-state fallback for grouped FAQ content.
 * @module src/components/sections/FAQSection
 */
import { Card } from '@/components/ui';

export interface IFAQSectionEmptyProps {
  body: string;
  title: string;
}

export const FAQSectionEmpty = ({
  body,
  title,
}: IFAQSectionEmptyProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
    <Card>
      <p className="font-body text-sm text-muted">{body}</p>
    </Card>
  </section>
);

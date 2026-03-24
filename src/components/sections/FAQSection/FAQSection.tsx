/**
 * @file FAQSection.tsx
 * @description Grouped FAQ presentation built on the shared accordion primitive.
 * @module src/components/sections/FAQSection
 */
import { Accordion } from '@/components/ui';

export interface IFAQSectionGroup {
  items: readonly {
    answer: string;
    question: string;
  }[];
  title: string;
}

export interface IFAQSectionProps {
  groups: readonly IFAQSectionGroup[];
  title: string;
}

export const FAQSection = ({
  groups,
  title,
}: IFAQSectionProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
      {title}
    </h2>
    <div className="grid gap-6 xl:grid-cols-3">
      {groups.map((group) => (
        <div className="space-y-4" key={group.title}>
          <h3 className="font-heading text-2xl uppercase tracking-wide text-primary">{group.title}</h3>
          <Accordion
            items={group.items.map((item, index) => ({
              id: `${group.title}-${index + 1}`.toLowerCase().replace(/\s+/g, '-'),
              title: item.question,
              content: item.answer,
            }))}
          />
        </div>
      ))}
    </div>
  </section>
);

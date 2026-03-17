/**
 * @file Accordion.tsx
 * @description Single-expand accordion primitive for FAQ-style content.
 * @module src/components/ui/Accordion/Accordion
 */
import { useState } from 'react';

import { cn } from '@/utils';

export interface IAccordionItem {
  id: string;
  title: string;
  content: string;
}

export interface IAccordionProps {
  items: readonly IAccordionItem[];
}

export const Accordion = ({ items }: IAccordionProps) => {
  const [openItemId, setOpenItemId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openItemId === item.id;
        const panelId = `${item.id}-panel`;

        return (
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm" key={item.id}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-body text-sm font-semibold text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              onClick={() => setOpenItemId(isOpen ? null : item.id)}
              type="button"
            >
              <span>{item.title}</span>
              <span
                aria-hidden="true"
                className={cn(
                  'text-xl text-primary transition-transform duration-200',
                  isOpen && 'rotate-45',
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border px-5 py-4 font-body text-sm text-muted" id={panelId}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/**
 * @file StatsBar.tsx
 * @description Marketing stats row rendered with animated counters.
 * @module src/components/sections/StatsBar
 */
import { AnimatedCounter } from '@/components/ui';

export interface IStatsBarItem {
  id: string;
  label: string;
  suffix?: string;
  value: number;
}

export interface IStatsBarProps {
  items: readonly IStatsBarItem[];
}

export const StatsBar = ({ items }: IStatsBarProps) => (
  <section aria-label="Impact statistics" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {items.map((item) => (
      <AnimatedCounter
        duration={1800}
        key={item.id}
        label={item.label}
        suffix={item.suffix}
        target={item.value}
      />
    ))}
  </section>
);

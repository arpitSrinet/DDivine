/**
 * @file TestimonialsCarousel.tsx
 * @description Horizontally scrollable testimonial cards for static marketing pages.
 * @module src/components/sections/TestimonialsCarousel
 */
import { Card } from '@/components/ui';

export interface ITestimonialItem {
  quote: string;
  role: string;
  speaker: string;
}

export interface ITestimonialsCarouselProps {
  body?: string;
  items: readonly ITestimonialItem[];
  title: string;
}

export const TestimonialsCarousel = ({
  body,
  items,
  title,
}: ITestimonialsCarouselProps) => (
  <section className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="font-body text-base text-muted">{body}</p>}
    </div>
    <div className="flex gap-4 overflow-x-auto pb-2">
      {items.map((item) => (
        <div className="min-w-[18rem] flex-1 snap-start" key={`${item.speaker}-${item.role}`}>
          <Card>
            <p className="font-body text-base leading-7 text-dark">&ldquo;{item.quote}&rdquo;</p>
            <div className="pt-3">
              <p className="font-body text-sm font-semibold text-primary">{item.speaker}</p>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-muted">{item.role}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  </section>
);

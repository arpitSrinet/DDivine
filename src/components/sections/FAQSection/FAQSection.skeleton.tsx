/**
 * @file FAQSection.skeleton.tsx
 * @description Skeleton placeholder for FAQ groups while API data is loading.
 * @module src/components/sections/FAQSection
 */
export const FAQSectionSkeleton = () => (
  <section aria-busy="true" aria-label="Loading frequently asked questions" className="space-y-6">
    <div className="h-10 w-72 animate-pulse rounded bg-border" />
    <div className="grid gap-6 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="space-y-4" key={`faq-skeleton-${index + 1}`}>
          <div className="h-8 w-1/2 animate-pulse rounded bg-border" />
          {Array.from({ length: 2 }).map((_, childIndex) => (
            <div className="h-16 animate-pulse rounded-2xl border border-border bg-white shadow-sm" key={`faq-item-${index + 1}-${childIndex + 1}`} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

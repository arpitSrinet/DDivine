/**
 * @file ServicesGrid.skeleton.tsx
 * @description Skeleton placeholder for the services grid while API data is loading.
 * @module src/components/sections/ServicesGrid
 */
export const ServicesGridSkeleton = () => (
  <section aria-busy="true" aria-label="Loading services" className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <div className="h-10 w-64 animate-pulse rounded bg-border" />
      <div className="h-5 w-full animate-pulse rounded bg-border" />
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-md" key={`services-skeleton-${index + 1}`}>
          <div className="h-64 animate-pulse bg-surface-alt" />
          <div className="space-y-3 p-6">
            <div className="h-8 w-2/3 animate-pulse rounded bg-border" />
            <div className="h-4 w-full animate-pulse rounded bg-border" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-border" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

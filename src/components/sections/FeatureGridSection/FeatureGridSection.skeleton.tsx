/**
 * @file FeatureGridSection.skeleton.tsx
 * @description Skeleton placeholder for a feature-grid section while API data is loading.
 * @module src/components/sections/FeatureGridSection
 */
export const FeatureGridSectionSkeleton = () => (
  <section aria-busy="true" aria-label="Loading feature content" className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <div className="h-10 w-64 animate-pulse rounded bg-border" />
      <div className="h-5 w-full animate-pulse rounded bg-border" />
    </div>
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="space-y-3 rounded-2xl border border-border bg-white p-6 shadow-md" key={`feature-skeleton-${index + 1}`}>
          <div className="h-6 w-1/3 animate-pulse rounded bg-border" />
          <div className="h-8 w-2/3 animate-pulse rounded bg-border" />
          <div className="h-4 w-full animate-pulse rounded bg-border" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-border" />
        </div>
      ))}
    </div>
  </section>
);

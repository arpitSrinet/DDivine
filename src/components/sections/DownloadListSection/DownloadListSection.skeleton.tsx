/**
 * @file DownloadListSection.skeleton.tsx
 * @description Skeleton placeholder for free-activity download groups while data is loading.
 * @module src/components/sections/DownloadListSection
 */
export const DownloadListSectionSkeleton = () => (
  <section aria-busy="true" aria-label="Loading free activities" className="space-y-6">
    <div className="h-10 w-64 animate-pulse rounded bg-border" />
    <div className="grid gap-5 xl:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <div className="space-y-3 rounded-2xl border border-border bg-white p-6 shadow-md" key={`download-skeleton-${index + 1}`}>
          <div className="h-8 w-1/2 animate-pulse rounded bg-border" />
          <div className="h-4 w-full animate-pulse rounded bg-border" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
          {Array.from({ length: 4 }).map((_, childIndex) => (
            <div className="h-12 animate-pulse rounded bg-surface-alt" key={`download-item-${index + 1}-${childIndex + 1}`} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

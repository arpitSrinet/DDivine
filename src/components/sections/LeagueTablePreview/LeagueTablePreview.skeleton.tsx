/**
 * @file LeagueTablePreview.skeleton.tsx
 * @description Skeleton placeholder for the league table while live standings are loading.
 * @module src/components/sections/LeagueTablePreview
 */
export const LeagueTablePreviewSkeleton = () => (
  <section aria-busy="true" aria-label="Loading league table" className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr] xl:items-start">
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-md">
      <div className="h-20 animate-pulse border-b border-border bg-surface-alt" />
      <div className="space-y-3 p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="h-10 animate-pulse rounded bg-border" key={`league-skeleton-${index + 1}`} />
        ))}
      </div>
    </div>
    <div className="rounded-[2rem] bg-primary p-6 shadow-md">
      <div className="h-10 w-2/3 animate-pulse rounded bg-primary-light" />
      <div className="mt-4 h-20 animate-pulse rounded bg-primary-light" />
      <div className="mt-4 h-11 w-1/2 animate-pulse rounded bg-primary-light" />
    </div>
  </section>
);

/**
 * @file ServiceDetailHero.skeleton.tsx
 * @description Skeleton placeholder for service detail hero content while the service query is loading.
 * @module src/components/sections/ServiceDetailHero
 */
export const ServiceDetailHeroSkeleton = () => (
  <section aria-busy="true" aria-label="Loading service details" className="space-y-6">
    <div className="relative overflow-hidden rounded-[2rem] bg-surface-alt shadow-xl">
      <div className="min-h-[22rem] animate-pulse bg-border" />
    </div>
    <div className="flex gap-3">
      <div className="h-11 w-40 animate-pulse rounded-lg bg-border" />
      <div className="h-11 w-40 animate-pulse rounded-lg bg-border" />
    </div>
  </section>
);

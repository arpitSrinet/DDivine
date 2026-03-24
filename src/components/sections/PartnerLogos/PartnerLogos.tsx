/**
 * @file PartnerLogos.tsx
 * @description Brand and partner logo strip rendered as labelled badges for static review pages.
 * @module src/components/sections/PartnerLogos
 */
export interface IPartnerLogoItem {
  description?: string;
  name: string;
}

export interface IPartnerLogosProps {
  body?: string;
  items: readonly IPartnerLogoItem[];
  title: string;
}

export const PartnerLogos = ({
  body,
  items,
  title,
}: IPartnerLogosProps) => (
  <section className="space-y-6">
    <div className="max-w-3xl space-y-3">
      <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="font-body text-base text-muted">{body}</p>}
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article className="rounded-2xl border border-border bg-white px-5 py-6 shadow-sm" key={item.name}>
          <p className="font-heading text-2xl uppercase tracking-wide text-primary">{item.name}</p>
          {item.description && (
            <p className="mt-2 font-body text-sm text-muted">{item.description}</p>
          )}
        </article>
      ))}
    </div>
  </section>
);

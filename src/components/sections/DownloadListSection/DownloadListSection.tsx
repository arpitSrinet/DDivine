/**
 * @file DownloadListSection.tsx
 * @description Key-stage download section for free activity resources.
 * @module src/components/sections/DownloadListSection
 */
import { Card } from '@/components/ui';

export interface IDownloadGroup {
  description: string;
  downloads: readonly string[];
  title: string;
}

export interface IDownloadListSectionProps {
  groups: readonly IDownloadGroup[];
  title: string;
}

export const DownloadListSection = ({
  groups,
  title,
}: IDownloadListSectionProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">
      {title}
    </h2>
    <div className="grid gap-5 xl:grid-cols-2">
      {groups.map((group) => (
        <Card key={group.title}>
          <h3 className="font-heading text-2xl uppercase tracking-wide text-primary">{group.title}</h3>
          <p className="font-body text-sm leading-6 text-muted">{group.description}</p>
          <ul className="space-y-3 pt-2">
            {group.downloads.map((download) => (
              <li className="rounded-2xl bg-surface px-4 py-3 font-body text-sm text-dark" key={download}>
                {download}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  </section>
);

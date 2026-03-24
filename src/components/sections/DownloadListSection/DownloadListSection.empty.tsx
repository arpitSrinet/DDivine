/**
 * @file DownloadListSection.empty.tsx
 * @description Empty-state fallback for download group collections.
 * @module src/components/sections/DownloadListSection
 */
import { Card } from '@/components/ui';

export interface IDownloadListSectionEmptyProps {
  body: string;
  title: string;
}

export const DownloadListSectionEmpty = ({
  body,
  title,
}: IDownloadListSectionEmptyProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
    <Card>
      <p className="font-body text-sm text-muted">{body}</p>
    </Card>
  </section>
);

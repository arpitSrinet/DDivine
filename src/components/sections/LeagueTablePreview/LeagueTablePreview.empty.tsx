/**
 * @file LeagueTablePreview.empty.tsx
 * @description Empty-state fallback for the league table preview section.
 * @module src/components/sections/LeagueTablePreview
 */
import { Card } from '@/components/ui';

export interface ILeagueTablePreviewEmptyProps {
  body: string;
  title: string;
}

export const LeagueTablePreviewEmpty = ({
  body,
  title,
}: ILeagueTablePreviewEmptyProps) => (
  <section className="space-y-6">
    <h2 className="font-heading text-3xl uppercase tracking-wide text-primary md:text-4xl">{title}</h2>
    <Card>
      <p className="font-body text-sm text-muted">{body}</p>
    </Card>
  </section>
);

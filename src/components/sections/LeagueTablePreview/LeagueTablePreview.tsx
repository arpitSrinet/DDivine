/**
 * @file LeagueTablePreview.tsx
 * @description Static league table preview paired with a registration CTA card.
 * @module src/components/sections/LeagueTablePreview
 */
import { Badge } from '@/components/ui';
import { COMMON_COPY } from '@/copy';

import { ActionLink } from '../ActionLink';
import type { IActionLinkProps } from '../ActionLink';

export interface ILeagueTableRow {
  draws: number;
  losses: number;
  matchesPlayed: number;
  points: number;
  teamName: string;
  wins: number;
}

export interface ILeagueTablePreviewProps {
  badgeLabel?: string;
  ctas: readonly IActionLinkProps[];
  rows: readonly ILeagueTableRow[];
  sidebarBody: string;
  sidebarTitle: string;
  title: string;
}

export const LeagueTablePreview = ({
  badgeLabel,
  ctas,
  rows,
  sidebarBody,
  sidebarTitle,
  title,
}: ILeagueTablePreviewProps) => (
  <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr] xl:items-start">
    <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <h2 className="font-heading text-3xl uppercase tracking-wide text-primary">{title}</h2>
        {badgeLabel && <Badge variant="neutral">{badgeLabel}</Badge>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-surface-alt">
            <tr className="font-body text-xs uppercase tracking-[0.2em] text-muted">
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.teamName}</th>
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.matchesPlayed}</th>
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.wins}</th>
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.draws}</th>
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.losses}</th>
              <th className="px-4 py-4 text-left">{COMMON_COPY.leagueTable.points}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-border font-body text-sm text-dark" key={row.teamName}>
                <td className="px-4 py-4 font-semibold">{row.teamName}</td>
                <td className="px-4 py-4">{row.matchesPlayed}</td>
                <td className="px-4 py-4">{row.wins}</td>
                <td className="px-4 py-4">{row.draws}</td>
                <td className="px-4 py-4">{row.losses}</td>
                <td className="px-4 py-4">{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <aside className="space-y-4 rounded-[2rem] bg-primary p-6 text-white shadow-md">
      <h3 className="font-heading text-3xl uppercase tracking-wide">{sidebarTitle}</h3>
      <p className="font-body text-sm leading-7 text-surface">{sidebarBody}</p>
      <div className="flex flex-wrap gap-3">
        {ctas.map((cta) => (
          <ActionLink {...cta} key={`${cta.href}-${cta.label}`} variant={cta.variant ?? 'primary'} />
        ))}
      </div>
    </aside>
  </section>
);

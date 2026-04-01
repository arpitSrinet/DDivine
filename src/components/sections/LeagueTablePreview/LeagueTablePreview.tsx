/**
 * @file LeagueTablePreview.tsx
 * @description League table preview with client-side team filtering backed by the league store.
 * @module src/components/sections/LeagueTablePreview
 */
import { useEffect } from 'react';

import { Badge } from '@/components/ui';
import { COMMON_COPY } from '@/copy';
import { useLeagueStore } from '@/store';

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
}: ILeagueTablePreviewProps) => {
  const selectedTeamName = useLeagueStore((state) => state.selectedTeamName);
  const setSelectedTeamName = useLeagueStore((state) => state.setSelectedTeamName);
  const availableTeamNames = rows.map((row) => row.teamName);
  const visibleRows = selectedTeamName
    ? rows.filter((row) => row.teamName === selectedTeamName)
    : rows;

  useEffect(() => {
    if (selectedTeamName && !availableTeamNames.includes(selectedTeamName)) {
      setSelectedTeamName(null);
    }
  }, [availableTeamNames, selectedTeamName, setSelectedTeamName]);

  return (
    <section className="grid gap-6 xl:grid-cols-[1.6fr_0.8fr] xl:items-start">
      <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-md">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-heading text-3xl uppercase tracking-wide text-primary">{title}</h2>
          {badgeLabel && <Badge variant="neutral">{badgeLabel}</Badge>}
        </div>
        <div className="border-b border-border bg-surface px-6 py-4">
          <div
            aria-label={COMMON_COPY.leagueTable.filterLabel}
            className="flex flex-wrap items-center gap-2"
            role="group"
          >
            <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {COMMON_COPY.leagueTable.filterLabel}
            </span>
            <button
              aria-pressed={selectedTeamName === null}
              className={`rounded-full border px-3 py-2 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                selectedTeamName === null
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white text-dark hover:border-primary hover:text-primary'
              }`}
              onClick={() => setSelectedTeamName(null)}
              type="button"
            >
              {COMMON_COPY.leagueTable.allTeams}
            </button>
            {availableTeamNames.map((teamName) => (
              <button
                aria-pressed={selectedTeamName === teamName}
                className={`rounded-full border px-3 py-2 font-body text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  selectedTeamName === teamName
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-white text-dark hover:border-primary hover:text-primary'
                }`}
                key={teamName}
                onClick={() => setSelectedTeamName(teamName)}
                type="button"
              >
                {teamName}
              </button>
            ))}
          </div>
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
              {visibleRows.map((row) => {
                const isSelectedTeam = row.teamName === selectedTeamName;

                return (
                  <tr
                    className={`border-t font-body text-sm text-dark ${
                      isSelectedTeam ? 'border-primary/20 bg-surface' : 'border-border'
                    }`}
                    key={row.teamName}
                  >
                    <td className="px-4 py-4 font-semibold">{row.teamName}</td>
                    <td className="px-4 py-4">{row.matchesPlayed}</td>
                    <td className="px-4 py-4">{row.wins}</td>
                    <td className="px-4 py-4">{row.draws}</td>
                    <td className="px-4 py-4">{row.losses}</td>
                    <td className="px-4 py-4">{row.points}</td>
                  </tr>
                );
              })}
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
};

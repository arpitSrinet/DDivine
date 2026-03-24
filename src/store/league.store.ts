/**
 * @file league.store.ts
 * @description Client-only Zustand state for public league table filters.
 * @module src/store/league
 */
import { create } from 'zustand';

interface ILeagueState {
  selectedTeamName: string | null;
  setSelectedTeamName: (teamName: string | null) => void;
}

export const useLeagueStore = create<ILeagueState>((set) => ({
  selectedTeamName: null,
  setSelectedTeamName: (teamName) => {
    set({ selectedTeamName: teamName });
  },
}));

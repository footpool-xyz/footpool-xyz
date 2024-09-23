import { create } from "zustand";
import { MatchWeek } from "~~/types/matchWeek";

type MatchWeekState = {
  matchWeeks: MatchWeek[];
  addMatchWeek: (name: string) => void;
};

export const useMatchWeekState = create<MatchWeekState>((set, get) => ({
  matchWeeks: [],
  addMatchWeek: (name: string) => {
    const newMatchWeek: MatchWeek = {
      name: name,
      isEnabled: false,
      isClosed: false,
      stakeholdersCounter: 0,
      pricePool: 0,
      matches: [],
      id: get().matchWeeks.length + 1,
    };

    set(state => ({ matchWeeks: [newMatchWeek, ...state.matchWeeks] }));
  },
}));

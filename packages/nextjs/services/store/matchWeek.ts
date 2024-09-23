import { create } from "zustand";
import { Bet } from "~~/types/match";
import { MatchWeek } from "~~/types/matchWeek";

type MatchWeekState = {
  matchWeeks: MatchWeek[];
  bets: Bet[];
  addMatchWeek: (name: string) => void;
  addBets: (bets: Bet[]) => void;
};

export const useMatchWeekState = create<MatchWeekState>((set, get) => ({
  matchWeeks: [],
  bets: [],
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
  addBets: (newBets: Bet[]) => {
    set(() => ({ bets: [...newBets] }));
  },
}));

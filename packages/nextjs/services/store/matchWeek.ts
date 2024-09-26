import { create } from "zustand";
import { Bet } from "~~/types/match";
import { MatchWeek } from "~~/types/matchWeek";

type MatchWeekState = {
  matchWeeks: MatchWeek[];
  bets: Bet[];
  setMatchWeeks: (matchWeeks: MatchWeek[]) => void;
  updateMatchWeek: (matchWeek: MatchWeek) => void;
  addMatchWeek: (name: string) => void;
  addBets: (bets: Bet[]) => void;
  initializeMatchWeeks: () => void;
};

export const useMatchWeekState = create<MatchWeekState>((set, get) => ({
  matchWeeks: [],
  bets: [],
  setMatchWeeks: (newMatchWeeks: MatchWeek[]) => {
    set(() => ({ matchWeeks: [...newMatchWeeks] }));
  },
  updateMatchWeek: (updatedMatchWeek: MatchWeek) => {
    set(state => ({
      matchWeeks: state.matchWeeks.map(matchWeek =>
        matchWeek.id === updatedMatchWeek.id ? updatedMatchWeek : matchWeek,
      ),
    }));
  },
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
  initializeMatchWeeks: async () => {
    // const { data: events, isLoading: isLoadingEvents } = useScaffoldEventHistory({
    //   contractName: "MatchWeekFactory",
    //   eventName: "MatchWeekCreated",
    //   fromBlock: 0n,
    //   watch: true,
    //   blockData: true,
    //   transactionData: true,
    //   receiptData: true,
    // });
    // console.log(events)
    // const { matchWeeks, loading, error } = useSmartContractData();
    // if (loading) return; // Maneja el loading si es necesario
    // if (error) {
    //   console.error("Error fetching match weeks:", error);
    //   return;
    // }
    // set({ matchWeeks }); // Establece el estado con los datos del smart contract
  },
}));

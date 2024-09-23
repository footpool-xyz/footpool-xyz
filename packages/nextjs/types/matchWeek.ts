import { Match } from "./match";

export type MatchWeek = {
  id: number;
  name: string;
  isEnabled: boolean;
  isClosed: boolean;
  stakeholdersCounter: number;
  pricePool: number;
  matches: Match[];
};

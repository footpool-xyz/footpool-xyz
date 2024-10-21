import { AddressType } from "./abitype/abi";
import { Match } from "./match";

export type MatchWeek = {
  id: number;
  name: string;
  isEnabled: boolean;
  isClosed: boolean;
  stakeholdersCounter: number;
  pricePool: number;
  matches: Match[];
  address?: AddressType;
};

export type MatchWeekSummary = {
  id: number;
  name: string;
  isEnabled: boolean;
  isClosed: boolean;
  stakeholdersCounter: number;
  pricePool: number;
  address?: AddressType;
  rewardsHasBeenSent: boolean;
};

export type Match = {
  id: number;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  result?: number;
};

export type Bet = {
  match: Match;
  result: number; // 0 -> 1, 1 -> X, 2 -> 2
};

export type MatchConsumer = {
  m: number;
  w?: number;
};

// This type only used in useMatches.
export type MatchContract = {
  id: number;
  localTeam: string;
  awayTeam: string;
  result: number;
};

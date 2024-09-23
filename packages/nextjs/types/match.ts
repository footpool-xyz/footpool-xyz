export type Match = {
  id: number;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
};

export type Bet = {
  matchId: number;
  result: number; // 0 -> 1, 1 -> X, 2 -> 2
};

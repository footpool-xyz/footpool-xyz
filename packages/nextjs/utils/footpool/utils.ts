export const displayMatchResultGivenId = (id: number) => {
  switch (id) {
    case 0:
      return "1";
    case 1:
      return "X";
    case 2:
      return "2";
  }
};

export const leagueIdToImageLeague = (leagueId: number) => {
  switch (leagueId) {
    case 140:
      return { source: "/leagues/laliga.png", alt: "La Liga" };

    case 39:
      return { source: "/leagues/premier.png", alt: "Premier League" };

    case 78:
      return { source: "/leagues/bundesliga.png", alt: "Bundesliga" };

    default:
      return { source: "/leagues/laliga.png", alt: "La Liga" };
  }
};

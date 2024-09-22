import BannerTitle from "../_components/BannerTitle";
import MatchWeekBet from "./_components/MatchWeekBet";
import type { NextPage } from "next";
import { Match } from "~~/types/match";

// Simulated data for matches
const matches: Match[] = [
  {
    homeTeam: "FC Barcelona",
    homeLogo: "/teams/Barcelona.png",
    awayTeam: "Real Madrid",
    awayLogo: "/teams/Real Madrid.png",
    id: 1,
  },
  {
    homeTeam: "Atletico Madrid",
    homeLogo: "/teams/Atletico Madrid.png",
    awayTeam: "Valencia CF",
    awayLogo: "/teams/Valencia.png",
    id: 2,
  },
  {
    homeTeam: "Sevilla FC",
    homeLogo: "/teams/Sevilla.png",
    awayTeam: "Villareal",
    awayLogo: "/teams/Villarreal.png",
    id: 3,
  },
];

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const MatchListPage: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <BannerTitle title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 mx-4">
        {matches.map(match => (
          <div className="col-span-1" key={match.id}>
            <MatchWeekBet match={match} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchListPage;

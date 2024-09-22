import BannerTitle from "../_components/BannerTitle";
import MatchBet from "./_components/MatchBet";
import type { NextPage } from "next";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
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
  {
    homeTeam: "Alaves",
    homeLogo: "/teams/Almeria.png",
    awayTeam: "Almeria CF",
    awayLogo: "/teams/Alaves.png",
    id: 4,
  },
];

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const MatchListPage: NextPage = () => {
  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex items-center flex-col pt-10 ">
        <div className="bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex items-center flex-col px-5">
            <h1 className="text-center my-0">
              <button className="btn btn-secondary text-xl text-center flex items-center justify-center">
                <PlusCircleIcon className="h-8 w-8" />
                Add matches
              </button>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center bg-base-300 mb-12">
        {matches.map(match => (
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-4" key={match.id}>
            <MatchBet match={match} />
          </div>
        ))}
      </div>
    </>
  );
};

export default MatchListPage;

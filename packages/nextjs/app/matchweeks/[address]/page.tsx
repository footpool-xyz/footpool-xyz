"use client";

import { useState } from "react";
import BannerTitle from "../_components/BannerTitle";
import MatchBet from "./_components/MatchBet";
import type { NextPage } from "next";
import { BanknotesIcon, CurrencyDollarIcon, PlusCircleIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { Bet, Match } from "~~/types/match";

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
  const [bets, setBets] = useState<Bet[]>([]);

  const handleBet = (bet: Bet) => {
    setBets(prev => ({
      ...prev,
      [bet.matchId]: bet,
    }));
    console.log(bets);
  };

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex flex-row flex-wrap justify-center pt-10 bg-base-300 w-full mt-16 px-8 py-12 gap-2">
        <button className="btn btn-secondary text-xl text-center">
          <PlusCircleIcon className="h-6 w-6" />
          Add matches
        </button>
        <button className="btn btn-secondary text-xl text-center">
          <RocketLaunchIcon className="h-6 w-6" />
          End Match Week
        </button>
        <button className="btn btn-secondary text-xl text-center">
          <BanknotesIcon className="h-6 w-6" />
          Withdraw
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center bg-base-300">
        {matches.map(match => (
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-4" key={match.id}>
            <MatchBet match={match} handleBet={handleBet} />
          </div>
        ))}
      </div>
      <div className="flex justify-center pt-10 bg-base-300 w-full px-8 py-12 gap-2">
        <button className="btn btn-secondary text-xl text-center">
          <CurrencyDollarIcon className="h-8 w-8" />
          Bet
        </button>
      </div>
    </>
  );
};

export default MatchListPage;

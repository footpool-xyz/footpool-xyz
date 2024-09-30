"use client";

import { useState } from "react";
import BetButton from "./BetButton";
import Team from "./Team";
import { Bet, Match } from "~~/types/match";

type MatchBetProps = {
  match: Match;
  handleBet: (bet: Bet) => void;
};

const MatchBet = ({ match, handleBet }: MatchBetProps) => {
  const [selectedBet, setSelectedBet] = useState<number>();

  return (
    <div
      key={match.id}
      className="flex flex-col bg-base-100 px-6 py-6 rounded-3xl items-center shadow-lg"
      style={{ minHeight: "200px", maxHeight: "300px" }}
    >
      <div className="flex justify-between items-center w-full mb-2">
        <div className="flex flex-col items-center">
          <Team name={match.homeTeam} logo={match.homeLogo} />
        </div>

        <div className="text-center font-semibold text-gray-500 text-xl">vs</div>

        <div className="flex flex-col items-center">
          <Team name={match.awayTeam} logo={match.awayLogo} />
        </div>
      </div>

      <div className="flex justify-center mt-2 gap-3 w-full">
        <BetButton
          match={match}
          result={0}
          selectedBet={selectedBet}
          handleBet={handleBet}
          setSelectedBet={setSelectedBet}
        >
          1
        </BetButton>
        <BetButton
          match={match}
          result={1}
          selectedBet={selectedBet}
          handleBet={handleBet}
          setSelectedBet={setSelectedBet}
        >
          X
        </BetButton>
        <BetButton
          match={match}
          result={2}
          selectedBet={selectedBet}
          handleBet={handleBet}
          setSelectedBet={setSelectedBet}
        >
          2
        </BetButton>
      </div>
    </div>
  );
};

export default MatchBet;

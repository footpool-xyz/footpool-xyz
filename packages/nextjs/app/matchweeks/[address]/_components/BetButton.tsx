import React, { ReactNode } from "react";
import { Bet, Match } from "~~/types/match";

interface BetButtonProps {
  match: Match;
  result: number;
  selectedBet: number | undefined;
  handleBet: (bet: Bet) => void;
  setSelectedBet: (bet: number) => void;
  children: ReactNode;
}

const BetButton: React.FC<BetButtonProps> = ({ match, result, selectedBet, handleBet, setSelectedBet, children }) => {
  return (
    <button
      onClick={() => {
        handleBet({ match, result });
        setSelectedBet(result);
      }}
      className={`btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow ${
        selectedBet === result ? "bg-green-500 text-white" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default BetButton;

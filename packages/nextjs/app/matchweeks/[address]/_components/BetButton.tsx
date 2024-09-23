import React, { ReactNode } from "react";

interface BetButtonProps {
  matchId: number;
  result: number;
  selectedBet: number | undefined;
  handleBet: (bet: { matchId: number; result: number }) => void;
  setSelectedBet: (bet: number) => void;
  children: ReactNode;
}

const BetButton: React.FC<BetButtonProps> = ({ matchId, result, selectedBet, handleBet, setSelectedBet, children }) => {
  return (
    <button
      onClick={() => {
        handleBet({ matchId, result });
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

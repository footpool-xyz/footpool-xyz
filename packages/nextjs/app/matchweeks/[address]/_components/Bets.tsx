import { MatchBet } from "../_components";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Bet, Match } from "~~/types/match";

type BetsProps = {
  matches: Match[];
  handleBet: (bet: Bet) => void;
  handleSubmitBet: () => void;
  betsLength: number;
};

export const Bets = ({ matches, handleBet, handleSubmitBet, betsLength }: BetsProps) => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center bg-base-300">
        {matches.map(match => (
          <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-4" key={match.id}>
            <MatchBet match={match} handleBet={handleBet} />
          </div>
        ))}
      </div>

      {matches.length > 0 && (
        <div className="flex justify-center pt-10 bg-base-300 w-full px-8 py-12 gap-2">
          <button
            onClick={handleSubmitBet}
            className="btn btn-secondary text-xl text-center"
            disabled={betsLength < matches.length}
          >
            <CurrencyDollarIcon className="h-8 w-8" />
            Bet
          </button>
        </div>
      )}
    </>
  );
};

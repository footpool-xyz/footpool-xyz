import { Bet } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type BetsSubmittedProps = {
  bets: Bet[];
};

export const BetsSubmitted = ({ bets }: BetsSubmittedProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-300">
      <p>Your bets have been submitted successfully! 😚</p>
      {bets.map((bet, i) => (
        <div key={i} className="text-center">
          <span>
            {bet.match.homeTeam} vs {bet.match.awayTeam}{" "}
          </span>{" "}
          - <span>Result: {displayMatchResultGivenId(bet.result)}</span>
        </div>
      ))}
    </div>
  );
};

import { Bet } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type BetsSubmittedProps = {
  bets: Bet[];
};

export const BetsSubmitted = ({ bets }: BetsSubmittedProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-300 p-4">
      <p className="mb-4">Your bets have been submitted successfully! 😚 Good luck!</p>

      <div className="flex w-full max-w-3xl justify-around items-center border-b-2 border-gray-300 py-2">
        <div className="w-2/6 text-center font-semibold">HomeTeam</div>
        <div className="w-1/12 text-center"></div>
        <div className="w-2/6 text-center font-semibold">AwayTeam</div>
        <div className="w-2/6 text-center font-semibold">Result</div>
      </div>

      {bets.map((bet, i) => (
        <div key={i} className="flex w-full max-w-3xl justify-around items-center py-1">
          <div className={`w-2/6 text-center ${bet.result === 0 ? "font-bold text-red-500" : ""}`}>
            {bet.match.homeTeam}
          </div>

          <div className="w-1/12 text-center">vs</div>

          <div className={`w-2/6 text-center ${bet.result === 2 ? "font-bold text-red-500" : ""}`}>
            {bet.match.awayTeam}
          </div>

          <div className="w-2/6 text-center">{displayMatchResultGivenId(bet.result)}</div>
        </div>
      ))}
    </div>
  );
};

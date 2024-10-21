import { Bet, Match } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type MatchResultsProps = {
  matches: Match[];
  bets?: Bet[];
};

export const MatchResults = ({ matches, bets }: MatchResultsProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-300 p-4">
      <p className="mb-4">These are the results of Match Week</p>

      <div className="flex w-full max-w-3xl justify-around items-center border-b-2 border-gray-300 py-2">
        <div className="w-2/6 text-center font-semibold">HomeTeam</div>
        <div className="w-1/12 text-center"></div>
        <div className="w-2/6 text-center font-semibold">AwayTeam</div>
        <div className="w-2/6 text-center font-semibold">Result</div>
        {bets && bets.length > 0 && <div className="w-2/6 text-center font-semibold">Your bets</div>}
      </div>

      {matches.map((match, i) => (
        <div key={match.id} className="flex w-full max-w-3xl justify-around items-center py-1">
          <div className={`w-2/6 text-center ${match.result === 0 ? "font-bold text-warning" : ""}`}>
            {match.homeTeam}
          </div>

          <div className="w-1/12 text-center">vs</div>

          <div className={`w-2/6 text-center ${match.result === 2 ? "font-bold text-warning" : ""}`}>
            {match.awayTeam}
          </div>

          {match.result && <div className="w-2/6 text-center">{displayMatchResultGivenId(match.result)}</div>}
          {bets && bets.length > 0 && (
            <div
              className={`w-2/6 text-center ${
                bets[i].result == match.result ? "font-bold text-success" : "font-bold text-error"
              }`}
            >
              {displayMatchResultGivenId(bets[i].result)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

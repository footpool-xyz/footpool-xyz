import { WinnersBanner } from "./WinnersBanner";
import { Bet, Match } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type MatchResultsProps = {
  matches: Match[];
  bets?: Bet[];
};

export const MatchResults = ({ matches, bets }: MatchResultsProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-300 p-4">
      <WinnersBanner />
      <h2 className="mb-4 text-xl font-bold">Results of Match Week</h2>

      <div className="flex w-full max-w-5xl justify-between items-center border-b-2 border-gray-300 py-2">
        <div className="flex-1 text-center font-semibold">HomeTeam</div>
        <div className="w-1/12 text-center"></div>
        <div className="flex-1 text-center font-semibold">AwayTeam</div>
        <div className="flex-1 text-center font-semibold">Result</div>
        {bets && bets.length > 0 && <div className="flex-1 text-center font-semibold">Your bets</div>}
      </div>

      {matches.map((match, i) => (
        <div key={match.id} className="flex w-full max-w-5xl justify-between items-center py-1">
          <div
            className={`flex-1 text-center ${match.result === 0 ? "font-bold text-warning" : ""}`}
            title={match.homeTeam}
          >
            {match.homeTeam}
          </div>

          <div className={`w-1/12 text-center ${match.result === 1 ? "font-bold text-warning" : ""}`}>
            {match.result === 1 ? "Draw" : "vs"}
          </div>

          <div
            className={`flex-1 text-center ${match.result === 2 ? "font-bold text-warning" : ""}`}
            title={match.awayTeam}
          >
            {match.awayTeam}
          </div>

          {match.result != undefined && (
            <div className="flex-1 text-center">{displayMatchResultGivenId(match.result)}</div>
          )}
          {bets && bets.length > 0 && (
            <div
              className={`flex-1 text-center ${
                bets[i].result === match.result ? "font-bold text-success" : "font-bold text-error"
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

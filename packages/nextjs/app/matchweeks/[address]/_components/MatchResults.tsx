import { Match } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type MatchResultsProps = {
  matches: Match[];
};

export const MatchResults = ({ matches }: MatchResultsProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-base-300 pb-4">
      <h2>These are the results of Match Week</h2>
      {matches.map(
        match =>
          match.result != undefined && (
            <div key={match.id} className="text-center">
              <span>
                {match.homeTeam} vs {match.awayTeam}
              </span>
              - <span>Result: {displayMatchResultGivenId(match.result)}</span>
            </div>
          ),
      )}
    </div>
  );
};

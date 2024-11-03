import { Bet } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

type BetsSubmittedProps = {
  bets: Bet[];
};

export const BetsSubmitted = ({ bets }: BetsSubmittedProps) => {
  return (
    <div className="flex flex-col items-center p-6 bg-base-200">
      <div className="w-full max-w-lg bg-base-100 p-4 rounded-lg shadow-md">
        <h3 className="text-center text-lg font-semibold text-base-content mb-4 border-b pb-2">Your Bets</h3>

        {bets.map((bet, i) => (
          <div key={i} className="my-4 p-4 rounded-lg shadow-md bg-base-200 border border-gray-400 relative">
            <div className="flex justify-between items-center">
              <div
                className={`w-1/3 text-center font-semibold p-2 rounded-lg 
                  ${bet.result === 0 ? "bg-info text-white shadow-md" : "text-base-content"}`}
              >
                {bet.match.homeTeam}
              </div>

              {bet.result === 1 ? (
                <div className="w-1/3 text-center text-sm font-bold bg-green-500 text-white p-2 rounded-lg shadow-md">
                  Draw
                </div>
              ) : (
                <div className="w-1/6 text-center text-base-content">vs</div>
              )}

              <div
                className={`w-1/3 text-center font-semibold p-2 rounded-lg 
                  ${bet.result === 2 ? "bg-green-500 text-white shadow-md" : "text-base-content"}`}
              >
                {bet.match.awayTeam}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold shadow-md  `}
                style={{ transform: "translateY(50%)" }}
              >
                {`Bet on: ${displayMatchResultGivenId(bet.result)}`}
              </span>
            </div>
          </div>
        ))}
        <div className="mt-6 text-center text-sm text-base-content">⚽ Good luck!</div>
      </div>
    </div>
  );
};

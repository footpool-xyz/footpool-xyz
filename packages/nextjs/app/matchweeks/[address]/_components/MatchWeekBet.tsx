import Image from "next/image";
import { Match } from "~~/types/match";

type MatchWeekBetProps = {
  match: Match;
};

const MatchWeekBet = ({ match }: MatchWeekBetProps) => {
  return (
    <div
      key={match.id}
      className="flex flex-col bg-base-100 px-6 py-6 rounded-3xl items-center shadow-lg"
      style={{ minHeight: "200px", maxHeight: "300px" }}
    >
      <div className="flex justify-between items-center w-full mb-2">
        <div className="flex flex-col items-center">
          <Image
            src={match.homeLogo}
            alt={`${match.homeTeam} logo`}
            width={60}
            height={60}
            className="w-12 h-12 object-cover mb-1"
          />
          <span className="font-bold text-lg">{match.homeTeam}</span>
        </div>

        <div className="text-center font-semibold text-gray-500 text-xl">vs</div>

        <div className="flex flex-col items-center">
          <Image
            src={match.awayLogo}
            alt={`${match.awayTeam} logo`}
            width={60}
            height={60}
            className="w-12 h-12 object-cover mb-1"
          />
          <span className="font-bold text-lg">{match.awayTeam}</span>
        </div>
      </div>

      <div className="flex justify-center mt-2 gap-3 w-full">
        <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">1</button>
        <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">X</button>
        <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">2</button>
      </div>
    </div>
  );
};

export default MatchWeekBet;

import Image from "next/image";
import BannerTitle from "../_components/BannerTitle";
import type { NextPage } from "next";

// Simulated data for matches
const matches = [
  {
    homeTeam: "FC Barcelona",
    homeLogo: "/teams/Barcelona.png",
    awayTeam: "Real Madrid",
    awayLogo: "/teams/Real Madrid.png",
    id: 1,
  },
  {
    homeTeam: "Atletico Madrid",
    homeLogo: "/teams/Atletico Madrid.png",
    awayTeam: "Valencia CF",
    awayLogo: "/teams/Valencia.png",
    id: 2,
  },
  {
    homeTeam: "Sevilla FC",
    homeLogo: "/teams/Sevilla.png",
    awayTeam: "Villareal",
    awayLogo: "/teams/Villarreal.png",
    id: 3,
  },
];

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const MatchListPage: NextPage = () => {
  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <BannerTitle title={title} subtitle={subtitle} />

      <div className="flex-grow bg-base-300 w-full mt-16 px-36 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 justify-center mx-36">
          {matches.map(match => (
            <div
              key={match.id}
              className="flex flex-col bg-base-100 px-6 py-6 rounded-3xl items-center shadow-lg"
              style={{ minHeight: "200px", maxHeight: "300px" }}
            >
              <div className="flex justify-between items-center w-full mb-2">
                <div className="flex flex-col items-center">
                  <Image src={match.homeLogo} alt={`${match.homeTeam} logo`} className="w-12 h-12 object-cover mb-1" />
                  <span className="font-bold text-lg">{match.homeTeam}</span>
                </div>

                <div className="text-center font-semibold text-gray-500 text-xl">vs</div>

                <div className="flex flex-col items-center">
                  <Image src={match.awayLogo} alt={`${match.awayTeam} logo`} className="w-12 h-12 object-cover mb-1" />
                  <span className="font-bold text-lg">{match.awayTeam}</span>
                </div>
              </div>

              <div className="flex justify-center mt-2 gap-3 w-full">
                <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">1</button>
                <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">X</button>
                <button className="btn btn-secondary font-bold py-2 px-6 rounded-xl flex-grow">2</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchListPage;

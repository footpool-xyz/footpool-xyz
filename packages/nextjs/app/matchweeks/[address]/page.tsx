"use client";

import BannerTitle from "../_components/BannerTitle";
import MatchBet from "./_components/MatchBet";
import { useAccount } from "wagmi";
import { BanknotesIcon, CurrencyDollarIcon, PlusCircleIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useBets, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { Bet } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const MatchListPage = ({ params }: { params: { address: string } }) => {
  const { address: connectedAddress } = useAccount();
  const { isOwner } = useOnlyOwner(connectedAddress, params.address, "MatchWeek");
  const { matches, addMatchesFromConsumer } = useMatches(params.address);
  const { addBet, submitBetsToContract, bets } = useBets(params.address, matches);

  const handleBet = (bet: Bet) => {
    addBet(bet);
  };

  const handleSubmitBet = async () => {
    submitBetsToContract();
  };

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      {isOwner && (
        <div className="flex flex-row flex-wrap justify-center pt-10 bg-base-300 w-full mt-16 px-8 py-12 gap-2">
          <button className="btn btn-secondary text-xl text-center" onClick={addMatchesFromConsumer}>
            <PlusCircleIcon className="h-6 w-6" />
            Add matches
          </button>
          <button className="btn btn-secondary text-xl text-center">
            <RocketLaunchIcon className="h-6 w-6" />
            End Match Week
          </button>
          <button className="btn btn-secondary text-xl text-center">
            <BanknotesIcon className="h-6 w-6" />
            Withdraw
          </button>
        </div>
      )}

      {bets.length > 0 ? (
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
                disabled={Object.keys(bets).length < matches.length}
              >
                <CurrencyDollarIcon className="h-8 w-8" />
                Bet
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center bg-base-300">
          <p>Your bets has been submitted successfully! 😚 </p>
          {Object.values(bets).map((bet, i) => (
            <div key={i} className="text-center">
              <span>
                {bet.match.homeTeam} vs {bet.match.awayTeam}{" "}
              </span>{" "}
              - <span>Result: {displayMatchResultGivenId(bet.result)}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MatchListPage;

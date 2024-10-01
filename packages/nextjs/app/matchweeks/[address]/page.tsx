"use client";

import BannerTitle from "../_components/BannerTitle";
import { ActionsButtons } from "./_components/ActionsButtons";
import { BetsSubmitted } from "./_components/BetsSubmitted";
import MatchBet from "./_components/MatchBet";
import { MatchResults } from "./_components/MatchResults";
import { useAccount } from "wagmi";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useBets, useMatchWeekData, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { Bet } from "~~/types/match";

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const fakeResults = [
  {
    matchId: 1038022,
    result: 1,
  },
  {
    matchId: 1038023,
    result: 0,
  },
  {
    matchId: 1038024,
    result: 0,
  },
  {
    matchId: 1038025,
    result: 0,
  },
  {
    matchId: 1038026,
    result: 1,
  },
  {
    matchId: 1038027,
    result: 2,
  },
  {
    matchId: 1038028,
    result: 2,
  },
  {
    matchId: 1038029,
    result: 0,
  },
  {
    matchId: 1038030,
    result: 0,
  },
  {
    matchId: 1038031,
    result: 1,
  },
];

const MatchListPage = ({ params }: { params: { address: string } }) => {
  const { matches, addMatchesFromConsumer, addResultsFromConsumer } = useMatches(params.address);
  const { addBet, submitBetsToContract, bets, betsSubmitted } = useBets(params.address, matches);
  const { matchWeek } = useMatchWeekData(params.address);

  const { address: connectedAddress } = useAccount();
  const { isOwner } = useOnlyOwner(connectedAddress, params.address, "MatchWeek");

  const handleBet = (bet: Bet) => {
    addBet(bet);
  };

  const handleSubmitBet = async () => {
    await submitBetsToContract();
  };

  const endMatchWeek = async () => {
    await addResultsFromConsumer(fakeResults);
  };

  const withdrawFunds = () => {
    //TODO: withdraw funds
  };

  const betsLength = Object.keys(bets).length;

  if (matchWeek?.isClosed) {
    return (
      <>
        <BannerTitle title={title} subtitle={subtitle} />
        {isOwner && (
          <ActionsButtons
            addMatches={addMatchesFromConsumer}
            endMatchWeek={endMatchWeek}
            withdrawFunds={withdrawFunds}
          />
        )}
        <MatchResults matches={matches} />
      </>
    );
  }

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />

      {isOwner && (
        <ActionsButtons addMatches={addMatchesFromConsumer} endMatchWeek={endMatchWeek} withdrawFunds={withdrawFunds} />
      )}

      {!betsSubmitted ? (
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
      ) : (
        <BetsSubmitted bets={Object.values(bets)} />
      )}
    </>
  );
};

export default MatchListPage;

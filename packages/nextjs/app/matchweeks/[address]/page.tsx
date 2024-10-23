"use client";

import BannerTitle from "../_components/BannerTitle";
import { ActionsButtons } from "./_components/ActionsButtons";
import { BetsSubmitted } from "./_components/BetsSubmitted";
import MatchBet from "./_components/MatchBet";
import { MatchResults } from "./_components/MatchResults";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useBets, useMatchWeekData, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { useConsumerContractName } from "~~/hooks/footpool/useConsumerContractName";
import { useWithdrawFunds } from "~~/hooks/footpool/useWithdrawFunds";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Bet } from "~~/types/match";

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

type ConsumerResultsType = {
  m: number;
  w: number;
};

const MatchListPage = ({ params }: { params: { address: string } }) => {
  const { matchWeek } = useMatchWeekData(params.address);
  const { matches, addMatchesFromConsumer, addResultsFromConsumer } = useMatches(params.address);
  const { addBet, submitBetsToContract, bets, betsSubmitted } = useBets(params.address, matches);
  const { consumerContractName } = useConsumerContractName();
  const { withdrawFunds } = useWithdrawFunds(params.address);
  // @ts-expect-error
  const { data: matchesWithResults } = useScaffoldReadContract({
    contractName: consumerContractName as any,
    functionName: "getResponse",
  });

  const { isOwner } = useOnlyOwner(params.address, "MatchWeek");

  const handleBet = (bet: Bet) => {
    addBet(bet);
  };

  const handleSubmitBet = async () => {
    await submitBetsToContract();
  };

  const handleEndMatchWeek = async () => {
    if (matchesWithResults == null) {
      console.error("No response from consumer");
      return;
    }
    const matchesWithResultsObject: ConsumerResultsType[] = JSON.parse(matchesWithResults);
    const matchesWithResultsReady = matchesWithResultsObject.map((matchWithResultObject: ConsumerResultsType) => {
      return {
        matchId: matchWithResultObject.m,
        result: matchWithResultObject.w,
      };
    });
    await addResultsFromConsumer(matchesWithResultsReady);
  };

  const handleWithdrawFunds = async () => {
    withdrawFunds();
  };

  const betsLength = Object.keys(bets).length;

  if (matchWeek?.rewardsHasBeenSent) {
    return (
      <>
        <BannerTitle title={title} subtitle={subtitle} />
        {isOwner && (
          <ActionsButtons
            addMatches={addMatchesFromConsumer}
            endMatchWeek={handleEndMatchWeek}
            withdrawFunds={handleWithdrawFunds}
          />
        )}

        <MatchResults matches={matches} bets={Object.values(bets)} />
      </>
    );
  }

  if (matchWeek?.isClosed) {
    return (
      <>
        <BannerTitle title={title} subtitle={subtitle} />
        {isOwner && (
          <ActionsButtons
            addMatches={addMatchesFromConsumer}
            endMatchWeek={handleEndMatchWeek}
            withdrawFunds={handleWithdrawFunds}
          />
        )}
        {isOwner && (
          <div className="flex flex-col justify-center items-center bg-base-300 p-4">
            <p className="mb-4">
              You owner! This is closed so whenever the match week ends, just click on &quot;End Match Week&quot; to add
              results and send rewards.
            </p>
          </div>
        )}
        {!isOwner && <BetsSubmitted bets={Object.values(bets)} />}
      </>
    );
  }

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />

      {isOwner && (
        <ActionsButtons
          addMatches={addMatchesFromConsumer}
          endMatchWeek={handleEndMatchWeek}
          withdrawFunds={handleWithdrawFunds}
        />
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

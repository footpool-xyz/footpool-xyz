"use client";

import { BannerTitle } from "./../_components";
import { ActionsButtons, Bets, BetsSubmitted, ClosedMatch, MatchResults } from "./_components";
import { useBets, useMatchWeekData, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { useConsumerContractName } from "~~/hooks/footpool/useConsumerContractName";
import { useWithdrawFunds } from "~~/hooks/footpool/useWithdrawFunds";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Bet } from "~~/types/match";

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

  /////////////////////////
  ////// Handle operations
  /////////////////////////
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

  const title = matchWeek?.name || "";

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
        {isOwner && <ClosedMatch />}
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
        <Bets
          matches={matches}
          handleBet={handleBet}
          handleSubmitBet={handleSubmitBet}
          betsLength={Object.keys(bets).length}
        />
      ) : (
        <BetsSubmitted bets={Object.values(bets)} />
      )}
    </>
  );
};

export default MatchListPage;

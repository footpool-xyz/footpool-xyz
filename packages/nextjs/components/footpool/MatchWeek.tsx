"use client";

import { ActionsButtons, BannerTitle, Bets, BetsSubmitted, ClosedMatch, MatchResults } from "~~/components/footpool";
import { useBets, useMatchWeekData, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { useConsumerContractName } from "~~/hooks/footpool/useConsumerContractName";
import { useWithdrawFunds } from "~~/hooks/footpool/useWithdrawFunds";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { Bet } from "~~/types/match";

const subtitle = "Choose your bet for each match";

type ConsumerResultsType = {
  m: number;
  w: number;
};

export const MatchWeek = () => {
  //////////////////////////
  ////// Global Store
  /////////////////////////
  const { selectedMatchWeek } = useGlobalState();

  //////////////////////////
  ////// Calls to contracts
  /////////////////////////
  const { matchWeek } = useMatchWeekData(selectedMatchWeek);
  const { matches, addMatchesFromConsumer, addResultsFromConsumer } = useMatches(selectedMatchWeek);
  const { addBet, submitBetsToContract, bets, betsSubmitted } = useBets(selectedMatchWeek, matches);
  const { consumerContractName } = useConsumerContractName();
  const { withdrawFunds } = useWithdrawFunds(selectedMatchWeek);
  // @ts-expect-error
  const { data: matchesWithResults } = useScaffoldReadContract({
    contractName: consumerContractName as any,
    functionName: "getResponse",
  });
  const { isOwner } = useOnlyOwner(selectedMatchWeek, "MatchWeek");

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

  //////////////////////////
  ////// Component
  /////////////////////////
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

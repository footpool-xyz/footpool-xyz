"use client";

import { ActionsButtons, Bets, BetsSubmitted, ClosedMatch, MatchResults } from "~~/components/footpool";
import { useBets, useMatchWeekData, useMatches, useOnlyOwner } from "~~/hooks/footpool";
import { useConsumerContractName } from "~~/hooks/footpool/useConsumerContractName";
import { useWithdrawFunds } from "~~/hooks/footpool/useWithdrawFunds";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { Bet } from "~~/types/match";

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
  // const title = matchWeek?.name || "";

  if (matchWeek?.rewardsHasBeenSent) {
    return (
      <>
        {isOwner && (
          <section>
            <ActionsButtons
              addMatches={addMatchesFromConsumer}
              endMatchWeek={handleEndMatchWeek}
              withdrawFunds={handleWithdrawFunds}
            />
          </section>
        )}

        <section>
          <MatchResults matches={matches} bets={Object.values(bets)} />
        </section>
      </>
    );
  }

  if (matchWeek?.isClosed) {
    return (
      <>
        {isOwner && (
          <section>
            <ActionsButtons
              addMatches={addMatchesFromConsumer}
              endMatchWeek={handleEndMatchWeek}
              withdrawFunds={handleWithdrawFunds}
            />
          </section>
        )}
        {isOwner && (
          <section>
            <ClosedMatch />
          </section>
        )}
        {!isOwner && (
          <section>
            <BetsSubmitted bets={Object.values(bets)} />
          </section>
        )}
      </>
    );
  }

  return (
    <>
      {isOwner && (
        <section>
          <ActionsButtons
            addMatches={addMatchesFromConsumer}
            endMatchWeek={handleEndMatchWeek}
            withdrawFunds={handleWithdrawFunds}
          />
        </section>
      )}

      {!betsSubmitted ? (
        <section>
          <Bets
            matches={matches}
            handleBet={handleBet}
            handleSubmitBet={handleSubmitBet}
            betsLength={Object.keys(bets).length}
          />
        </section>
      ) : (
        <section>
          <BetsSubmitted bets={Object.values(bets)} />
        </section>
      )}
    </>
  );
};

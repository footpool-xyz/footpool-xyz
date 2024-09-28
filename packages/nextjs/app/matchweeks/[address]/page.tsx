"use client";

import { useEffect, useState } from "react";
import BannerTitle from "../_components/BannerTitle";
import MatchBet from "./_components/MatchBet";
import { useReadContract, useWriteContract } from "wagmi";
import { BanknotesIcon, CurrencyDollarIcon, PlusCircleIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Bet, Match, MatchConsumer, MatchContract } from "~~/types/match";
import { displayMatchResultGivenId } from "~~/utils/footpool";

const title = "Match Week 1 - Season 2024/2025";
const subtitle = "Choose your bet for each match";

const fetchMatchesFromApi = async (matchesIds: MatchConsumer[]): Promise<Match[]> => {
  const matchesIdsJoined = matchesIds.map(match => match.m).join("-");
  const res = await fetch("https://v3.football.api-sports.io/fixtures?ids=" + matchesIdsJoined, {
    method: "GET",
    mode: "cors",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.FOOTBALL_API_KEY || "",
    },
  });

  const response = await res.json();

  return response.response.map((matchInfo: any) => {
    return {
      id: matchInfo.fixture.id,
      homeTeam: matchInfo.teams.home.name,
      homeLogo: `/teams/${matchInfo.teams.home.name}.png`,
      awayTeam: matchInfo.teams.away.name,
      awayLogo: `/teams/${matchInfo.teams.away.name}.png`,
    } as Match;
  });
};

const MatchListPage = ({ params }: { params: { address: string } }) => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [isBetSubmitted, setIsBetSubmitted] = useState<boolean>(false);
  const [matchesIds, setMatchesIds] = useState<MatchConsumer[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const { writeContract } = useWriteContract();
  const { data: matchesIdsFromContract } = useScaffoldReadContract({
    contractName: "MockMatchesDataConsumer",
    functionName: "getResponse",
  });
  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");
  const { data: matchesFromContract } = useReadContract({
    abi: deployedContractData?.abi,
    address: params.address,
    functionName: "getMatches",
  }) as {
    data: MatchContract[];
  };

  const storeMatchesInContract = (matchesFromApi: Match[]) => {
    const matchesToAddOnContract = matchesFromApi.map((match: any) => ({
      id: match.id,
      localTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      result: 3,
    }));

    if (deployedContractData) {
      const result = writeContract({
        abi: deployedContractData.abi,
        address: params.address,
        functionName: "addMatches",
        args: [matchesToAddOnContract],
      });
      console.log("Added matches to contract", result);
    }
  };

  const handleBet = (bet: Bet) => {
    setBets(prev => ({
      ...prev,
      [bet.matchId]: bet,
    }));
  };

  const handleSubmitBet = () => {
    setIsBetSubmitted(true);
  };

  const handleAddMatchesFromConsumer = async () => {
    if (matchesIds) {
      const matchesFromApi = await fetchMatchesFromApi(matchesIds);
      if (deployedContractData) {
        storeMatchesInContract(matchesFromApi);
      }
      setMatches(matchesFromApi);
    }
  };

  useEffect(() => {
    if (matchesIdsFromContract) {
      setMatchesIds(JSON.parse(matchesIdsFromContract));
    }
    if (matchesFromContract) {
      setMatches(
        matchesFromContract.map((match: any) => ({
          id: match.id,
          homeTeam: match.localTeam,
          homeLogo: `/teams/${match.localTeam}.png`,
          awayTeam: match.awayTeam,
          awayLogo: `/teams/${match.awayTeam}.png`,
        })),
      );
    }
  }, [matchesIdsFromContract, matchesFromContract]);

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex flex-row flex-wrap justify-center pt-10 bg-base-300 w-full mt-16 px-8 py-12 gap-2">
        <button className="btn btn-secondary text-xl text-center" onClick={handleAddMatchesFromConsumer}>
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

      {!isBetSubmitted ? (
        <>
          <div className="flex flex-wrap justify-center items-center bg-base-300">
            {matches.map(match => (
              <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 p-4" key={match.id}>
                <MatchBet match={match} handleBet={handleBet} />
              </div>
            ))}
          </div>
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
        </>
      ) : (
        <div className="flex flex-col justify-center items-center bg-base-300">
          <p>Your bets has been submitted successfully! 😚 </p>
          {Object.values(bets).map((bet, i) => (
            <div key={i} className="text-center">
              <span>MatchId: {bet.matchId}</span> - <span>Result: {displayMatchResultGivenId(bet.result)}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MatchListPage;

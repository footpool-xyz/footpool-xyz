import { useEffect, useState } from "react";
import { useConsumerContractName } from "./useConsumerContractName";
import { useWriteContract } from "wagmi";
import { useReadContract } from "wagmi";
import { useDeployedContractInfo, useScaffoldReadContract, useTransactor } from "~~/hooks/scaffold-eth";
import { Match, MatchConsumer, MatchContract } from "~~/types/match";

export const useMatches = (contractAddress: string) => {
  const [matchesIds, setMatchesIds] = useState<MatchConsumer[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const { writeContract, writeContractAsync } = useWriteContract();
  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");
  const { consumerContractName } = useConsumerContractName();
  const transactor = useTransactor();

  // @ts-expect-error
  const { data: matchesIdsFromContract } = useScaffoldReadContract({
    contractName: consumerContractName as any,
    functionName: "getResponse",
  });

  // Fetch matches from contract
  const { data: matchesFromContract } = useReadContract({
    abi: deployedContractData?.abi,
    address: contractAddress,
    functionName: "getMatches",
  }) as { data: MatchContract[] };

  const { data: leagueId } = useReadContract({
    abi: deployedContractData?.abi,
    address: contractAddress,
    functionName: "s_leagueId",
  });

  // Fetch matches from the API
  const fetchMatchesFromApi = async (): Promise<Match[]> => {
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

    return response.response.map((matchInfo: any) => ({
      id: matchInfo.fixture.id,
      homeTeam: matchInfo.teams.home.name,
      homeLogo: `/teams/${matchInfo.league.id}/${matchInfo.teams.home.name}.png`,
      awayTeam: matchInfo.teams.away.name,
      awayLogo: `/teams/${matchInfo.league.id}/${matchInfo.teams.away.name}.png`,
      leagueId: matchInfo.league.id,
    }));
  };

  // Store matches in the contract
  const storeMatchesInContract = (matchesFromApi: Match[]) => {
    const matchesToAddOnContract = matchesFromApi.map((match: any) => ({
      id: match.id,
      localTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      result: 3,
    }));

    if (deployedContractData) {
      writeContract({
        abi: deployedContractData.abi,
        address: contractAddress,
        functionName: "addMatches",
        args: [matchesToAddOnContract],
      });
    }
  };

  // Handler to fetch and store matches from the API
  const addMatchesFromConsumer = async () => {
    const matchesFromApi = await fetchMatchesFromApi();
    if (deployedContractData) {
      storeMatchesInContract(matchesFromApi);
      setMatches(matchesFromApi); // Update state with matches from API
    }
  };

  const addResultsFromConsumer = async (results: { matchId: number; result: number }[]) => {
    if (deployedContractData == undefined) {
      console.log("Error");
      return;
    }

    const writeContractAsyncWithParams = async () => {
      return await writeContractAsync({
        abi: deployedContractData.abi,
        address: contractAddress,
        functionName: "addResultsAndSendRewardsToWinners",
        args: [results],
      });
    };

    try {
      await transactor(writeContractAsyncWithParams, { blockConfirmations: 1 });
    } catch (err) {
      console.log(err);
    }
  };

  // Effect to update the matchesIds and matches state from the contract
  useEffect(() => {
    if (matchesIdsFromContract) {
      setMatchesIds(JSON.parse(matchesIdsFromContract));
    }
    if (matchesFromContract) {
      setMatches(
        matchesFromContract.map((match: MatchContract) => ({
          id: match.id,
          homeTeam: match.localTeam,
          homeLogo: `/teams/${Number(leagueId)}/${match.localTeam}.png`,
          awayTeam: match.awayTeam,
          awayLogo: `/teams/${Number(leagueId)}/${match.awayTeam}.png`,
          result: match.result,
          leagueId: Number(leagueId),
        })),
      );
    }
  }, [matchesIdsFromContract, matchesFromContract]);

  return {
    matches,
    addMatchesFromConsumer,
    addResultsFromConsumer,
  };
};

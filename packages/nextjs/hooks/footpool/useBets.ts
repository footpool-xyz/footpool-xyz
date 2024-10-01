import { useEffect, useState } from "react";
import { useDeployedContractInfo, useScaffoldWriteContract } from "../scaffold-eth";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { AddressType } from "~~/types/abitype/abi";
import { Bet, Match } from "~~/types/match";

export const useBets = (matchWeekContractAddress: AddressType, matches: Match[]) => {
  const [bets, setBets] = useState<Record<number, Bet>>({});
  const [betsSubmitted, setBetsSubmitted] = useState(false);

  const { writeContractAsync: writeUsdtAsync } = useScaffoldWriteContract("MockUsdtToken");
  const { data: mockUsdtContractData } = useDeployedContractInfo("MockUsdtToken");
  const { data: matchWeekContractData } = useDeployedContractInfo("MatchWeek");
  const { writeContract } = useWriteContract();
  const { address: connectedAddress } = useAccount();

  const addBet = (bet: Bet) => {
    setBets(prev => ({
      ...prev,
      [bet.match.id]: bet,
    }));
  };

  const submitBetsToContract = async () => {
    await writeUsdtAsync({
      functionName: "approve",
      args: [matchWeekContractAddress, BigInt(5 * 1e18)],
    });
    const betsToAddAtContract = Object.values(bets).map(bet => ({ matchId: bet.match.id, result: bet.result }));

    if (matchWeekContractData && mockUsdtContractData) {
      writeContract({
        abi: matchWeekContractData.abi,
        address: matchWeekContractAddress,
        functionName: "addBets",
        args: [betsToAddAtContract, mockUsdtContractData.address],
      });
      setBetsSubmitted(true);
    }
  };

  const result = useReadContract({
    abi: matchWeekContractData?.abi,
    address: matchWeekContractAddress,
    functionName: "getMyBets",
    args: [connectedAddress],
  });

  useEffect(() => {
    if (result.data && matches) {
      const myBets = result.data as { matchId: number; result: number }[];
      myBets.map(myBet => {
        const matchFound = matches.find(m => m.id === myBet.matchId);
        if (matchFound) {
          const bet: Bet = {
            match: matchFound,
            result: myBet.result,
          };
          setBets(prev => ({
            ...prev,
            [matchFound.id]: bet,
          }));
          setBetsSubmitted(true);
        }
      });
    }
  }, [result.isFetched, result.data, matches]);

  return { addBet, submitBetsToContract, bets, betsSubmitted };
};

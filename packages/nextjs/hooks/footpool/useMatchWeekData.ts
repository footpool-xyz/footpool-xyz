import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";
import { MatchWeekSummary } from "~~/types/matchWeek";

export const useMatchWeekData = (address: AddressType) => {
  const [matchWeek, setMatchWeek] = useState<MatchWeekSummary>();

  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");

  const { data: summary } = useReadContract({
    abi: deployedContractData?.abi,
    address: address,
    functionName: "summary",
  });

  const { data: amountToBet } = useReadContract({
    abi: deployedContractData?.abi,
    address: address,
    functionName: "AMOUNT_TO_BET",
  });

  const enable = () => {
    if (matchWeek) {
      setMatchWeek({ ...matchWeek, isEnabled: true });
    }
  };

  const close = () => {
    if (matchWeek) {
      setMatchWeek({ ...matchWeek, isClosed: true });
    }
  };

  useEffect(() => {
    if (Array.isArray(summary) && amountToBet) {
      const [name, isEnabled, isClosed, stakeholdersCounter, id, rewardsHasBeenSent, leagueId] = summary;
      const amountToBetPerStakeholder: number = Number(amountToBet) / 1e18;

      const matchWeekData: MatchWeekSummary = {
        id: id,
        name: name,
        leagueId: Number(leagueId),
        isEnabled,
        isClosed,
        stakeholdersCounter: Number(stakeholdersCounter),
        pricePool: amountToBetPerStakeholder * Number(stakeholdersCounter),
        address: address,
        rewardsHasBeenSent,
      };
      setMatchWeek(matchWeekData);
    }
  }, [summary, amountToBet, address]);

  return { matchWeek, enable, close };
};

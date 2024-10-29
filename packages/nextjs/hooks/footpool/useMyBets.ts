import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

export const useMyBets = (address: AddressType) => {
  const [hasBetAlready, setHasBetAlready] = useState(false);

  const account = useAccount();
  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");
  const { data: myBets } = useReadContract({
    abi: deployedContractData?.abi,
    address: address,
    functionName: "getMyBets",
    args: [account.address],
  }) as any;

  useEffect(() => {
    if (myBets && myBets.length > 0) {
      setHasBetAlready(true);
    }
  }, [myBets]);

  return { hasBetAlready };
};

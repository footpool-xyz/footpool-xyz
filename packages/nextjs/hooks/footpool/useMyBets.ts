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
    console.log(myBets);
    if (myBets && myBets.length > 0) {
      setHasBetAlready(true);
      console.log("aaaa");
    }
  }, [myBets]);

  return { hasBetAlready };
};

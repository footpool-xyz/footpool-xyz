import { useWriteContract } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

export const useWithdrawFunds = (contractAddress: AddressType) => {
  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");
  const { writeContract } = useWriteContract();

  const withdrawFunds = () => {
    if (deployedContractData) {
      try {
        writeContract({
          abi: deployedContractData.abi,
          address: contractAddress,
          functionName: "withdrawFunds",
        });
      } catch (e) {
        console.error("Error setting greeting:", e);
      }
    }
  };

  return { withdrawFunds };
};

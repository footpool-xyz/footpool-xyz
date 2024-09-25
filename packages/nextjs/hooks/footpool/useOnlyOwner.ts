import { useEffect, useState } from "react";
import { useDeployedContractInfo } from "../scaffold-eth";
import { useReadContract } from "wagmi";
import { AddressType } from "~~/types/abitype/abi";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const useOnlyOwner = (userAddress: AddressType, contractAddress: AddressType, contractName: ContractName) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const { data: owner, isLoading: isOwnerLoading } = useReadContract({
    abi: deployedContractData?.abi,
    address: contractAddress,
    functionName: "owner",
  });

  useEffect(() => {
    if (!isOwnerLoading) {
      setIsOwner(userAddress === owner);
    }
  }, [userAddress, owner, isOwnerLoading]);

  return { isOwner, isOwnerLoading };
};

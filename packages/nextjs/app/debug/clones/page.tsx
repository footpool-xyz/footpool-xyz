"use client";

import { useEffect, useMemo } from "react";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { ContractUI } from "~~/app/debug/_components/contract";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const selectedContractStorageKey = "scaffoldEth2.selectedContractClone";

const DebugClones: NextPage = () => {
  const { data: contractsData = [] } = useScaffoldReadContract({
    contractName: "MatchWeekFactory",
    functionName: "getMatchWeeks",
  });

  const deployedContracts: `0x${string}`[] = useMemo(
    () => contractsData.map(contract => contract as `0x${string}`),
    [contractsData],
  );

  const [selectedContract, setSelectedContract] = useLocalStorage<`0x${string}`>(
    selectedContractStorageKey,
    deployedContracts[0] || "",
    { initializeWithValue: false },
  );

  useEffect(() => {
    if (deployedContracts.length > 0 && !deployedContracts.includes(selectedContract)) {
      setSelectedContract(deployedContracts[0]);
    }
  }, [deployedContracts, selectedContract, setSelectedContract]);

  if (deployedContracts.length === 0) {
    return <p className="text-3xl mt-14">No contracts found!</p>;
  }

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      {deployedContracts.length > 1 && (
        <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
          {deployedContracts.map(contractAddress => (
            <button
              className={`btn btn-secondary btn-sm font-light hover:border-transparent ${
                contractAddress === selectedContract
                  ? "bg-base-300 hover:bg-base-300 no-animation"
                  : "bg-base-100 hover:bg-secondary"
              }`}
              key={contractAddress}
              onClick={() => setSelectedContract(contractAddress)}
            >
              {contractAddress}
            </button>
          ))}
        </div>
      )}
      {deployedContracts.map(contractAddress => (
        <ContractUI
          key={contractAddress}
          contractName={"MatchWeek"}
          contractAddress={contractAddress}
          className={contractAddress === selectedContract ? "" : "hidden"}
        />
      ))}
    </div>
  );
};

export default DebugClones;

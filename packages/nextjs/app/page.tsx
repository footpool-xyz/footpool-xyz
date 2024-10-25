"use client";

import { useEffect, useState } from "react";
import { AddMatchWeek, BannerTitle, MatchWeekCard } from "./matchweeks/_components";
import type { NextPage } from "next";
import { useOnlyOwner } from "~~/hooks/footpool";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

const title = "On going Match Weeks";
const subtitle = "Compete with Footpool users to find the best bettor and win cash prizes.";
const FootPoolContractName = "FootPool";

const MatchWeeksPage: NextPage = () => {
  const [matchWeeksAddresses, setMatchWeeksAddresses] = useState<AddressType[]>([]);

  const { data: matchWeeksAddressesFromContract } = useScaffoldReadContract({
    contractName: FootPoolContractName,
    functionName: "getMatchWeeks",
  });
  const { writeContractAsync: writeFactoryContract } = useScaffoldWriteContract(FootPoolContractName);
  const { data: footPoolContractData } = useDeployedContractInfo(FootPoolContractName);
  const { isOwner } = useOnlyOwner(footPoolContractData?.address || "", FootPoolContractName);

  const storeMatchWeekInContract = async (name: string) => {
    try {
      const newMatchWeekAddress = await writeFactoryContract({
        functionName: "createMatchWeek",
        args: [name],
      });
      if (newMatchWeekAddress) {
        setMatchWeeksAddresses(prevAddresses => [newMatchWeekAddress, ...prevAddresses]);
      }
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  const handleAddMatchWeek = async (name: string) => {
    if (name == "") {
      console.log("Add a valid name");
      return;
    }

    await storeMatchWeekInContract(name);
  };

  useEffect(() => {
    if (Array.isArray(matchWeeksAddressesFromContract)) {
      setMatchWeeksAddresses(matchWeeksAddressesFromContract);
    }
  }, [matchWeeksAddressesFromContract]);

  const matchWeekCards =
    matchWeeksAddresses.length > 0 ? (
      matchWeeksAddresses
        .slice()
        .reverse()
        .map(matchWeekAddress => (
          <MatchWeekCard key={matchWeekAddress} matchWeekAddr={matchWeekAddress} season="Season 2024/2025" />
        ))
    ) : (
      <div className="flex flex-col justify-center items-center bg-base-300 p-4">
        <p className="mb-4">No Match Weeks available</p>
      </div>
    );

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          {isOwner && <AddMatchWeek handleAddMatchWeek={handleAddMatchWeek} />}
          {matchWeekCards}
        </div>
      </div>
    </>
  );
};

export default MatchWeeksPage;

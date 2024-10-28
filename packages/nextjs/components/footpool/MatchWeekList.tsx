import { useEffect, useState } from "react";
import { AddMatchWeek, BannerTitle } from "~~/components/footpool";
import { MatchWeekCard } from "~~/components/footpool";
import { useOnlyOwner } from "~~/hooks/footpool";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { AddressType } from "~~/types/abitype/abi";

const title = "On going Match Weeks";
const subtitle = "Compete with Footpool users to find the best bettor and win cash prizes.";
const FootPoolContractName = "FootPool";

export const MatchWeekList = () => {
  //////////////////////////
  ////// State
  /////////////////////////
  const [matchWeeksAddresses, setMatchWeeksAddresses] = useState<AddressType[]>([]);
  const { selectMatchWeek } = useGlobalState();

  //////////////////////////
  ////// Calls to contracts
  /////////////////////////
  const { data: matchWeeksAddressesFromContract } = useScaffoldReadContract({
    contractName: FootPoolContractName,
    functionName: "getMatchWeeks",
  });
  const { data: footPoolContractData } = useDeployedContractInfo(FootPoolContractName);
  const { isOwner } = useOnlyOwner(footPoolContractData?.address || "", FootPoolContractName);
  const { writeContractAsync: writeFactoryContract } = useScaffoldWriteContract(FootPoolContractName);

  //////////////////////////
  ////// Effects
  /////////////////////////
  useEffect(() => {
    if (Array.isArray(matchWeeksAddressesFromContract)) {
      setMatchWeeksAddresses(matchWeeksAddressesFromContract);
    }
  }, [matchWeeksAddressesFromContract]);

  //////////////////////////
  ////// Handling with contracts
  /////////////////////////
  const saveCreatedMatchWeekInContract = async (name: string, leagueId: number) => {
    try {
      const newMatchWeekAddress = await writeFactoryContract({
        functionName: "createMatchWeek",
        args: [name, BigInt(leagueId)],
      });
      if (newMatchWeekAddress) {
        setMatchWeeksAddresses(prevAddresses => [newMatchWeekAddress, ...prevAddresses]);
      }
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  const handleAddMatchWeek = async (name: string, leagueId: number) => {
    if (name == "" || leagueId == 0) {
      console.error("Add a valid name and league");
      return;
    }

    await saveCreatedMatchWeekInContract(name, leagueId);
  };

  //////////////////////////
  ////// Component
  /////////////////////////
  const matchWeekCards =
    matchWeeksAddresses.length > 0 ? (
      matchWeeksAddresses
        .slice()
        .reverse()
        .map(matchWeekAddress => (
          <MatchWeekCard
            key={matchWeekAddress}
            matchWeekAddr={matchWeekAddress}
            season="Season 2024/2025"
            click={() => selectMatchWeek(matchWeekAddress)}
          />
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

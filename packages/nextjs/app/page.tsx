"use client";

import { useEffect, useState } from "react";
import AddMatchWeek from "./matchweeks/_components/AddMatchWeek";
import BannerTitle from "./matchweeks/_components/BannerTitle";
import MatchWeekCard from "./matchweeks/_components/MatchWeekCard";
import type { NextPage } from "next";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";

const title = "On going Match Weeks";
const subtitle = "Compete with Footpool users to find the best bettor and win cash prizes.";

const MatchWeeksPage: NextPage = () => {
  const [matchWeeksAddresses, setMatchWeeksAddresses] = useState<AddressType[]>([]);

  const { data: matchWeeksAddressesFromContract } = useScaffoldReadContract({
    contractName: "MatchWeekFactory",
    functionName: "getMatchWeeks",
  });

  useEffect(() => {
    if (Array.isArray(matchWeeksAddressesFromContract)) {
      console.log(matchWeeksAddressesFromContract);
      setMatchWeeksAddresses(matchWeeksAddressesFromContract);
    }
  }, [matchWeeksAddressesFromContract]);

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <AddMatchWeek />
          {matchWeeksAddresses.map(matchWeekAddress => (
            <MatchWeekCard key={matchWeekAddress} matchWeekAddr={matchWeekAddress} season="Season 2024/2025" />
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchWeeksPage;

"use client";

import { useEffect } from "react";
import AddMatchWeek from "./matchweeks/_components/AddMatchWeek";
import BannerTitle from "./matchweeks/_components/BannerTitle";
import MatchWeekCard from "./matchweeks/_components/MatchWeekCard";
import type { NextPage } from "next";
import { useScaffoldEventHistory, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useMatchWeekState } from "~~/services/store/matchWeek";
import { AddressType } from "~~/types/abitype/abi";
import { MatchWeek } from "~~/types/matchWeek";

const title = "On going Match Weeks";
const subtitle = "Compete with Footpool users to find the best bettor and win cash prizes.";

const MatchWeeksPage: NextPage = () => {
  const { matchWeeks, setMatchWeeks, updateMatchWeek } = useMatchWeekState();
  const { writeContractAsync: writeMatchWeekFactoryAsync } = useScaffoldWriteContract("MatchWeekFactory");

  const { data: events, isLoading: isLoadingEvents } = useScaffoldEventHistory({
    contractName: "MatchWeekFactory",
    eventName: "MatchWeekCreated",
    fromBlock: 0n,
    watch: true,
    blockData: true,
    transactionData: true,
    receiptData: true,
  });

  useEffect(() => {
    if (!isLoadingEvents && events) {
      const matchWeeksFromEvents: MatchWeek[] = events.map(event => {
        // TODO: Retrieve contract info by id to get latest data.
        // Hay un bug. Siempre machaca esta inicialización. Habrá que pasarlo a zustand.
        return {
          id: Number(event.args.id),
          name: event.args.name as string,
          address: event.args.addr as AddressType,
          isEnabled: false,
          isClosed: false,
          stakeholdersCounter: 0,
          pricePool: 0,
          matches: [],
        };
      });

      setMatchWeeks(matchWeeksFromEvents);
    }
  }, [events, isLoadingEvents, setMatchWeeks]);

  const handleEnable = async (matchWeek: MatchWeek) => {
    try {
      await writeMatchWeekFactoryAsync({
        functionName: "enableMatchWeekById",
        args: [BigInt(matchWeek.id)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
    updateMatchWeek({ ...matchWeek, isEnabled: true });
  };

  const handleClose = async (matchWeek: MatchWeek) => {
    try {
      await writeMatchWeekFactoryAsync({
        functionName: "closeMatchWeekById",
        args: [BigInt(matchWeek.id)],
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
    updateMatchWeek({ ...matchWeek, isClosed: true });
  };

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <AddMatchWeek />
          {matchWeeks.map(matchWeek => (
            <MatchWeekCard
              key={matchWeek.id}
              matchWeek={matchWeek}
              season="Season 2024/2025"
              handleEnable={handleEnable}
              handleClose={handleClose}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchWeeksPage;

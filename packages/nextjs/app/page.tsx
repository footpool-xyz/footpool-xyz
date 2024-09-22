import BannerTitle from "./matchweeks/_components/BannerTitle";
import MatchWeekCard from "./matchweeks/_components/MatchWeekCard";
import type { NextPage } from "next";

const MatchWeeksPage: NextPage = () => {
  const title = "On going Match Weeks";
  const subtitle = "Compete with Footpool users to find the best bettor and win cash prizes.";

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <BannerTitle title={title} subtitle={subtitle} />

      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <MatchWeekCard title="MatchWeek 1" season="Season 2024/2025" stakeholdersCount={350} amountIn={15000} />
        <MatchWeekCard title="MatchWeek 2" season="Season 2024/2025" stakeholdersCount={200} amountIn={1000} />
      </div>
    </div>
  );
};

export default MatchWeeksPage;

"use client";

import type { NextPage } from "next";
import { BannerTitle, MatchWeek, MatchWeekList } from "~~/components/footpool";
import { useGlobalState } from "~~/services/store/store";

const MatchWeeksPage: NextPage = () => {
  const { selectedMatchWeek } = useGlobalState();

  if (selectedMatchWeek) {
    return <MatchWeek />;
  }

  return (
    <>
      <section>
        <BannerTitle
          title="On going Match Weeks"
          subtitle="Compete with Footpool users to find the best bettor and win cash prizes."
        />
      </section>
      <section>
        <MatchWeekList />
      </section>
    </>
  );
};

export default MatchWeeksPage;

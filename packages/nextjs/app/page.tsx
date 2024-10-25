"use client";

import type { NextPage } from "next";
import { MatchWeek } from "~~/components/footpool";
import { MatchWeekList } from "~~/components/footpool/MatchWeekList";
import { useGlobalState } from "~~/services/store/store";

const MatchWeeksPage: NextPage = () => {
  const { selectedMatchWeek } = useGlobalState();

  return <>{selectedMatchWeek ? <MatchWeek /> : <MatchWeekList />}</>;
};

export default MatchWeeksPage;

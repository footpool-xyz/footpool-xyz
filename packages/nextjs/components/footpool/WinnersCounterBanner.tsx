import { WinningMessage } from "./WinningMessage";
import { useAccount } from "wagmi";
import { TrophyIcon } from "@heroicons/react/24/outline";
import { useWinners } from "~~/hooks/footpool";
import { useGlobalState } from "~~/services/store/store";

export const WinnersCounterBanner = () => {
  const { selectedMatchWeek } = useGlobalState();
  const connectedUser = useAccount();

  const { events: winners } = useWinners(selectedMatchWeek as `0x${string}`, "MatchWeek");

  const isUserWinner = winners.find(winner => winner.to === connectedUser.address);
  console.log(isUserWinner);
  return (
    <>
      {isUserWinner && <WinningMessage amount={Number(isUserWinner.reward)} />}
      <div className="flex justify-between bg-secondary py-2 px-4 rounded-md text-black mb-4 font-semibold">
        <TrophyIcon title="Trophy" width={20} height={20} />
        <span>Winners: {winners.length}</span>
      </div>
    </>
  );
};

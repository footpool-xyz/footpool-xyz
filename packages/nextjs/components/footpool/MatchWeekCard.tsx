import Image from "next/image";
import { TrophyIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { useMatchWeekData, useMyBets, useOnlyOwner, useWinners } from "~~/hooks/footpool";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";
import { MatchWeekSummary } from "~~/types/matchWeek";
import { leagueIdToImageLeague } from "~~/utils/footpool";

type MatchWeekCardProps = {
  matchWeekAddr: AddressType;
  season: string;
  click: (address: string) => void;
};

export const MatchWeekCard = ({ matchWeekAddr, season, click }: MatchWeekCardProps) => {
  const { enable, close, matchWeek } = useMatchWeekData(matchWeekAddr);
  const { isOwner, isOwnerLoading } = useOnlyOwner(matchWeekAddr || "", "FootPool");
  const { writeContractAsync: writeMatchWeekFactoryAsync } = useScaffoldWriteContract("FootPool");
  const { hasBetAlready } = useMyBets(matchWeekAddr);
  const { events: winners } = useWinners(matchWeekAddr as `0x${string}`, "MatchWeek");

  const handleEnable = async (matchWeek: MatchWeekSummary) => {
    try {
      await writeMatchWeekFactoryAsync({
        functionName: "enableMatchWeekById",
        args: [BigInt(matchWeek.id)],
      });
      enable();
    } catch (e) {
      console.error("Error enabling match week:", e);
    }
  };

  const handleClose = async (matchWeek: MatchWeekSummary) => {
    try {
      await writeMatchWeekFactoryAsync({
        functionName: "closeMatchWeekById",
        args: [BigInt(matchWeek.id)],
      });
      close();
    } catch (e) {
      console.error("Error closing match week:", e);
    }
  };

  if (!matchWeek) {
    return (
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-5">
        <div className="flex flex-col sm:flex-row bg-base-100 px-10 py-10 max-w-4xl rounded-3xl">
          <h4>Loading data...</h4>
        </div>
      </div>
    );
  }

  let buttonTextDisplay = "View Details";
  let isEnabled = false;
  if (matchWeek.rewardsHasBeenSent) {
    buttonTextDisplay = "View results";
    isEnabled = true;
  } else if (!matchWeek.isEnabled) {
    buttonTextDisplay = "Coming soon";
  } else if (matchWeek.isEnabled && !matchWeek.isClosed) {
    buttonTextDisplay = "View Details";
    isEnabled = true;
  } else if (matchWeek.isEnabled && matchWeek.isClosed && hasBetAlready) {
    buttonTextDisplay = "View My Bets";
    isEnabled = true;
  }
  if (isOwner) {
    buttonTextDisplay = "View Details";
    isEnabled = true;
  }

  const { source, alt } = leagueIdToImageLeague(matchWeek.leagueId);

  return (
    <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-5">
      <div className="flex flex-col sm:flex-row bg-base-100 px-10 py-10 max-w-4xl rounded-3xl">
        <div className="flex items-center justify-center">
          <Image src={source} alt={alt} className="w-32 h-32 object-cover rounded-xl" width={150} height={150} />
        </div>

        <div className="flex flex-col justify-center text-center sm:text-left sm:ml-10">
          <h2 className="text-2xl font-bold">{matchWeek.name}</h2>
          <p className="text-pretty text-sm mt-0">{season}</p>
          <div className="flex items-center justify-center sm:justify-start mt-2">
            {matchWeek.isClosed && !matchWeek.rewardsHasBeenSent && (
              <span className="ml-3 bg-error text-xs font-bold px-2 py-1 rounded-full">Bets Closed</span>
            )}
            {!matchWeek.isClosed && matchWeek.isEnabled && !matchWeek.rewardsHasBeenSent && (
              <span className="ml-3 bg-success text-xs font-bold px-2 py-1 rounded-full">Open for Bets</span>
            )}
            {hasBetAlready && !matchWeek.rewardsHasBeenSent && (
              <span className="ml-3 bg-[#f59e0b] text-xs font-bold px-2 py-1 rounded-full">Active Bet</span>
            )}
            {matchWeek.rewardsHasBeenSent && (
              <span className="ml-3 bg-error text-xs font-bold px-2 py-1 rounded-full">Completed</span>
            )}
          </div>
          <div className="flex items-center justify-center sm:justify-start mt-2">
            <UserGroupIcon className="w-6 h-6 text-gray-500 mr-2" />
            <p>
              Currently, <span className="font-bold">{matchWeek.stakeholdersCounter}</span> stakeholders.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between sm:ml-10 mt-6 sm:mt-0">
          <div className="flex items-center mb-4">
            <div>
              {!matchWeek.rewardsHasBeenSent ? (
                <>
                  <p className="font-semibold m-0">Amount in play:</p>
                  <p className="text-xl flex font-bold m-0">
                    {matchWeek.pricePool}
                    <Image src="/tokens/usdt.png" className="ml-2" width={28} height={28} alt="USDT image" />
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold m-0">Winners:</p>
                  <p className="text-xl flex font-bold m-0">
                    {winners.length}
                    <TrophyIcon className="h-7 w-7" />
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className={`btn btn-primary font-bold py-2 px-4 rounded-xl ${isEnabled ? "" : "btn-disabled"}`}
              onClick={() => click(matchWeek.address || "")}
            >
              {buttonTextDisplay}
            </button>
          </div>

          {isOwner && !isOwnerLoading && (
            <div className="flex justify-center mt-2">
              <button
                disabled={matchWeek.isEnabled}
                className="btn btn-success btn-xs rounded-xl"
                onClick={() => handleEnable(matchWeek)}
              >
                Enable
              </button>
              <button
                disabled={matchWeek.isClosed}
                className="btn btn-error btn-xs rounded-xl"
                onClick={() => handleClose(matchWeek)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

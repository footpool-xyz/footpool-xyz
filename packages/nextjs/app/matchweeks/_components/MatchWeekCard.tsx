import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useOnlyOwner } from "~~/hooks/footpool";
import { useMatchWeekData } from "~~/hooks/footpool";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { AddressType } from "~~/types/abitype/abi";
import { MatchWeekSummary } from "~~/types/matchWeek";

type MatchWeekCardProps = {
  matchWeekAddr: AddressType;
  season: string;
};

const MatchWeekCard = ({ matchWeekAddr, season }: MatchWeekCardProps) => {
  const { enable, close, matchWeek } = useMatchWeekData(matchWeekAddr);

  const { address: connectedAddress } = useAccount();
  const { isOwner, isOwnerLoading } = useOnlyOwner(connectedAddress || "", matchWeekAddr || "", "FootPool");
  const { writeContractAsync: writeMatchWeekFactoryAsync } = useScaffoldWriteContract("FootPool");

  const handleEnable = async (matchWeek: MatchWeekSummary) => {
    try {
      await writeMatchWeekFactoryAsync({
        functionName: "enableMatchWeekById",
        args: [BigInt(matchWeek.id)],
      });
      enable();
    } catch (e) {
      console.error("Error setting greeting:", e);
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
      console.error("Error setting greeting:", e);
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

  let buttonTextDisplay = "";
  if (matchWeek.isEnabled && !matchWeek.isClosed) {
    buttonTextDisplay = "Bet now!";
  } else if (matchWeek.isEnabled && matchWeek.isClosed) {
    buttonTextDisplay = "See your bets!";
  } else if (!matchWeek.isEnabled && isOwner) {
    buttonTextDisplay = "Configure";
  } else if (!matchWeek.isEnabled) {
    buttonTextDisplay = "Coming soon...";
  }

  return (
    <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-5">
      <div className="flex flex-col sm:flex-row bg-base-100 px-10 py-10 max-w-4xl rounded-3xl">
        <div className="flex items-center justify-center">
          <Image
            src="/laliga.png"
            alt="Liga Española"
            className="w-32 h-32 object-cover rounded-xl"
            width={150}
            height={150}
          />
        </div>

        <div className="flex flex-col justify-center text-center sm:text-left sm:ml-10">
          <h2 className="text-2xl font-bold">{matchWeek.name}</h2>
          <p className="text-pretty text-sm mt-0">{season}</p>
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
              <p className="font-semibold m-0">Amount in play:</p>
              <p className="text-xl flex font-bold m-0">
                {matchWeek.pricePool}
                <Image src="/usdt.png" className="ml-2" width={28} height={28} alt="USDT image" />
              </p>
            </div>
          </div>

          {isOwner ? (
            <div className="flex justify-center">
              <Link
                className={`btn btn-primary font-bold py-2 px-4 rounded-xl ${
                  !matchWeek.isEnabled && !isOwner ? "btn-disabled" : ""
                }`}
                href={"/matchweeks/" + matchWeek.address}
              >
                Go in
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Link
                className={`btn btn-primary font-bold py-2 px-4 rounded-xl ${
                  !matchWeek.isEnabled && !isOwner ? "btn-disabled" : ""
                }`}
                href={"/matchweeks/" + matchWeek.address}
              >
                {buttonTextDisplay}
              </Link>
            </div>
          )}

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

export default MatchWeekCard;

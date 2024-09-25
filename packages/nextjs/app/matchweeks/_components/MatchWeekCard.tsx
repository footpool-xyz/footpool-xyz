import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { useOnlyOwner } from "~~/hooks/footpool";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useMatchWeekState } from "~~/services/store/matchWeek";
import { MatchWeek } from "~~/types/matchWeek";

type MatchWeekCardProps = {
  matchWeek: MatchWeek;
  season: string;
  handleEnable: (id: number) => void;
  handleClose: (id: number) => void;
};

const MatchWeekCard = ({ matchWeek, season, handleEnable, handleClose }: MatchWeekCardProps) => {
  const { address: connectedAddress } = useAccount();
  const { isOwner, isOwnerLoading } = useOnlyOwner(connectedAddress || "", matchWeek.address || "", "MatchWeekFactory");
  const { updateMatchWeek } = useMatchWeekState();

  const { data: deployedContractData } = useDeployedContractInfo("MatchWeek");

  const { data: summary, isLoading: isSummaryLoading } = useReadContract({
    abi: deployedContractData?.abi,
    address: matchWeek.address,
    functionName: "summary",
  });

  useEffect(() => {
    if (!isSummaryLoading && Array.isArray(summary)) {
      const [name, isEnabled, isClosed, stakeholdersCounter] = summary;

      const updatedMatchWeek: MatchWeek = {
        ...matchWeek, // Propiedades existentes del objeto original
        name, // Actualiza el campo 'name' con el nuevo título
        isEnabled, // Actualiza 'isEnabled'
        isClosed, // Actualiza 'isClosed'
        stakeholdersCounter, // Actualiza 'stakeholdersCounter'
      };

      updateMatchWeek(updatedMatchWeek);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary, isSummaryLoading]);

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
                {matchWeek.pricePool.toLocaleString()}
                <Image src="/usdt.png" className="ml-2" width={28} height={28} alt="USDT image" />
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              className={`btn btn-primary font-bold py-2 px-4 rounded-xl ${!matchWeek.isEnabled ? "btn-disabled" : ""}`}
              href={"/matchweeks/" + matchWeek.address}
            >
              {matchWeek.isEnabled ? "Bet now!!" : "Coming soon..."}
            </Link>
          </div>
          {isOwner && !isOwnerLoading && (
            <div className="flex justify-center mt-2">
              <button
                disabled={matchWeek.isEnabled}
                className="btn btn-success btn-xs rounded-xl"
                onClick={() => handleEnable(matchWeek.id)}
              >
                Enable
              </button>
              <button
                disabled={matchWeek.isClosed}
                className="btn btn-error btn-xs rounded-xl"
                onClick={() => handleClose(matchWeek.id)}
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

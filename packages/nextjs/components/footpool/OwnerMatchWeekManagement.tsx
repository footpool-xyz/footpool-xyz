import { BanknotesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { OwnerAddMatches } from "~~/components/footpool";

interface OwnerMatchWeekManagementProps {
  addMatches: () => void;
  endMatchWeek: () => void;
  withdrawFunds: () => void;
}

export const OwnerMatchWeekManagement = ({
  addMatches,
  endMatchWeek,
  withdrawFunds,
}: OwnerMatchWeekManagementProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center pt-10 bg-base-300 w-full mt-16 px-8 py-12 gap-2">
      <OwnerAddMatches handleAddMatchWeek={addMatches} />
      <button className="btn btn-secondary text-xl text-center" onClick={endMatchWeek}>
        <RocketLaunchIcon className="h-6 w-6" />
        End Match Week
      </button>
      <button className="btn btn-secondary text-xl text-center" onClick={withdrawFunds}>
        <BanknotesIcon className="h-6 w-6" />
        Withdraw
      </button>
    </div>
  );
};

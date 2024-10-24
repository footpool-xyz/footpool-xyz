import AddMatches from "./AddMatches";
import { BanknotesIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

interface ActionsButtonsProps {
  addMatches: () => void;
  endMatchWeek: () => void;
  withdrawFunds: () => void;
}

export const ActionsButtons = ({ addMatches, endMatchWeek, withdrawFunds }: ActionsButtonsProps) => {
  return (
    <div className="flex flex-row flex-wrap justify-center pt-10 bg-base-300 w-full mt-16 px-8 py-12 gap-2">
      <AddMatches handleAddMatchWeek={addMatches} />
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

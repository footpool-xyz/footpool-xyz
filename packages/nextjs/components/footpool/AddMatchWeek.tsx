import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";

type AddMatchWeekProps = {
  handleAddMatchWeek: (name: string, leagueId: number) => void;
};

export const AddMatchWeek = ({ handleAddMatchWeek }: AddMatchWeekProps) => {
  const [name, setName] = useState("");
  const [leagueId, setLeagueId] = useState(0);

  return (
    <div>
      {/* Modal trigger */}
      <div className="flex items-center flex-col flex-grow px-5">
        <h1 className="text-center">
          <label
            htmlFor="add-match-week-modal"
            className="btn btn-secondary text-xl mb-2 text-center flex items-center justify-center"
          >
            <PlusCircleIcon className="h-8 w-8" />
            Add MatchWeek
          </label>
        </h1>
      </div>

      {/* Modal  */}
      <input type="checkbox" id="add-match-week-modal" className="modal-toggle" />
      <label htmlFor="add-match-week-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">Add Match Week</h3>
          <label htmlFor="add-match-week-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-600">Match Week Name</label>
              <InputBase value={name} onChange={newName => setName(newName)} />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold text-gray-600">League</label>
              <select
                value={leagueId}
                onChange={e => setLeagueId(parseInt(e.target.value))}
                className="flex items-center h-[2.2rem] min-h-[2.2rem] px-4 border-2 border-base-300 bg-base-200 rounded-full text-gray-400 font-medium placeholder:text-accent/50 focus-within:border-transparent focus:bg-transparent focus:text-gray-400 w-full"
              >
                <option value={0} disabled>
                  Select League
                </option>
                <option value={39}>Premier League</option>
                <option value={140}>La Liga</option>
                <option value={78}>Bundesliga</option>
              </select>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  handleAddMatchWeek(name, leagueId);
                  setName("");
                  setLeagueId(0);
                  const checkbox = document.getElementById("add-match-week-modal") as HTMLInputElement;
                  if (checkbox) {
                    checkbox.checked = false;
                  }
                }}
                className="h-10 btn btn-primary btn-sm px-2 rounded-full"
              >
                <span>Create</span>
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

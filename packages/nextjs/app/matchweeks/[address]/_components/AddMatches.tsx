"use client";

import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";

type AddMatchesProps = {
  handleAddMatchWeek: (round: number, season: string) => void;
};

const AddMatches = ({ handleAddMatchWeek }: AddMatchesProps) => {
  const [round, setRound] = useState<number | undefined>();
  const [season, setSeason] = useState<string | undefined>();

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
            Add Matches
          </label>
        </h1>
      </div>

      {/* Modal  */}
      <input type="checkbox" id="add-match-week-modal" className="modal-toggle" />
      <label htmlFor="add-match-week-modal" className="modal cursor-pointer">
        <label className="modal-box relative">
          <input className="h-0 w-0 absolute top-0 left-0" />
          <h3 className="text-xl font-bold mb-3">Add Matches From Consumer</h3>
          <label htmlFor="add-match-week-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
            ✕
          </label>
          <div className="space-y-3">
            <div className="flex space-x-4">
              <div>
                <InputBase value={round} onChange={newRound => setRound(newRound)} placeholder="Round" />
              </div>
            </div>
            <div className="flex space-x-4">
              <div>
                <InputBase value={season} onChange={season => setSeason(season)} placeholder="Season" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  if (round && season) {
                    handleAddMatchWeek(round, season);
                    setRound(undefined);
                    const checkbox = document.getElementById("add-match-week-modal") as HTMLInputElement;
                    if (checkbox) {
                      checkbox.checked = false;
                    }
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

export default AddMatches;

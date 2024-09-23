"use client";

import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { InputBase } from "~~/components/scaffold-eth";
import { useMatchWeekState } from "~~/services/store/matchWeek";

const AddMatchWeek = () => {
  const [name, setName] = useState("");
  const { addMatchWeek } = useMatchWeekState();

  const handleAddMatchWeek = () => {
    if (name == "") {
      console.log("Add a valid name");
      return;
    }

    addMatchWeek(name);
    setName("");
    const checkbox = document.getElementById("add-match-week-modal") as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

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
          <div className="space-y-3">
            <div className="flex space-x-4">
              <div>
                <InputBase value={name} onChange={newName => setName(newName)} placeholder="Match Week Name" />
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button onClick={handleAddMatchWeek} className="h-10 btn btn-primary btn-sm px-2 rounded-full">
                <span>Create</span>
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  );
};

export default AddMatchWeek;

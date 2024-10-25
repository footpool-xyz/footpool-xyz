"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { BannerTitle } from "~~/components/footpool";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const title = "Faucet";
const subtitle = "Mint some USDT to bet on FootPool";

const Faucet: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [destAddress, setDestinationAddress] = useState("");
  const { writeContractAsync: writeUsdtTokenAsync } = useScaffoldWriteContract("MockUsdtToken");

  const mintUsdt = async () => {
    try {
      setLoading(true);
      await writeUsdtTokenAsync({
        functionName: "mint",
        args: [destAddress],
      });
    } catch (e) {
      console.error("Error minting USDT:", e);
    }
    setLoading(false);
  };

  return (
    <>
      <BannerTitle title={title} subtitle={subtitle} />
      <div className="flex justify-center items-center mt-16">
        <div className="bg-base-100 w-full max-w-md mx-auto px-8 py-12 rounded-lg shadow-lg">
          <p className="text-center mb-4">Mint USDT</p>
          <div className="flex flex-col space-y-4">
            <AddressInput
              placeholder="Destination Address"
              value={destAddress}
              onChange={value => setDestinationAddress(value)}
            />
            <button
              className="h-10 btn btn-primary btn-sm px-2 rounded-full flex items-center justify-center"
              onClick={mintUsdt}
              disabled={loading}
            >
              {!loading ? (
                <BanknotesIcon className="h-6 w-6 mr-2" />
              ) : (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              <span>Mint</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faucet;

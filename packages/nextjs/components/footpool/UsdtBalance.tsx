"use client";

import Link from "next/link";
import { Address, formatUnits } from "viem";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";

type UsdtBalanceProps = {
  address: Address;
};

export const UsdtBalance = ({ address }: UsdtBalanceProps) => {
  const { data: usdtTokenData } = useDeployedContractInfo("MockUsdtToken");

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
    token: usdtTokenData?.address,
  });

  if (!address || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-md px-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatUnits(balance.value, 18)) : 0;

  return (
    <div className="flex flex-col items-center mr-1">
      <div className="w-full flex items-center justify-center">
        <span>{formattedBalance.toFixed(2)}</span>
        <span className="text-[0.8em] font-bold ml-1">USDT</span>
      </div>
      {balance && balance.value == BigInt(0) && (
        <Link href={"/faucet"}>
          <div className="relative inline-block">
            <span className="relative inline-flex items-center justify-center px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
              Grab funds to bet
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

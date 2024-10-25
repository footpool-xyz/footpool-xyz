import { useAccount } from "wagmi";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type BetButtonProps = {
  handleSubmitBet: () => void;
  betsLength: number;
  matchesLength: number;
};

export const BetButton = ({ handleSubmitBet, betsLength, matchesLength }: BetButtonProps) => {
  const account = useAccount();
  const { data: balanceOf } = useScaffoldReadContract({
    contractName: "MockUsdtToken",
    functionName: "balanceOf",
    args: [account?.address],
  });

  let disabledButton = betsLength < matchesLength;
  let betButtonMessageErr = "";

  if (!balanceOf) {
    disabledButton = true;
    betButtonMessageErr = "Not enough balance of USDT";
  }

  if (disabledButton) {
    betButtonMessageErr = "Place a bet for all matches";
  }

  return (
    <>
      <button onClick={handleSubmitBet} className="btn btn-secondary text-xl text-center" disabled={disabledButton}>
        <CurrencyDollarIcon className="h-8 w-8" />
        Bet
      </button>
      {disabledButton && <p className="text-error text-sm text-center mt-2">{betButtonMessageErr}</p>}
    </>
  );
};

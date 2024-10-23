import { useTargetNetwork } from "~~/hooks/scaffold-eth";

export const useConsumerContractName = () => {
  const { targetNetwork } = useTargetNetwork();

  const consumerContractName = targetNetwork.name == "Foundry" ? "MockMatchesDataConsumer" : "MatchesDataConsumer";

  return { consumerContractName };
};

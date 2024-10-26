import { useEffect, useState } from "react";
import { useDeployedContractInfo } from "../scaffold-eth";
import { Log, decodeEventLog, formatUnits, parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { ContractName } from "~~/utils/scaffold-eth/contract";

interface RewardSendedEvent {
  to: string;
  reward: string;
}

export function useWinners(contractAddress: `0x${string}`, contractName: ContractName, fromBlock = BigInt(0)) {
  const [events, setEvents] = useState<RewardSendedEvent[]>([]);
  const publicClient = usePublicClient();

  const { data: deployedContractData } = useDeployedContractInfo(contractName);
  const isContractAddressAndClientReady = deployedContractData && publicClient;

  useEffect(() => {
    const fetchEvents = async () => {
      if (isContractAddressAndClientReady) {
        try {
          const fetchedEvents = await publicClient.getLogs({
            address: contractAddress,
            event: parseAbiItem("event RewardSended(address indexed to, uint256 reward)"),
            fromBlock,
            toBlock: "latest",
          });

          const decodedEvents = fetchedEvents.map((log: Log) => {
            const { args } = decodeEventLog({
              abi: deployedContractData.abi,
              data: log.data,
              topics: log.topics,
              eventName: "RewardSended",
            });
            console.log(BigInt(args.reward).toString());
            return {
              to: args.to,
              reward: formatUnits(args.reward, 18),
            } as RewardSendedEvent;
          });

          setEvents(decodedEvents);
        } catch (error) {
          console.error("Error fetching RewardSended events:", error);
        }
      }
    };

    fetchEvents();
  }, [contractAddress, fromBlock, publicClient, isContractAddressAndClientReady]);

  return { events };
}

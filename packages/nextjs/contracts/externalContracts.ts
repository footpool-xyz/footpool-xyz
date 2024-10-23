import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  11155420: {
    MatchesDataConsumer: {
      address: "0x7a9828a639d0F54E21b0229Ac40c65317E8516E2",
      abi: [
        {
          inputs: [{ internalType: "address", name: "router", type: "address" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], name: "EmptyArgs", type: "error" },
        { inputs: [], name: "EmptySecrets", type: "error" },
        { inputs: [], name: "EmptySource", type: "error" },
        { inputs: [], name: "NoInlineSecrets", type: "error" },
        { inputs: [], name: "OnlyRouterCanFulfill", type: "error" },
        {
          inputs: [{ internalType: "bytes32", name: "requestId", type: "bytes32" }],
          name: "UnexpectedRequestID",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
          ],
          name: "OwnershipTransferRequested",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, internalType: "bytes32", name: "id", type: "bytes32" }],
          name: "RequestFulfilled",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, internalType: "bytes32", name: "id", type: "bytes32" }],
          name: "RequestSent",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, internalType: "bytes32", name: "requestId", type: "bytes32" },
            { indexed: false, internalType: "bytes", name: "response", type: "bytes" },
            { indexed: false, internalType: "bytes", name: "err", type: "bytes" },
          ],
          name: "Response",
          type: "event",
        },
        { inputs: [], name: "acceptOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
        {
          inputs: [],
          name: "getResponse",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "bytes32", name: "requestId", type: "bytes32" },
            { internalType: "bytes", name: "response", type: "bytes" },
            { internalType: "bytes", name: "err", type: "bytes" },
          ],
          name: "handleOracleFulfillment",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastError",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastRequestId",
          outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "s_lastResponse",
          outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "string", name: "source", type: "string" },
            { internalType: "bytes", name: "encryptedSecretsUrls", type: "bytes" },
            { internalType: "uint8", name: "donHostedSecretsSlotID", type: "uint8" },
            { internalType: "uint64", name: "donHostedSecretsVersion", type: "uint64" },
            { internalType: "string[]", name: "args", type: "string[]" },
            { internalType: "bytes[]", name: "bytesArgs", type: "bytes[]" },
            { internalType: "uint64", name: "subscriptionId", type: "uint64" },
            { internalType: "uint32", name: "gasLimit", type: "uint32" },
            { internalType: "bytes32", name: "jobId", type: "bytes32" },
          ],
          name: "sendRequest",
          outputs: [{ internalType: "bytes32", name: "requestId", type: "bytes32" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "address", name: "to", type: "address" }],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;

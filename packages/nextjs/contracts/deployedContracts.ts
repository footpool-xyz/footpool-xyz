/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    MatchWeek: {
      address: "0x90bb87c6258ad0d309d2f3a263d3bc7b0b9f522d",
      abi: [
        {
          type: "function",
          name: "AMOUNT_TO_BET",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "addBets",
          inputs: [
            {
              name: "bets",
              type: "tuple[]",
              internalType: "struct MatchWeek.Bet[]",
              components: [
                {
                  name: "matchId",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
            {
              name: "paymentTokenAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "addMatches",
          inputs: [
            {
              name: "matchesToAdd",
              type: "tuple[]",
              internalType: "struct MatchWeek.Match[]",
              components: [
                {
                  name: "id",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "localTeam",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "awayTeam",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "addResults",
          inputs: [
            {
              name: "results",
              type: "tuple[]",
              internalType: "struct MatchWeek.MatchResult[]",
              components: [
                {
                  name: "matchId",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "close",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enable",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getMatches",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct MatchWeek.Match[]",
              components: [
                {
                  name: "id",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "localTeam",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "awayTeam",
                  type: "string",
                  internalType: "string",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getMyBets",
          inputs: [
            {
              name: "user",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "tuple[]",
              internalType: "struct MatchWeek.Bet[]",
              components: [
                {
                  name: "matchId",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getResults",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "initialize",
          inputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "_title",
              type: "string",
              internalType: "string",
            },
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "consumer",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "refundToStakeholders",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "s_id",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_isClosed",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_isEnabled",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_matches",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "id",
              type: "uint32",
              internalType: "uint32",
            },
            {
              name: "localTeam",
              type: "string",
              internalType: "string",
            },
            {
              name: "awayTeam",
              type: "string",
              internalType: "string",
            },
            {
              name: "result",
              type: "uint8",
              internalType: "enum MatchWeek.Result",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_title",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "summary",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "title",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "withdrawFunds",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "BetAdded",
          inputs: [
            {
              name: "sender",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "bets",
              type: "tuple[]",
              indexed: false,
              internalType: "struct MatchWeek.Bet[]",
              components: [
                {
                  name: "matchId",
                  type: "uint32",
                  internalType: "uint32",
                },
                {
                  name: "result",
                  type: "uint8",
                  internalType: "enum MatchWeek.Result",
                },
              ],
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "EnabledMatchWeek",
          inputs: [
            {
              name: "id",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Initialized",
          inputs: [
            {
              name: "version",
              type: "uint64",
              indexed: false,
              internalType: "uint64",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "MatchAdded",
          inputs: [
            {
              name: "id",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RefundSent",
          inputs: [
            {
              name: "to",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "refunded",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RewardSended",
          inputs: [
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "reward",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "InvalidInitialization",
          inputs: [],
        },
        {
          type: "error",
          name: "MatchWeek_NotClosedYet",
          inputs: [],
        },
        {
          type: "error",
          name: "MatchWeek__AlreadyClosed",
          inputs: [],
        },
        {
          type: "error",
          name: "MatchWeek__NotEnoughTokenAllowance",
          inputs: [],
        },
        {
          type: "error",
          name: "MatchWeek__OnlyFactoryOrOwnerAllowed",
          inputs: [],
        },
        {
          type: "error",
          name: "NotInitializing",
          inputs: [],
        },
        {
          type: "error",
          name: "OwnableInvalidOwner",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OwnableUnauthorizedAccount",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      inheritedFunctions: {
        owner: "lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol",
        renounceOwnership: "lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol",
        transferOwnership: "lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol",
      },
    },
    MockUsdtToken: {
      address: "0x38381d63418ff752dba93ee018e36a6814388fa7",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "uint8",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mint",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            {
              name: "from",
              type: "address",
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "bool",
              internalType: "bool",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            {
              name: "owner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "spender",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "value",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ERC20InsufficientAllowance",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
            {
              name: "allowance",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InsufficientBalance",
          inputs: [
            {
              name: "sender",
              type: "address",
              internalType: "address",
            },
            {
              name: "balance",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "needed",
              type: "uint256",
              internalType: "uint256",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidApprover",
          inputs: [
            {
              name: "approver",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidReceiver",
          inputs: [
            {
              name: "receiver",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidSender",
          inputs: [
            {
              name: "sender",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "ERC20InvalidSpender",
          inputs: [
            {
              name: "spender",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      inheritedFunctions: {
        allowance: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        approve: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        balanceOf: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        decimals: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        name: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        symbol: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        totalSupply: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        transfer: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
        transferFrom: "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol",
      },
    },
    MockMatchesDataConsumer: {
      address: "0x45b0bbaceedcfbae96aec2d2ffef70777b0b3ae3",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "RANDOM_ROUTER",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "acceptOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getResponse",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "handleOracleFulfillment",
          inputs: [
            {
              name: "requestId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "response",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "err",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastError",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastRequestId",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastResponse",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "sendRequest",
          inputs: [
            {
              name: "source",
              type: "string",
              internalType: "string",
            },
            {
              name: "encryptedSecretsUrls",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "donHostedSecretsSlotID",
              type: "uint8",
              internalType: "uint8",
            },
            {
              name: "donHostedSecretsVersion",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "args",
              type: "string[]",
              internalType: "string[]",
            },
            {
              name: "bytesArgs",
              type: "bytes[]",
              internalType: "bytes[]",
            },
            {
              name: "subscriptionId",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "gasLimit",
              type: "uint32",
              internalType: "uint32",
            },
            {
              name: "jobId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "requestId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setResponse",
          inputs: [
            {
              name: "_data",
              type: "string",
              internalType: "string",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "OwnershipTransferRequested",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestFulfilled",
          inputs: [
            {
              name: "id",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestSent",
          inputs: [
            {
              name: "id",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Response",
          inputs: [
            {
              name: "requestId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
            {
              name: "response",
              type: "bytes",
              indexed: false,
              internalType: "bytes",
            },
            {
              name: "err",
              type: "bytes",
              indexed: false,
              internalType: "bytes",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "EmptyArgs",
          inputs: [],
        },
        {
          type: "error",
          name: "EmptySecrets",
          inputs: [],
        },
        {
          type: "error",
          name: "EmptySource",
          inputs: [],
        },
        {
          type: "error",
          name: "NoInlineSecrets",
          inputs: [],
        },
        {
          type: "error",
          name: "OnlyRouterCanFulfill",
          inputs: [],
        },
        {
          type: "error",
          name: "UnexpectedRequestID",
          inputs: [
            {
              name: "requestId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
        },
      ],
      inheritedFunctions: {
        acceptOwnership: "contracts/FunctionsConsumer.sol",
        getResponse: "contracts/FunctionsConsumer.sol",
        handleOracleFulfillment: "contracts/FunctionsConsumer.sol",
        owner: "contracts/FunctionsConsumer.sol",
        s_lastError: "contracts/FunctionsConsumer.sol",
        s_lastRequestId: "contracts/FunctionsConsumer.sol",
        s_lastResponse: "contracts/FunctionsConsumer.sol",
        sendRequest: "contracts/FunctionsConsumer.sol",
        transferOwnership: "contracts/FunctionsConsumer.sol",
      },
    },
    MatchWeekFactory: {
      address: "0x67f65b834aaac92c15c2eba9ff7e81f2d33a1cfd",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "initialOwner",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "closeMatchWeekById",
          inputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createMatchWeek",
          inputs: [
            {
              name: "name",
              type: "string",
              internalType: "string",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MatchWeek",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "enableMatchWeekById",
          inputs: [
            {
              name: "id",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getMatchWeeks",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address[]",
              internalType: "contract MatchWeek[]",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "s_matchWeeks",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract MatchWeek",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "setConsumerAddress",
          inputs: [
            {
              name: "consumerAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setMatchWeekAddress",
          inputs: [
            {
              name: "matchWeekAddress",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "ConsumerAddressChanged",
          inputs: [
            {
              name: "consumerAddr",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "MatchWeekClonableAddressChanged",
          inputs: [
            {
              name: "cloneAddr",
              type: "address",
              indexed: false,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "MatchWeekClosed",
          inputs: [
            {
              name: "id",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "MatchWeekCreated",
          inputs: [
            {
              name: "id",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
            {
              name: "addr",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "name",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "MatchWeekEnabled",
          inputs: [
            {
              name: "id",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ERC1167FailedCreateClone",
          inputs: [],
        },
        {
          type: "error",
          name: "OwnableInvalidOwner",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OwnableUnauthorizedAccount",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      inheritedFunctions: {
        owner: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        renounceOwnership: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        transferOwnership: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;

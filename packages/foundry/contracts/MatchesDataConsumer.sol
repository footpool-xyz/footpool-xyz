// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.19;

// import { FunctionsClient } from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
// import { ConfirmedOwner } from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./MatchWeek.sol";

// contract MatchDataConsumer is FunctionsClient, Ownable {
//     using FunctionsRequest for FunctionsRequest.Request;

//     MatchWeek private matchWeekContract;

//     bytes32 public latestRequestId;
//     bytes public latestResponse;
//     bytes public latestError;

//     event RequestSent(bytes32 indexed requestId);
//     event RequestFulfilled(bytes32 indexed requestId, bytes result, bytes err);

//     constructor(address oracle, address _matchWeekContract) FunctionsClient(oracle) {
//         matchWeekContract = MatchWeek(_matchWeekContract);
//     }

//     /// @notice Request match data from an API using Chainlink Functions
//     function requestMatchData(
//         string memory apiUrl
//     ) public onlyOwner {
//         // Create a new Functions Request
//         FunctionsRequest.Request memory req;
//         req.initializeRequestForInlineJavaScript(
//             string(
//                 abi.encodePacked(
//                     "const url = '",
//                     apiUrl,
//                     "';",
//                     "const fetch = require('node-fetch');",
//                     "fetch(url)" ".then(response => response.json())" ".then(data => {",
//                     "  const matches = data.matches;", // Assuming the API returns an array of matches
//                     "  const result = matches.map(match => [",
//                     "    match.homeTeam,",
//                     "    match.awayTeam,",
//                     "    match.homeScore,",
//                     "    match.awayScore,",
//                     "    match.timestamp",
//                     "  ]);",
//                     "  return Functions.encodeUint256Array(result.flat());",
//                     "})"
//                 )
//             )
//         );

//         // Send the request to the Chainlink oracle
//         bytes32 requestId = _sendRequest(req, 0.1 ether); // fee example: 0.1 LINK
//         latestRequestId = requestId;
//         emit RequestSent(requestId);
//     }

//     /// @notice Callback function that will handle the response from Chainlink Functions
//     function fulfillRequest(
//         bytes32 requestId,
//         bytes memory response,
//         bytes memory error
//     ) internal override {
//         latestResponse = response;
//         latestError = error;

//         if (error.length > 0) {
//             emit RequestFulfilled(requestId, response, error);
//         } else {
//             emit RequestFulfilled(requestId, response, "");

//             // Decode the response (which should be an array of match data)
//             uint256[] memory decodedData = abi.decode(response, (uint256[]));

//             // Iterate through decoded data and add matches to the MatchWeek contract
//             for (uint256 i = 0; i < decodedData.length; i += 5) {
//                 string memory homeTeam = string(abi.encodePacked(decodedData[i]));
//                 string memory awayTeam = string(abi.encodePacked(decodedData[i + 1]));
//                 uint256 homeScore = decodedData[i + 2];
//                 uint256 awayScore = decodedData[i + 3];
//                 uint256 timestamp = decodedData[i + 4];

//                 // Call the MatchWeek contract to store the match
//                 matchWeekContract.addMatch(homeTeam, awayTeam, homeScore, awayScore, timestamp);
//             }
//         }
//     }

//     /// @notice Withdraw any remaining LINK tokens from the contract
//     function withdrawLink() public onlyOwner {
//         LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
//         require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
//     }
// }

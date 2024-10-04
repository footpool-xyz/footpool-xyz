//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { FootPool } from "../contracts/FootPool.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { MatchesDataConsumer } from "../contracts/MatchesDataConsumer.sol";

contract DeployDataConsumer is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner returns (address) {
        return _deployMatchesDataConsumer();
    }

    function _deployMatchesDataConsumer() private returns (address) {
        string memory fakeMatches = vm.readFile("./matches/fakeMatches.json");
        MockMatchesDataConsumer matchesDataConsumer = new MockMatchesDataConsumer();
        matchesDataConsumer.setResponse(fakeMatches);
        console.logString(
            string.concat(
                "MockMatchesDataConsumer deployed at: ", vm.toString(address(matchesDataConsumer))
            )
        );

        return address(matchesDataConsumer);
    }
}

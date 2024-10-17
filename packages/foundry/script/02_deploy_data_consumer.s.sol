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
        if (getChain().chainId == 11155420) {
            return _deployMatchesDataConsumer();
        }
        return _deployFakeMatchesDataConsumer();
    }

    function _deployFakeMatchesDataConsumer() private returns (address) {
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

    function _deployMatchesDataConsumer() private returns (address) {
        MatchesDataConsumer matchesDataConsumer =
            new MatchesDataConsumer(0xC17094E3A1348E5C7544D4fF8A36c28f2C6AAE28);
        console.logString(
            string.concat(
                "MatchesDataConsumer deployed at: ", vm.toString(address(matchesDataConsumer))
            )
        );

        return address(matchesDataConsumer);
    }
}

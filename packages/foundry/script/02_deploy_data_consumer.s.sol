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
        string memory fakeMatches = vm.readFile("./matches/fakeBundesligaMatches.json");
        MockMatchesDataConsumer matchesDataConsumer = new MockMatchesDataConsumer();
        matchesDataConsumer.setResponse(fakeMatches);
        console.logString(
            string.concat(
                "MockMatchesDataConsumer deployed at: ", vm.toString(address(matchesDataConsumer))
            )
        );

        return address(matchesDataConsumer);
    }

    function _deployMatchesDataConsumer() private view returns (address) {
        MatchesDataConsumer matchesDataConsumer =
            MatchesDataConsumer(0x7a9828a639d0F54E21b0229Ac40c65317E8516E2);
        console.logString(
            string.concat(
                "MatchesDataConsumer deployed at: ", vm.toString(address(matchesDataConsumer))
            )
        );

        return address(matchesDataConsumer);
    }
}

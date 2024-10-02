//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { MatchWeekFactory } from "../contracts/MatchWeekFactory.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { FunctionsConsumer } from "../contracts/FunctionsConsumer.sol";

contract DeployClonableMatchWeek is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner returns (address) {
        return _deployMatchWeek();
    }

    function _deployMatchWeek() private returns (address) {
        MatchWeek matchWeek = new MatchWeek();
        console.logString(string.concat("MatchWeek deployed at: ", vm.toString(address(matchWeek))));

        return address(matchWeek);
    }
}

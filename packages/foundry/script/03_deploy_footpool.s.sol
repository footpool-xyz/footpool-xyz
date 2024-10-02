//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { MatchWeekFactory } from "../contracts/MatchWeekFactory.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { FunctionsConsumer } from "../contracts/FunctionsConsumer.sol";

contract DeployFootPool is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run(
        address matchWeekAddr,
        address matchesDataConsumerAddr
    ) external ScaffoldEthDeployerRunner {
        _deployMatchWeekFactory(matchWeekAddr, matchesDataConsumerAddr);
    }

    function _deployMatchWeekFactory(
        address matchWeekAddress,
        address matchesDataConsumerAddress
    ) private {
        MatchWeekFactory factory = new MatchWeekFactory(deployer);
        factory.setMatchWeekAddress(matchWeekAddress);
        factory.setConsumerAddress(matchesDataConsumerAddress);
        factory.transferOwnership(Constants.OWNER);
        console.logString(
            string.concat("MatchWeekFactory deployed at: ", vm.toString(address(factory)))
        );
    }
}

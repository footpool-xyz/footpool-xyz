//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { FootPool } from "../contracts/FootPool.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { MatchesDataConsumer } from "../contracts/MatchesDataConsumer.sol";

contract DeployFootPool is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run(
        address matchWeekAddr,
        address matchesDataConsumerAddr
    ) external ScaffoldEthDeployerRunner {
        _deployFootPool(matchWeekAddr, matchesDataConsumerAddr);
    }

    function _deployFootPool(
        address matchWeekAddress,
        address matchesDataConsumerAddress
    ) private {
        FootPool factory = new FootPool(deployer);
        factory.setMatchWeekAddress(matchWeekAddress);
        factory.setConsumerAddress(matchesDataConsumerAddress);
        factory.transferOwnership(Constants.OWNER);
        console.logString(string.concat("FootPool deployed at: ", vm.toString(address(factory))));
    }
}

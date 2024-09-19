//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { MatchWeekFactory } from "../contracts/MatchWeekFactory.sol";

contract DeployFootPool is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        MatchWeek matchWeek = new MatchWeek();
        console.logString(string.concat("MatchWeek deployed at: ", vm.toString(address(matchWeek))));

        MatchWeekFactory factory = new MatchWeekFactory(deployer);
        factory.setMatchWeekAddress(address(matchWeek));
        // factory.setConsumerAddress();

        factory.transferOwnership(0xb649caCf58212Cd17D058999e10784AE71B88113);
        console.logString(
            string.concat("MatchWeekFactory deployed at: ", vm.toString(address(factory)))
        );
    }
}

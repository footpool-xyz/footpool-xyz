//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";

contract DeployFootPool is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        MatchWeek yourContract = new MatchWeek();
        console.logString(
            string.concat("MatchWeek deployed at: ", vm.toString(address(yourContract)))
        );
    }
}

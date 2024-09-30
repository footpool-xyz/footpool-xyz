//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";

contract DeployFakeUsdt is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        MockUsdtToken usdtToken = new MockUsdtToken();
        console.logString(
            string.concat("USDT token deployed at: ", vm.toString(address(usdtToken)))
        );

        usdtToken.mint(0x27dBc64e6C38633eD526d970258372476BCE58C0);
    }
}

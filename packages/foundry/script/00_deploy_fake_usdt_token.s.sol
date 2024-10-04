//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { FootPool } from "../contracts/FootPool.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { MatchesDataConsumer } from "../contracts/MatchesDataConsumer.sol";

contract DeployFakeUsdtToken is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        _deployFakeUsdt();
    }

    function _deployFakeUsdt() private returns (address) {
        MockUsdtToken usdtToken = new MockUsdtToken();
        console.logString(
            string.concat("USDT token deployed at: ", vm.toString(address(usdtToken)))
        );
        usdtToken.mint(Constants.OWNER);

        return address(usdtToken);
    }
}

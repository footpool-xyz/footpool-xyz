//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { Constants } from "./Constants.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { MatchWeekFactory } from "../contracts/MatchWeekFactory.sol";
import { MockMatchesDataConsumer } from "../test/mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "../test/mock/MockUsdtToken.sol";
import { FunctionsConsumer } from "../contracts/FunctionsConsumer.sol";

contract DeployFakeUsdtToken is ScaffoldETHDeploy {
    // use `deployer` from `ScaffoldETHDeploy`
    function run() external ScaffoldEthDeployerRunner {
        if (getChain().chainId == 31337) {
            _deployFakeUsdt();
        }
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

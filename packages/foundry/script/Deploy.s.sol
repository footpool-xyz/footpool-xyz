//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";

import { DeployFakeUsdtToken } from "./00_deploy_fake_usdt_token.s.sol";
import { DeployClonableMatchWeek } from "./01_deploy_clonable_match_week.s.sol";
import { DeployDataConsumer } from "./02_deploy_data_consumer.s.sol";
import { DeployFootPool } from "./03_deploy_footpool.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployFakeUsdtToken fakeUsdtDeployer = new DeployFakeUsdtToken();
        fakeUsdtDeployer.run();

        DeployClonableMatchWeek clonableMatchWeekDeployer = new DeployClonableMatchWeek();
        address clonableMatchWeekAddr = clonableMatchWeekDeployer.run();

        DeployDataConsumer dataConsumerDeployer = new DeployDataConsumer();
        address dataConsumerAddr = dataConsumerDeployer.run();

        DeployFootPool footPoolDeployer = new DeployFootPool();
        footPoolDeployer.run(clonableMatchWeekAddr, dataConsumerAddr);
    }
}

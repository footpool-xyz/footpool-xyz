//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./DeployHelpers.s.sol";
import { DeployFootPool } from "./00_deploy_footpool_contracts.s.sol";
import { DeployFakeUsdt } from "./01_deploy_fake_usdt_contract.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external {
        DeployFootPool footPoolDeployer = new DeployFootPool();
        footPoolDeployer.run();

        DeployFakeUsdt fakeUsdtDeployer = new DeployFakeUsdt();
        fakeUsdtDeployer.run();
    }
}

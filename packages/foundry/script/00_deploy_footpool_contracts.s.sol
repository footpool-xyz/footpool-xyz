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
    function run() external ScaffoldEthDeployerRunner {
        address matchWeekAddress = _deployMatchWeek();
        address matchesDataConsumerAddress = 0x47462Fc9F041763b47549DEf683DD785BbCFC313;

        if (getChain().chainId == 31337) {
            _deployFakeUsdt();
            matchesDataConsumerAddress = _deployMatchesDataConsumer();
        }

        _deployMatchWeekFactory(matchWeekAddress, matchesDataConsumerAddress);
    }

    function _deployMatchesDataConsumer() private returns (address) {
        string memory fakeMatches = vm.readFile("./matches/fakeMatches.json");
        MockMatchesDataConsumer matchesDataConsumer = new MockMatchesDataConsumer();
        matchesDataConsumer.setResponse(fakeMatches);
        console.logString(
            string.concat(
                "MockMatchesDataConsumer deployed at: ", vm.toString(address(matchesDataConsumer))
            )
        );

        return address(matchesDataConsumer);
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

    function _deployMatchWeek() private returns (address) {
        MatchWeek matchWeek = new MatchWeek();
        console.logString(string.concat("MatchWeek deployed at: ", vm.toString(address(matchWeek))));

        return address(matchWeek);
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

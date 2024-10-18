// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { Test, console } from "forge-std/Test.sol";
import { MatchWeek } from "../contracts/MatchWeek.sol";
import { MockMatchesDataConsumer } from "./mock/MockMatchesDataConsumer.sol";
import { MockUsdtToken } from "./mock/MockUsdtToken.sol";
import { OwnableUpgradeable } from
    "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MatchWeekTest is Test {
    event EnabledMatchWeek(uint256 id);
    event MatchAdded(uint256 id);
    event AddedResults();
    event RewardSended(address indexed to, uint256 reward);

    MockMatchesDataConsumer consumer;
    MatchWeek.Match[] matchesToAdd;
    MatchWeek.Bet[] betsToAdd;
    MatchWeek.MatchResult[] resultsToAdd;
    MockUsdtToken token;

    address OWNER = makeAddr("owner");
    address USER = makeAddr("user");

    function setUp() public {
        consumer = new MockMatchesDataConsumer();

        token = new MockUsdtToken();
    }

    /////////////////
    //// Enabling
    /////////////////
    function testCanEnableMatchWeek() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        bool previousState = matchWeek.s_isEnabled();

        vm.startPrank(OWNER);
        vm.expectEmit(false, false, false, false);
        emit EnabledMatchWeek(matchWeek.s_id());
        matchWeek.enable();
        bool finalState = matchWeek.s_isEnabled();
        vm.stopPrank();

        assertFalse(previousState);
        assertTrue(finalState);
    }

    function testOnlyOwnerCanEnableMatchWeek() public {
        MatchWeek matchWeek = _initializeMatchWeek();

        vm.prank(USER);
        vm.expectRevert(MatchWeek.MatchWeek__OnlyFactoryOrOwnerAllowed.selector);
        matchWeek.enable();
    }

    /////////////////
    //// Closing
    /////////////////
    function testCanCloseOnlyWhenIsOpen() public {
        MatchWeek matchWeek = _initializeMatchWeek();

        vm.prank(OWNER);
        matchWeek.close();
    }

    function testRevertsClosingWhenIsAlreadyClosed() public {
        MatchWeek matchWeek = _initializeMatchWeek();

        vm.startPrank(OWNER);
        matchWeek.close();
        vm.expectRevert(MatchWeek.MatchWeek__AlreadyClosed.selector);
        matchWeek.close();
        vm.stopPrank();
    }

    /////////////////
    //// Add Matches
    /////////////////
    function testCanAddMatches() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();

        vm.prank(OWNER);
        vm.expectEmit(true, false, false, true);
        emit MatchAdded(1);
        vm.expectEmit(true, false, false, true);
        emit MatchAdded(2);
        matchWeek.addMatches(matchesToAdd);

        MatchWeek.Match[] memory matchesAdded = matchWeek.getMatches();
        assertEq(2, matchesAdded.length);
    }

    function testOnlyOwnerCanAddMatches() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();

        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, USER)
        );
        matchWeek.addMatches(matchesToAdd);
    }

    function testRevertsWhenTryingToAddMatchesAndMatchWeekIsClosed() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();

        vm.prank(OWNER);
        matchWeek.close();

        vm.expectRevert(MatchWeek.MatchWeek__AlreadyClosed.selector);
        vm.prank(OWNER);
        matchWeek.addMatches(matchesToAdd);
    }

    /////////////////
    //// Add Bets
    /////////////////
    function testCanAddBets() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();
        _populateBetsToAdd();

        vm.startPrank(USER);
        token.mint(USER);
        token.approve(address(matchWeek), 5 * 1e18);
        matchWeek.addBets(betsToAdd, address(token));
        vm.stopPrank();

        MatchWeek.Bet[] memory myBets = matchWeek.getMyBets(USER);
        assert(MatchWeek.Result.LOCAL_WIN == myBets[0].result);
        assert(MatchWeek.Result.DRAW == myBets[1].result);
    }

    function testCantBetWhenNoTokenAllowance() public {
        MatchWeek matchWeek = new MatchWeek();
        matchWeek.initialize(1, "First MatchWeek", OWNER, address(consumer));
        betsToAdd.push(MatchWeek.Bet(1, MatchWeek.Result.LOCAL_WIN));
        betsToAdd.push(MatchWeek.Bet(2, MatchWeek.Result.DRAW));

        vm.prank(OWNER);
        matchWeek.addMatches(matchesToAdd);

        token.mint(USER);

        vm.prank(USER);
        vm.expectRevert(MatchWeek.MatchWeek__NotEnoughTokenAllowance.selector);
        matchWeek.addBets(betsToAdd, address(token));
    }

    /////////////////
    //// Results
    /////////////////
    function testOnlyOwnerCanAddResults() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();

        resultsToAdd.push(MatchWeek.MatchResult(1, MatchWeek.Result.LOCAL_WIN));
        resultsToAdd.push(MatchWeek.MatchResult(2, MatchWeek.Result.LOCAL_WIN));

        vm.prank(USER);
        vm.expectRevert(
            abi.encodeWithSelector(OwnableUpgradeable.OwnableUnauthorizedAccount.selector, USER)
        );
        matchWeek.addResults(resultsToAdd);
    }

    function testRevertsWhenAddingResultsAndIsNoClosed() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();

        resultsToAdd.push(MatchWeek.MatchResult(1, MatchWeek.Result.LOCAL_WIN));
        resultsToAdd.push(MatchWeek.MatchResult(2, MatchWeek.Result.LOCAL_WIN));

        vm.prank(OWNER);
        vm.expectRevert(MatchWeek.MatchWeek__NotClosedYet.selector);
        matchWeek.addResults(resultsToAdd);
    }

    function testCanAddResults() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();
        _populateResultsToAdd();

        vm.prank(OWNER);
        matchWeek.close();

        vm.prank(OWNER);
        vm.expectEmit(false, false, false, false);
        emit AddedResults();
        matchWeek.addResults(resultsToAdd);
    }

    function testRewardsAreSentToWinners() public {
        MatchWeek matchWeek = _initializeMatchWeek();
        _populateMatchesToAdd();
        _populateBetsToAdd();
        resultsToAdd.push(MatchWeek.MatchResult(1, MatchWeek.Result.LOCAL_WIN));
        resultsToAdd.push(MatchWeek.MatchResult(2, MatchWeek.Result.DRAW));

        token.mint(USER);
        vm.prank(USER);
        token.approve(address(matchWeek), 5 * 1e18);

        vm.prank(USER);
        matchWeek.addBets(betsToAdd, address(token));

        vm.prank(OWNER);
        matchWeek.close();

        vm.startPrank(OWNER);
        vm.expectEmit(true, true, false, true);
        emit RewardSended(USER, matchWeek.getRewardToSend(1));
        vm.expectEmit(false, false, false, false);
        emit AddedResults();
        matchWeek.addResults(resultsToAdd);
        vm.stopPrank();
    }

    /////////////////
    //// Withdraw
    /////////////////
    function testOwnerCanWithdrawFunds() public { }

    function testRevertsIfNotOwnerTriesToWithdrawFunds() public { }

    function testReversIfOwnerTriesToWithdrawFundsAndIsNotClosed() public { }

    /**
     * Helper functions
     */
    function _initializeMatchWeek() private returns (MatchWeek) {
        MatchWeek matchWeek = new MatchWeek();
        matchWeek.initialize(1, "First MatchWeek", OWNER, address(consumer));

        return matchWeek;
    }

    function _populateBetsToAdd() private {
        betsToAdd.push(MatchWeek.Bet(1, MatchWeek.Result.LOCAL_WIN));
        betsToAdd.push(MatchWeek.Bet(2, MatchWeek.Result.DRAW));
    }

    function _populateMatchesToAdd() private {
        vm.startPrank(OWNER);
        matchesToAdd.push(MatchWeek.Match(1, "RMadrid", "FCBarcelona", MatchWeek.Result.UNDEFINED));
        matchesToAdd.push(MatchWeek.Match(2, "ATMadrid", "Athletic", MatchWeek.Result.UNDEFINED));
        vm.stopPrank();
    }

    function _populateResultsToAdd() private {
        resultsToAdd.push(MatchWeek.MatchResult(1, MatchWeek.Result.LOCAL_WIN));
        resultsToAdd.push(MatchWeek.MatchResult(2, MatchWeek.Result.LOCAL_WIN));
    }
}

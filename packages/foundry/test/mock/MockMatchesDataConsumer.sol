//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { FunctionsConsumer } from "../../contracts/FunctionsConsumer.sol";

contract MockMatchesDataConsumer is FunctionsConsumer {
    address public constant RANDOM_ROUTER = 0x47462Fc9F041763b47549DEf683DD785BbCFC313;
    string private data;

    constructor() FunctionsConsumer(RANDOM_ROUTER) { }

    function setResponse(
        string memory _data
    ) public {
        data = _data;
    }

    function getResponse() external view override returns (string memory) {
        return data;
    }
}

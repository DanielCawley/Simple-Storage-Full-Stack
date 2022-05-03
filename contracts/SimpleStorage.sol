//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleStorage {
    uint256 num;

    function setNum(uint256 newNumValue) public {
        num = newNumValue;
    }

    function returnNum() public view returns (uint256) {
        return num;
    }
}

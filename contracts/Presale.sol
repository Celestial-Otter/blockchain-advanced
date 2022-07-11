// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract Presale is Ownable {
    address public owner;
    uint256 basisPoint;

    constructor() {
        basisPoint = 0;
    }

    function startPresale() public {}

    function buy() public {}

    function withdraw() public {}

    function endPresale() public {}

    function changeUsageFee() public onlyOwner {}
}

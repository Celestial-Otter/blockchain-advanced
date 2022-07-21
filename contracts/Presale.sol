// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Roles.sol";

contract Presale {
    using Roles for Roles.Role;

    Roles.Role private Owner;

    struct PresaleRequest {
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 price;
        uint256 numberofTokens;
        address tokenLocation;
        mapping(uint256 => address) IDs;
    }

    uint256 basisPoint;
    PresaleRequest[] public presaleList;

    constructor(uint256 _basisPoint) {
        basisPoint = _basisPoint;
        Owner.add(msg.sender);
    }

    modifier OwnerOnly() {
        require(Owner.has(msg.sender));
        _;
    }

    function startPresale() public {}

    function buy() public {}

    function withdraw() public {}

    function endPresale() public {}

    function changeUsageFee(uint256 newBasisPoint) public OwnerOnly {
        basisPoint = newBasisPoint;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

contract Presale {
    using Roles for Roles.Role;
    using Counters for Counters.Counter;

    Roles.Role private Owner;
    Counters.Counter private presaleIDs;

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

    function startPresale(
    uint 256 _startTimestamp, 
    uint256 _endTimestamp;
        uint256 _price;
        uint256 _numberofTokens;
        address _tokenLocation; ) public {}

    function buy() public {}

    function withdraw() public {}

    function endPresale() public {}

    function changeUsageFee(uint256 newBasisPoint) public OwnerOnly {
        basisPoint = newBasisPoint;
    }
}

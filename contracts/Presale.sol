// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Presale is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private presaleIDs;

    struct PresaleRequest {
        uint256 startTimestamp;
        uint256 endTimestamp;
        uint256 price;
        uint256 numberofTokens;
        address tokenLocation;
        uint256 numberofTokensSold;
    }

    uint256 basisPoint;
    mapping(uint256 => PresaleRequest) public presaleRequests;

    constructor(uint256 _basisPoint) {
        basisPoint = _basisPoint;
        presaleIDs.increment(); //skip 0 so counter starts at 1
    }

    function startPresale(
        uint256 _startTimestamp,
        uint256 _endTimestamp,
        uint256 _price,
        uint256 _numberofTokens,
        address _tokenLocation
    ) public {
        presaleRequests[presaleIDs.current()] = PresaleRequest({
            startTimestamp: _startTimestamp,
            endTimestamp: _endTimestamp,
            price: _price,
            numberofTokens: _numberofTokens,
            tokenLocation: _tokenLocation,
            numberofTokensSold: 0
        });

        presaleIDs.increment();
    }

    function buy(uint256 _ID, uint256 _buyTokenAmount) public payable {
        PresaleRequest memory presaleRequest = presaleRequests[_ID];
        require(
            block.timestamp >= presaleRequest.startTimestamp &&
                block.timestamp <= presaleRequest.endTimestamp &&
                presaleRequest.numberofTokens -
                    presaleRequest.numberofTokensSold >=
                _buyTokenAmount &&
                msg.value >= presaleRequest.price + basisPoint
        );
        presaleRequest.numberofTokensSold +=
            _buyTokenAmount /
            presaleRequest.price;
        presaleRequests[_ID] = presaleRequest;
    }

    function withdraw(uint256 _ID) public {
        IERC20(presaleRequests[_ID].tokenLocation).transfer(
            msg.sender,
            presaleRequests[_ID].numberofTokens
        );
    }

    function endPresale(uint256 _ID) public {}

    function getPresale(uint256 _ID)
        public
        view
        returns (PresaleRequest memory)
    {
        return presaleRequests[_ID];
    }

    function changeUsageFee(uint256 newBasisPoint) public onlyOwner {
        basisPoint = newBasisPoint;
    }
}

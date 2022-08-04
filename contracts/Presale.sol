// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@uniswap/v2-periphery/contracts/UniswapV2Router02.sol";

Interface IUniswap {
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}
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
        uint256 fees;
    }

    uint256 basisPoint;
    uint256 totalFees;
    mapping(uint256 => PresaleRequest) public presaleRequests;
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswap public uniswap;


    constructor(uint256 _basisPoint, address _uniswap) {
        basisPoint = _basisPoint;
        presaleIDs.increment(); //skip 0 so counter starts at 1
        uniswap = IUniswap(UNISWAP_V2_ROUTER);
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
            numberofTokensSold: 0,
            fees: 0
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
                msg.value >= presaleRequest.price * (1 + basisPoint / 100)
        );
        presaleRequest.fees += msg.value - presaleRequest.price; //fee is the difference between the price and the amount paid
        presaleRequest.numberofTokensSold += _buyTokenAmount;
    }

    function withdraw(uint256 _ID) public {
        require(block.timestamp >= presaleRequests[_ID].endTimestamp);

        IERC20(presaleRequests[_ID].tokenLocation).transfer(
            msg.sender,
            presaleRequests[_ID].numberofTokens
        );
    }

    function endPresale(uint256 _ID) public {
        PresaleRequest memory presaleRequest = presaleRequests[_ID];
        require(
            block.timestamp >= presaleRequest.endTimestamp &&
                IERC20(presaleRequest.tokenLocation).transferFrom(
                    msg.sender,
                    address(this),
                    presaleRequest.numberofTokensSold
                )
        );
        totalFees += presaleRequest.fees;

        IERC20(presaleRequest.tokenLocation).approve(uniswap.address, presaleRequest.numberofTokensSold);
        uniswap.addLiquidityETH{value: presaleRequest.numberofTokensSold * presaleRequest.price}(
            presaleRequest.tokenLocation,
            presaleRequest.numberofTokensSold,
            1,
            1,
            address(this),
            block.timestamp;
        );
    }

    function changeUsageFee(uint256 newBasisPoint) public onlyOwner {
        basisPoint = newBasisPoint;
    }
}

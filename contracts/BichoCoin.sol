// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BichoCoin is ERC20 {
    address private _owner;
    uint256 private _mintAmount = 1;
    uint64 private _mintDelay = 60 * 60 * 24; // 1 day in seconds

    mapping(address => uint256) private nextMint;

    constructor() ERC20("BichoCoin", "BC") {
        _owner = msg.sender;
        _mint(msg.sender, 1000);
    }

    function mint(address to) public restricted {
        // require(_mintAmount > 0, "Minting is not enabled");
        // require(
        //     block.timestamp >= nextMint[to],
        //     "You cannot mint twice in a row"
        // );
        _mint(to, _mintAmount);
        // nextMint[to] = block.timestamp + _mintDelay;
    }

    function setMintAmount(uint256 newAmount) public restricted {
        _mintAmount = newAmount;
    }

    function setMintDelay(uint64 delayInSeconds) public restricted {
        _mintDelay = delayInSeconds;
    }

    modifier restricted() {
        require(_owner == msg.sender, "Restricted");
        _;
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}

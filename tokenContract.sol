// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { ERC20 } from "@openzeppelin/contracts@4.0.0/token/ERC20/ERC20.sol";

contract NeoTokens is ERC20 {
    constructor(uint256 initialSupply) ERC20("NeoTokens", "NEO") {
        _mint(msg.sender, initialSupply);
    }
}
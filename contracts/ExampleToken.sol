pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol';

contract ExampleToken is ERC20Burnable {
    constructor (uint256 _supply) {
        _mint(msg.sender, _supply);
    }
}

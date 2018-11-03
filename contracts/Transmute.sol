pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol';

contract Transmute {
    ERC20Burnable token;

    constructor (ERC20Burnable _token) public {
        // TODO: Pass project whitelist and use it for auth
        token = _token;
    }

    function transformFrom (address user, uint256 amount) {
        // Burn users tokens
        token.burnFrom(user, amount);

        // Supply user some coins
        user.transfer( _toCoin(amount) );
    }

    // Computes how many coins should be supplied for burning some amount of token
    function _toCoin (uint256 amount) view {
        // TODO: This should be deflationary based on block number
        return amount // Right now its hella linear
    }


    // Accept any incoming amount
    function () public payable {}
}

pragma solidity >=0.4.22 <0.6.0;

import "./openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./storage/CzStorage.sol";
import "./modifiers/CzOwnable.sol";


contract CzExchange is CzStorage, CzOwnable {

    using SafeMath for uint256;

    constructor() public {}


    function testFunc() public returns (bool) {
        return true;
    }


}

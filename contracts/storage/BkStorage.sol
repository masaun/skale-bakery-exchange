pragma solidity ^0.5.0;

//import "../openzeppelin-solidity/ReentrancyGuard.sol";
import "../openzeppelin-solidity/contracts/ownership/Ownable.sol";

import "./BkObjects.sol";
import "./BkEvents.sol";


// shared storage
contract BkStorage is BkObjects, BkEvents, Ownable {

    mapping (uint => ExampleObject) examples;

}


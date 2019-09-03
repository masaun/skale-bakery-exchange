pragma solidity ^0.5.0;

import "./TradeableERC721Token.sol";
import "../../openzeppelin-solidity/contracts/ownership/Ownable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Creature is TradeableERC721Token {

    address public proxyRegistryAddress;
    address public tradeableERC721TokenAddress;

    constructor(address _proxyRegistryAddress, address _tradeableERC721TokenAddress) TradeableERC721Token("Skale Token", "SKT", _proxyRegistryAddress) public {  
        proxyRegistryAddress = _proxyRegistryAddress;
        tradeableERC721TokenAddress = _tradeableERC721TokenAddress;
    }

    function baseTokenURI() public view returns (string memory) {
        return "https://opensea-creatures-api.herokuapp.com/api/creature/";
    }


    function mintNFT(address _ownerAddress) public returns (bool) {
        TradeableERC721Token(tradeableERC721TokenAddress).mintTo(_ownerAddress);
    }
    
    
  
}

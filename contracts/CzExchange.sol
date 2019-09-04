pragma solidity >=0.4.22 <0.6.0;

import "./openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./storage/CzStorage.sol";
import "./modifiers/CzOwnable.sol";


import './openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import './openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './opensea-creatures/contracts/Strings.sol';


contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}


contract CzExchange is ERC721Full, Ownable, CzStorage, CzOwnable {

    using SafeMath for uint256;

    // address proxyRegistryAddress;
    // uint256 private _currentTokenId = 0;

    // constructor(string memory _name, string memory _symbol, address _proxyRegistryAddress) ERC721Full(_name, _symbol) public {
    //     proxyRegistryAddress = _proxyRegistryAddress;
    // }



    constructor(
        string memory name, 
        string memory symbol,
        uint tokenId,
        string memory tokenURI
    )
        ERC721Full(name, symbol)
        public
    {
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }


    




    function mintNFT(address _to, uint256 _tokenId) public returns (bool) {
        // This _mint() function is inherited ERC721.sol
        _mint(_to, _tokenId);

        return true;
    }
    




    function testFunc() public returns (bool) {
        return true;
    }


    function foodExchange() public returns (bool) {
        return true;    
    }
    
    

}

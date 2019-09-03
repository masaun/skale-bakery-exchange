const TradeableERC721Token = artifacts.require("./TradeableERC721Token.sol");

module.exports = function(deployer, network) {

  let _name = "Skale Token"
  let _symbol = "SKT"

  let proxyRegistryAddress = ""
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }


  deployer.deploy(TradeableERC721Token, _name, _symbol, proxyRegistryAddress, {gas: 5000000});
  

  
  
};

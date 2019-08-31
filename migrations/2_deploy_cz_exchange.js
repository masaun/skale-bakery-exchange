const CzExchange = artifacts.require("./CzExchange.sol");


module.exports = function(deployer) {
  deployer.deploy(
    CzExchange
  );
};

const path = require("path");
require('dotenv').config();

const HDWalletProvider = require("truffle-hdwallet-provider");

// Provide my Mnemonic
const mnemonic = process.env.Mnemonic;

// Create your own key for Production environments (https://infura.io/)
const INFURA_API_KEY = process.env.INFURA_API_KEY;

// Provide your SKALE endpoint address
const skale = process.env.SKALE_CHAIN_TRUFFLE;


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,     // Ganache-GUI
      //port: 8545,   // Ganache-CLI
      network_id: "*",
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + infuraKey)
        //return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY)
      },
      network_id: '3',
      gas: 4465030,
      gasPrice: 10000000000,
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY)
      },
      network_id: '42',
      gas: 4465030,
      gasPrice: 10000000000,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
    // main ethereum network(mainnet)
    main: {
      provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000
    },
    skale: {
        provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, skale),
        gasPrice: 0,
        network_id: "*"
    }
  }
};

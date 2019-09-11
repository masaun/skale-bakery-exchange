import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";

import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image } from 'rimble-ui';
import { Grid } from 'react-bootstrap';

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';



class App extends Component {
  constructor(props) {    
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      route: window.location.pathname.replace("/",""),
    };

    this.getTestData = this.getTestData.bind(this);

  }


  ///////--------------------- Functions of BakeryExchange ---------------------------



  ///////--------------------- Functions of testFunc ---------------------------  
  getTestData = async () => {
    const { accounts, bakery_exchange, oracle_wizard_data, creature, creature_factory } = this.state;

    const web3 = new Web3(window.ethereum);
    //const WizardPresale = require("../../build/contracts/WizardPresale.json");  // Load ABI of contract of WizardPresale

    const response = await bakery_exchange.methods.testFunc().send({ from: accounts[0] })
    console.log('=== response of testFunc function ===', response);  // Debug

    const response_2 = await creature.methods.baseTokenURI().call()
    console.log('=== response of baseTokenURI function ===', response_2);  // Debug


    let _tokenId = 1
    const response_3 = await creature.methods.tokenURI(_tokenId).call()
    console.log('=== response of tokenURI function ===', response_3);  // Debug


    const response_5 = await creature_factory.methods.canMint(_tokenId).call()
    console.log('=== response of canMint function ===', response_5);   // Debug --> Successful


    const response_7 = await bakery_exchange.methods.checkOwnerAddr(_tokenId).call();
    console.log('=== response of checkOwnerAddr function ===', response_7);  // Debug --> Successful


    /**
     * @dev mintNFT function
     */
    let _to1 = "0xc2e05710aef33b63bc6b2b7471f3fa072b1fa15b"
    const response_6 = await bakery_exchange.methods.mintNFT(_to1).send({ from: accounts[0] })
    console.log('=== response of mintNFT function（tokenId = 2）===', response_6);  // Debug --> Successful

    let _to2 = "0x8d46fdefcc0702dbca05bfbfc21abf197be970a9"
    const response_8 = await bakery_exchange.methods.mintNFT(_to2).send({ from: accounts[0] })
    console.log('=== response of mintNFT function（tokenId = 3）===', response_8);  // Debug --> Successful


    /**
     * @dev buyNFT function
     */
    let _tokenIdBuyNFT = 2
    let _buyer = "0xb7f1a8b10ac4e9c0ba2fd705dc7b45dfff72ced1"
    const response_9 = await bakery_exchange.methods.buyNFT(_tokenIdBuyNFT, _buyer).send({ from: accounts[0] })
    console.log('=== response of buyNFT function ===', response_9);  // Debug --> Fail

  }




  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
 
    let BakeryExchange = {};
    let OracleWizardData = {};
    let Creature = {};
    let CreatureFactory = {};

    try {
      BakeryExchange = require("../../build/contracts/BakeryExchange.json");      // Load ABI of contract of BakeryExchange
      OracleWizardData = require("../../build/contracts/OracleWizardData.json");  // Load ABI of contract of OracleWizardData
      Creature = require("../../build/contracts/Creature.json");                  // Load ABI of contract of Creature
      CreatureFactory = require("../../build/contracts/CreatureFactory.json");    // Load ABI of contract of CreatureFactory
    } catch (e) {
      console.log(e);
    }

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];

        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');

        let instanceBakeryExchange = null;
        let instanceOracleWizardData = null;
        let instanceCreature = null;
        let instanceCreatureFactory = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (BakeryExchange.networks) {
          deployedNetwork = BakeryExchange.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceBakeryExchange = new web3.eth.Contract(
              BakeryExchange.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceBakeryExchange ===', instanceBakeryExchange);
          }
        }
        if (OracleWizardData.networks) {
          deployedNetwork = OracleWizardData.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceOracleWizardData = new web3.eth.Contract(
              OracleWizardData.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceOracleWizardData ===', instanceOracleWizardData);
          }
        }
        if (Creature.networks) {
          deployedNetwork = Creature.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceCreature = new web3.eth.Contract(
              Creature.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceCreature ===', instanceCreature);
          }
        }
        if (CreatureFactory.networks) {
          deployedNetwork = CreatureFactory.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceCreatureFactory = new web3.eth.Contract(
              CreatureFactory.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceCreatureFactory ===', instanceCreatureFactory);
          }
        }

        if (instanceBakeryExchange || instanceOracleWizardData || Creature || CreatureFactory) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, bakery_exchange: instanceBakeryExchange, oracle_wizard_data: instanceOracleWizardData, creature: instanceCreature, creature_factory: instanceCreatureFactory }, () => {
              this.refreshValues(instanceBakeryExchange, instanceOracleWizardData, instanceCreature, instanceCreatureFactory);
              setInterval(() => {
                this.refreshValues(instanceBakeryExchange, instanceOracleWizardData, instanceCreature, instanceCreatureFactory);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instanceBakeryExchange, instanceOracleWizardData, instanceCreature, instanceCreatureFactory) => {
    if (instanceBakeryExchange) {
      console.log('refreshValues of instanceBakeryExchange');
    }
    if (instanceOracleWizardData) {
      console.log('refreshValues of instanceOracleWizardData');
    }
    if (instanceCreature) {
      console.log('refreshValues of instanceCreature');
    }
    if (instanceCreatureFactory) {
      console.log('refreshValues of instanceCreatureFactory');
    }
  }

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
      </div>
    );
  }

  renderBakeryExchange() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.bakery_exchange && (
        this.renderDeployCheck('bakery_exchange')
      )}
      {this.state.web3 && this.state.bakery_exchange && (
        <div className={styles.contracts}>

          <h2>SKALE Bakery Exchange</h2>

          <div className={styles.widgets}>
            <Card width={'30%'} bg="primary">
              <h4>Goods #1</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Goods #2</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>

            <Card width={'30%'} bg="primary">
              <h4>Goods #3</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
          </div>


          <div className={styles.widgets}>
            <Card width={'30%'} bg="primary">
              <h4>Goods #4</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
   
            <Card width={'30%'} bg="primary">
              <h4>Goods #5</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>

            <Card width={'30%'} bg="primary">
              <h4>Goods #6</h4>

              <Image
                alt="random unsplash image"
                borderRadius={8}
                height="auto"
                maxWidth='100%'
                src="https://source.unsplash.com/random/1280x720"
              />

              <span style={{ padding: "20px" }}></span>

              <br />

              <Button size={'small'} onClick={this.getTestData}>Buy</Button>
            </Card>
          </div>
        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'bakery_exchange' && this.renderBakeryExchange()}
        <Footer />
      </div>
    );
  }
}

export default App;

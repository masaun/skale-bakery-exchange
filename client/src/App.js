import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";

import { Loader, Button, Card, Input, Heading, Table, Form } from 'rimble-ui';
import { Grid } from 'react-bootstrap';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { moment } from 'moment'

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';



// Dash board
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
// import "./assets/css/demo.css";
// import "./assets/css/pe-icon-7-stroke.css";
// import AdminLayout from "./layout/Admin.jsx";



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


  ///////--------------------- Functions of CzExchange ---------------------------



  ///////--------------------- Functions of testFunc ---------------------------  
  getTestData = async () => {
    const { accounts, cz_exchange, oracle_wizard_data } = this.state;

    const web3 = new Web3(window.ethereum);
    //const WizardPresale = require("../../build/contracts/WizardPresale.json");  // Load ABI of contract of WizardPresale

    const response = await cz_exchange.methods.testFunc().send({ from: accounts[0] })
    console.log('=== response of testFunc function ===', response);  // Debug
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
 
    let CzExchange = {};
    let OracleWizardData = {};

    try {
      CzExchange = require("../../build/contracts/CzExchange.json");        // Load ABI of contract of CzExchange
      OracleWizardData = require("../../build/contracts/OracleWizardData.json");  // Load ABI of contract of OracleWizardData
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

        let instanceCzExchange = null;
        let instanceOracleWizardData = null;
        let deployedNetwork = null;

        // Create instance of contracts
        if (CzExchange.networks) {
          deployedNetwork = CzExchange.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceCzExchange = new web3.eth.Contract(
              CzExchange.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceCzExchange ===', instanceCzExchange);
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

        if (instanceCzExchange || instanceOracleWizardData) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, cz_exchange: instanceCzExchange, oracle_wizard_data: instanceOracleWizardData }, () => {
              this.refreshValues(instanceCzExchange, instanceOracleWizardData);
              setInterval(() => {
                this.refreshValues(instanceCzExchange, instanceOracleWizardData);
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

  refreshValues = (instanceCzExchange, instanceOracleWizardData) => {
    if (instanceCzExchange) {
      console.log('refreshValues of instanceCzExchange');
    }
    if (instanceOracleWizardData) {
      console.log('refreshValues of instanceOracleWizardData');
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

  renderCzExchange() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.cz_exchange && (
        this.renderDeployCheck('cz_exchange')
      )}
      {this.state.web3 && this.state.cz_exchange && (
        <div className={styles.contracts}>
          <div className={styles.widgets}>
            <Card width={'350px'} bg="primary">
              <h2>SKALE Exchange</h2>

              <Button onClick={this.getTestData}>Get Test Data</Button>
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
          {this.state.route === 'cz_exchange' && this.renderCzExchange()}
        <Footer />
      </div>
    );
  }
}

export default App;

# SKALE Bakery Exchange

***

## 【Introduction of SKALE Bakery Exchange】
- SKALE Bakery Exchange is decentralized exchange of ingredients by using ERC721 token.
  (it give tokenId per ingredient)

- Deploy to SKALE side chain  
  https://developers.skalelabs.com/code-samples

- Save and call images of ingredients in FileStorage of SKALE. (In progress to implement)
  https://developers.skalelabs.com/file-storage

***

&nbsp;

## 【Setup private chain or side chain】
### Install node packages

```
npm install
```

&nbsp;


### Update `.env` file with your credentials.

```
MNEMONIC=[YOUR_MNEMONIC]
ACCOUNT=[YOUR_ACCOUNT]
PRIVATE_KEY=[YOUR_PRIVATE_KEY]
SKALE_CHAIN=[YOUR_SKALE_CHAIN_ENDPOINT]
```

&nbsp;


### Setup private network by using Ganache
1. Download Ganache from link below
https://www.trufflesuite.com/ganache  


2. Execute Ganache (If it run this Dapp in private chain)

&nbsp;



### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
http://127.0.0.1:7545

or 

URL which include SKALE_CHAIN_ENDPOINT

```

&nbsp;


### Setup backend
1. Deploy contracts to private network of Ganache
```
(root directory)

$ npm run migrate

or 

$ truffle deploy --reset --network skale --compile-all
```

&nbsp;


### Setup frontend
1. Execute command below in root directory.
```

$ npm run client
```

2. Access to browser by using link 
```
http://127.0.0.1:3000

or 

URL which include SKALE_CHAIN_ENDPOINT
```

&nbsp;

***

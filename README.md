# Voting dApp on the Rinkeby Network

Hi! This is my final year project. The objective of the project is to create a secure decentralised system for voting that will combat electoral fraud using the blockchain. I built a site that takes a number of candidate names' alongside their respective ethereum addresses and deploys them inside of a smart contract onto the rinkeby network. The deployed contract will be called back, where voters can then cast a vote to their desired candidate onto the ballot table. I build the project using the react framework with Javscript, HTML, CSS. For the ethereum smart contact framework I used Truffle framework and developed them using Solidity and for the unit tests I used Javascript.

[![GitHub issues](https://img.shields.io/github/issues/jmayanja-xyz/fyp_voting_dApp)](https://github.com/jmayanja-xyz/fyp_voting_dApp/issues)
[![GitHub license](https://img.shields.io/github/license/jmayanja-xyz/fyp_voting_dApp)](https://github.com/jmayanja-xyz/fyp_voting_dApp)
[![GitHub forks](https://img.shields.io/github/forks/jmayanja-xyz/fyp_voting_dApp)](https://github.com/jmayanja-xyz/fyp_voting_dApp/network)
[![GitHub stars](https://img.shields.io/github/stars/jmayanja-xyz/fyp_voting_dApp)](https://github.com/jmayanja-xyz/fyp_voting_dApp/stargazers)

## Prerequisites
```
- npm:  >=8.1.2
- node: >16.13.1
- Download and make a metamask account on your browser
- A node to connect dApp to blockchain
```

Download and make a Metamask Account at https://metamask.io/
Go into the `secrets.js` file, which will be empty and inserted your 12-worded metamask mnemonic password.

Also you'll want to have your own node, so make a Moralis account at https://moralis.io/ and go to the `Speedy Nodes` section. Click on `ETH network` for an endpoint and copy the Rinkeby URL. It will look like this:

```
https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXX/eth/rinkeby
```
 and replace it in rinekeby network export in the url section in `truffle-config.js`

```javascript
 rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/043306717a87e578f84a1f07/eth/rinkeby`
        ),
      network_id: 4, // rinkeby's id
      gas: 5500000, // rinkeby has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
```
When you'll be doing transactions via Metamask you'll need test ether to do them for rinkeby as a default account will have 0 ETH. The best site to get some is from https://faucets.chain.link/rinkeby. And the site to see the transction in details is on https://rinkeby.etherscan.io all you need is the transcation hash that will be given to you in the console log to find it.

## How to Run the Project

After cloning the project, to run the application go into the terminal and find the project folder and type:

```
$ npm run start
```

This will deploy the app at [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to run on local Ganache

To run the application to deploy transcations onto local ganache make sure the Ganache suite is open on the workspace and your looking to deploy on configure your server settings like this:

```
     HOSTNAME: 127.0.0.1 - Io0   
     PORT NUMBER: 7545
     NETWORK ID: 5777
```


Also make sure you reconfigure your `truffle-config.js` network exports to match this by uncommenting this section.

```javascript
 development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
```
and commenting out this out.

```javascript
 rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://speedy-nodes-nyc.moralis.io/043306717a87e578f84a1f07/eth/rinkeby`
        ),
      network_id: 4, // rinkeby's id
      gas: 5500000, // rinkeby has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
```

On the MetaMask Wallet in your browser if you haven't already got localhost configured go to (Settings > Networks > Add Networks) and type in the following:

```
Network Name: (anything you'd like) e.g. Localhost
New RPC URL: http://127.0.0.1:7545
Chain ID: 1337
Currency Symbol(Optional): ETH
Block Explorer URL(Optional): (Leave empty!)
```

And now your wallet will be configured to your local host network.

#
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

You can contact me by sending to this email: jmayanja.xyz@gmail.com

## Running Unit Tests

In the project the unit test have been written in the `ballot.js` file located in the `test` folder in the Mocha framework.

To run, open terminal go to the project folder type in
```
  $   truffle test
``` 
The terminal will then run the unit test.

To get a deeper analysis, type in:
```
  $   truffle test --stacktrace-extra
```
(This will turn on stack traces and will additionally compile contracts in Solidity's debug mode for additional revert messages)

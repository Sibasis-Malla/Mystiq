const path = require("path");
require('dotenv').config();
const key = process.env.MNEMONIC;
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: "1337"
    },
   
    matic:{
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(`${key}`,`https://rpc-mumbai.maticvigil.com`),
      network_id:  80001,     
      //gas: 20000000,        
      confirmations: 2,    
      timeoutBlocks: 200, 
      skipDryRun: true     

    }
  },
  compilers: {
    solc: {
    version: "^0.8.7"
    }
}
};

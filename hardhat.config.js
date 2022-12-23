require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-solhint");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",

  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },

  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.GOERLI_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};

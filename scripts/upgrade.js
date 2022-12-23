const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const fs = require('fs');
const envfile = require('envfile');
const sourcePath = './output.txt';

const getKeyPair = () => {
  const content = fs.readFileSync(sourcePath);
  const lines = content.toString().split('\n');

  const key_pair = {};

  for (let line = 0; line < lines.length; line++) {
    const currentline = lines[line].split('=');
    key_pair[currentline[0]] = currentline[1];
  }

  return key_pair;
}


const key_pair = getKeyPair();


async function main() {
  const proxyAddress = key_pair["PROXY_ADDRESS"];
  const oldImplAddress = key_pair["IMPLEMENTATION_ADDRESS"];

  console.log(proxyAddress,"-Proxy address")
  console.log(oldImplAddress,"-Old Impl address")

  const CrowdFundingV2 = await ethers.getContractFactory("CrowdFundingV2");
  console.log("Upgrading to CrowdFundingV2...");

  const crowdFundingV2 = await upgrades.upgradeProxy(proxyAddress, CrowdFundingV2);
  console.log("Upgraded...");

  let newImplementationAddress = await upgrades.erc1967.getImplementationAddress(crowdFundingV2.address);
  let newAdminAddress = await upgrades.erc1967.getAdminAddress(crowdFundingV2.address);

  while(newImplementationAddress == oldImplAddress) {
    newImplementationAddress = await upgrades.erc1967.getImplementationAddress(crowdFundingV2.address);
    newAdminAddress = await upgrades.erc1967.getAdminAddress(crowdFundingV2.address);
  }

  console.log(crowdFundingV2.address, "-ProxyAddress");
  console.log(newImplementationAddress,"-ImplementationAddress");
  console.log(newAdminAddress, "-AdminAddress");

  // Write to output.txt
  let parsedFile = envfile.parse(sourcePath);
  parsedFile.PROXY_ADDRESS = crowdFundingV2.address;
  parsedFile.IMPLEMENTATION_ADDRESS = newImplementationAddress;
  parsedFile.ADMIN_ADDRESS = newAdminAddress;

  fs.writeFileSync('./output.txt', envfile.stringify(parsedFile));
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

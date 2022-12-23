const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();
const fs = require('fs');
const envfile = require('envfile');
const sourcePath = './output.txt';


const content = fs.readFileSync(sourcePath);
const lines = content.toString().split('\n');

const key_pair = {};

for(let line = 0; line < lines.length; line++){
  const currentline = lines[line].split('=');
  key_pair[currentline[0]] = currentline[1];
}

const proxyAddress = key_pair["PROXY_ADDRESS"];

async function main() {
  const CrowdFundingV2 = await ethers.getContractFactory("CrowdFundingV2");
  const crowdFundingV2 = await upgrades.upgradeProxy(proxyAddress, CrowdFundingV2);

  console.log(crowdFundingV2.address, "-ProxyAddress");
  console.log(await upgrades.erc1967.getImplementationAddress(crowdFundingV2.address),"-ImplementationAddress");
  console.log(await upgrades.erc1967.getAdminAddress(crowdFundingV2.address),"-AdminAddress");

  // Write to output.txt
  let parsedFile = envfile.parse(sourcePath);
  parsedFile.PROXY_ADDRESS = crowdFundingV2.address;
  parsedFile.IMPLEMENTATION_ADDRESS = await upgrades.erc1967.getImplementationAddress(crowdFundingV2.address);
  parsedFile.ADMIN_ADDRESS = await upgrades.erc1967.getAdminAddress(crowdFundingV2.address);

  fs.writeFileSync('./output.txt', envfile.stringify(parsedFile));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

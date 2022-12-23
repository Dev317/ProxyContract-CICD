const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
const fs = require('fs');
const envfile = require('envfile');
const sourcePath = './output.txt';

async function main() {
  const CrowdFundingV1 = await ethers.getContractFactory("CrowdFundingV1");
  const proxy = await upgrades.deployProxy(CrowdFundingV1,[0]);
  await proxy.deployed();

  console.log(proxy.address, "-ProxyAddress");
  console.log(await upgrades.erc1967.getImplementationAddress(proxy.address),"-ImplementationAddress");
  console.log(await upgrades.erc1967.getAdminAddress(proxy.address),"-AdminAddress");

  // Write to output.txt
  let parsedFile = envfile.parse(sourcePath);
  parsedFile.PROXY_ADDRESS = proxy.address;
  parsedFile.IMPLEMENTATION_ADDRESS = await upgrades.erc1967.getImplementationAddress(proxy.address);
  parsedFile.ADMIN_ADDRESS = await upgrades.erc1967.getAdminAddress(proxy.address);

  fs.writeFileSync('./output.txt', envfile.stringify(parsedFile));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

const proxyAddress = process.env.PROXY_ADDRESS;

async function main() {
  const CrowdFundingV2 = await ethers.getContractFactory("CrowdFundingV2");
  const crowdFundingV2 = await upgrades.upgradeProxy(proxyAddress, CrowdFundingV2);

  console.log(crowdFundingV2.address);
  console.log(await upgrades.erc1967.getImplementationAddress(crowdFundingV2.address)," getImplementationAddress");
  console.log(await upgrades.erc1967.getAdminAddress(crowdFundingV2.address)," getAdminAddress");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

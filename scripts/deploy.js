const hre = require("hardhat");
const { ethers, upgrades } = require("hardhat");

async function main() {
  const CrowdFundingV1 = await ethers.getContractFactory("CrowdFundingV1");
  const proxy = await upgrades.deployProxy(CrowdFundingV1,[0]);
  await proxy.deployed();

  console.log(proxy.address);
  console.log(await upgrades.erc1967.getImplementationAddress(proxy.address)," getImplementationAddress");
  console.log(await upgrades.erc1967.getAdminAddress(proxy.address)," getAdminAddress");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

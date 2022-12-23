const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Test V1", () => {
  let crowdFundingV1;
  const startNum = 0;

  beforeEach( async () => {
    const CrowdFundingV1 = await ethers.getContractFactory("CrowdFundingV1");
    crowdFundingV1 = await upgrades.deployProxy(CrowdFundingV1,[startNum]);
    await crowdFundingV1.deployed();
  });

  it("There should be no campaign initially", async () => {
    const campaigns = await crowdFundingV1.getCampaigns();
    expect(campaigns.length).to.equal(0);
  });

  it("There should be one campaign added", async () => {
    const [owner] = await ethers.getSigners();


    const addCampaign = await crowdFundingV1.createCampaign(
      owner.address,
      "Test title",
      "Test description",
      ethers.utils.parseUnits("1", "ether")
    );

    const campaignId = addCampaign.value;

    expect(campaignId).to.equal(BigNumber.from("0"));

    const campaigns = await crowdFundingV1.getCampaigns();
    expect(campaigns.length).to.equal(1);

    const numCampaign = await crowdFundingV1.numCampaign();
    expect(numCampaign).to.equal(1);

  });

});
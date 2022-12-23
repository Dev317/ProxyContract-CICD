const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Test upgrade V2", async () => {
  let crowdFundingV1;
  const startNum = 0;
  let crowdFundingV2;

  beforeEach(async () => {
    const CrowdFundingV1 = await ethers.getContractFactory("CrowdFundingV1");
    crowdFundingV1 = await upgrades.deployProxy(CrowdFundingV1,[startNum]);
    await crowdFundingV1.deployed();
  });

  it("There should be one campaign added from CrowdFundingV1", async () => {
    const [owner] = await ethers.getSigners();

    // add a campaign to CrowdFundingV1
    await crowdFundingV1.createCampaign(
        owner.address,
        "Test title",
        "Test description",
        ethers.utils.parseUnits("1", "ether")
    );

    const CrowdFundingV2 = await ethers.getContractFactory("CrowdFundingV2");
    crowdFundingV2 = await upgrades.upgradeProxy(crowdFundingV1.address, CrowdFundingV2);

    const campaigns = await crowdFundingV2.getCampaigns();
    expect(campaigns.length).to.equal(1);
  });

  it("Able to donate to a campaign", async () => {
    const [owner, donator] = await ethers.getSigners();

    await crowdFundingV2.connect(donator).donateCampaign(0, { value: ethers.utils.parseUnits("0.1", "ether")});

    const result = await crowdFundingV2.getDonators(0);
    const donatorList = result[0];
    const donationAmountList = result[1];

    expect(donatorList.length).to.equal(1);
    expect(donationAmountList.length).to.equal(1);

    expect(donatorList[0]).to.equal(donator.address);
    expect(donationAmountList[0]).to.equal(BigNumber.from(ethers.utils.parseUnits("0.1", "ether")));

  });

});
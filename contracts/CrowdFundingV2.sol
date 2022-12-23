// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract CrowdFundingV2 is Initializable {

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 targetAmount;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
    }

    function initialize(uint _startNum) public initializer {
        numCampaign = _startNum;
    }

    mapping(uint256 => Campaign) public campaignMap;
    uint256 public numCampaign;

    // Old V1 functions

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _targetAmount
    ) public returns(uint256) {
        Campaign storage newCampaign = campaignMap[numCampaign];

        newCampaign.owner = _owner;
        newCampaign.title = _title;
        newCampaign.description  = _description;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.amountCollected = 0;

        return ++numCampaign-1;
    }

    function getCampaigns() public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numCampaign);

        for (uint i = 0; i < numCampaign; ++i) {
            Campaign storage item = campaignMap[i];
            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

    // New V2 functions
    function donateCampaign(uint256 _id) public payable {
        require(msg.value > 0, "Amount donated must be larger than none");

        Campaign storage campaign = campaignMap[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");

        if (sent) {
            campaign.amountCollected += msg.value;
        }
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaignMap[_id].donators, campaignMap[_id].donations);
    }

}

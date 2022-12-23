// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract CrowdFundingV1 is Initializable {

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

}

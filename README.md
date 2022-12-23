# ProxyContract with CI/CD

This project demonstrates a basic lifecycle of a smart contract development, which consists of versioning, testing and deploying of any newly created contracts.

## Overview
In this project, we will create 2 smart contracts `CrowdFundingV1.sol` and `CrowFundingV2.sol` to demonstrate the Proxy pattern that allows the upgrading of smart contracts. We will be using OpenZepplin's implementation of proxy contract, which consists of :
1. **Proxy contract** which stores all the state that users interact with. It will also delegate call to the Implementation contract which will execute the required logic.
2. **Implementation contract** which is basically `CrowdFundingV1.sol` and `CrowFundingV2.sol` but no actual data is going to be stored on them. Instead, it is used to execute the function which is called from the Proxy contract.
3. **ProxyAdmin contract** which links the Proxy and Implementation

![alt tag](https://trufflesuite.com/img/blog/a-sweet-upgradeable-contract-experience-with-openzeppelin-and-truffle/proxy-contract.png)

To verify that `CrowdFundingV1` has been upgraded to `CrowdFundingV2`, we will be written small test cases that will check regardless of what data is posted to the Proxy contract to `CrowdFundingV1`, that data will still be present when the contract is upgraded to `CrowdFundingV2`.

This project will also demonstrate CI/CD workflow where new contract will be deployed when new codes are pushed and are managed to pass all the given testcases.

:warning: **Remember to comment out proxy_deploy** after you have already deployed the proxy contract! Else, new proxy contract will be created and the upgrading cycle will be repeated.

## Installing dependencies

```shell
git clone https://github.com/Dev317/ProxyContract-CICD.git
cd crowdfunding
npm install
```

## Basic linting
Solhint is a great linter that can detect syntax errors and also some syntax-related vulnerabilities.

```shell
solhint --version
solhint --init
solhint **/*.sol
```

## Basic hardhat command
- Compile smart contract

```shell
npx hardhat compile
```

- Run a test file

```shell
npx hardhat test test/${test_file_name.js}
```

- Deploy the contract

```shell
npx hardhat deploy scripts/${deploy_file_name.js} --network ${network_name}
```

## References
- https://www.chainshot.com/article/how-to-make-contracts-upgradeable
- https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916
- https://docs.openzeppelin.com/upgrades-plugins/1.x/

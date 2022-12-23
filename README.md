# ProxyContract with CI/CD

This project demonstrates a basic lifecycle of a smart contract development, which consists of versioning, testing and deploying of any newly created contracts.

## Installing dependencies

```shell
git clone https://github.com/Dev317/ProxyContract-CICD.git
cd crowdfunding
npm install
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

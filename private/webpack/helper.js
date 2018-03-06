const fs = require('fs');
const path = require('path');
const dir = require('node-dir');

const LOCALHOST_WS_URL = 'ws://localhost:8546';
const MAX_CONTRACTS_PER_NAME = 6;

module.exports.getNetworks = (cwd) => {
  const networkPath = path.resolve(cwd, '../seedom-solidity/network');
  const networkFiles
    = (dir.files(networkPath, { sync: true })).filter(file => path.extname(file) === '.json');

  const networks = {};
  for (const networkFile of networkFiles) {
    const networkName = path.basename(networkFile, '.json');
    const networkData = fs.readFileSync(networkFile);
    const network = JSON.parse(networkData);
    networks[networkName] = {
      url: network.url ? network.url : LOCALHOST_WS_URL
    };
  }

  return networks;
};

module.exports.getDeployments = (cwd) => {
  const deploymentPath = path.resolve(cwd, '../seedom-solidity/deployment');
  const deploymentFiles
    = (dir.files(deploymentPath, { sync: true })).filter(file => path.extname(file) === '.json');

  const contracts = {};
  const outputs = {};
  for (const deploymentFile of deploymentFiles) {
    const networkName = path.basename(deploymentFile, '.json');
    contracts[networkName] = {};

    const deploymentData = fs.readFileSync(deploymentFile);
    const deployment = JSON.parse(deploymentData);
    for (const contractName in deployment.releases) {
      contracts[networkName][contractName] = [];

      const releases = deployment.releases[contractName].slice(0, MAX_CONTRACTS_PER_NAME);
      for (const release of releases) {
        let output;
        // grab and cache outputs
        if (release.hash in outputs) {
          output = outputs[release.hash];
        } else {
          const outputFile = path.resolve(cwd, `../seedom-solidity/output/${release.hash}.json`);
          const outputData = fs.readFileSync(outputFile);
          output = JSON.parse(outputData);
          outputs[release.hash] = output;
        }

        contracts[networkName][contractName].push({
          address: release.address,
          abi: output.abi
        });
      }
    }
  }

  return contracts;
};

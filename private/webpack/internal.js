const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./base');
const loader = require('../../../seedom-solidity/chronicle/loader');

const cwd = process.cwd();

module.exports = merge(base, {
  output: {
    filename: 'index.js',
    path: path.resolve(cwd, 'dist/internal')
  },
  plugins: [
    new webpack.DefinePlugin({
      ETH_PATH: JSON.stringify('/internal/'),
      ETH_NETWORKS: JSON.stringify(loader.getNetworks()),
      ETH_DEPLOYMENTS: JSON.stringify(loader.getDeployments()),
      BADGER_URL: JSON.stringify('https://manager3.seedom.io')
    })
  ]
});

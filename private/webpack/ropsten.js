const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const base = require('./base.js');

const cwd = process.cwd();

module.exports = merge(base, {
  output: {
    filename: 'index.js',
    path: path.resolve(cwd, 'dist/ropsten')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.ETH_NODE': JSON.stringify('wss://manager2.seedom.io:8548'),
      'process.env.ETH_CONTRACT': JSON.stringify(require('/solidity/build/abi/seedom.json')),
      'process.env.ETH_DEPLOYMENTS': JSON.stringify(require('/solidity/deployment/ropsten.json'))
    })
  ]
});
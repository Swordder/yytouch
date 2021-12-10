'use strict'
const merge = require('webpack-merge')
const testEnv = require('./test.env')

module.exports = merge(testEnv, {
  NODE_ENV: '"testing"',
  EVN_CONFIG: '"test"'
})
// const merge = require('webpack-merge')
// const devEnv = require('./dev.env')

// module.exports = merge(devEnv, {
//   NODE_ENV: '"testing"',
//   EVN_CONFIG: '"test"'
// })

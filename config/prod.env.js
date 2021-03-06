'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  ENV_CONFIG: '"prod"'
})

// module.exports = {
//   NODE_ENV: '"production"',
//   ENV_CONFIG: '"prod"'
// }

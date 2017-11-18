'use strict'

const cmd = require('./packages/cmd')

try {
  const options = cmd.getOptions()
  console.log(options)
} catch (err) {
  console.log(err.toString())
  process.exit(1)
}

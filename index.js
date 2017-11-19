'use strict'

const cmd = require('./packages/cmd')
const ArgumentError = require('./packages/error/ArgumentError')

try {
  const options = cmd.getOptions()
  console.log(options)
} catch (err) {
  console.error(err.message)
  if (err instanceof ArgumentError) {
    console.error(cmd.getUsage())
  }
  process.exit(err.status)
}

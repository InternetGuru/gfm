'use strict'

const g = require('./packages/globals')
const cmd = require('./packages/cmd')
const ArgumentError = require('./packages/error/ArgumentError')

Promise
  .resolve()
  .then(async () => {
    const options = cmd.getOptions()
    console.log(options)
    console.log(await g.confirm())
    console.log(await g.confirm('aaa'))
  })
  .catch((err) => {
    console.error(err.message)
    if (err instanceof ArgumentError) {
      console.error(cmd.getUsage())
    }
    process.exit(err.status)
  })

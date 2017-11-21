'use strict'

const cmd = require('./src/cmd')
const validate = require('./src/validate')
const ArgumentError = require('./src/error/ArgumentError')

async function main () {
  const options = cmd.getOptions()
  if (options.help) {
    console.log(cmd.getUsage())
    process.exit(2)
  }
  const git = require('simple-git/promise')().silent(true)
  await validate(git, !!options.conform)
}

Promise
  .resolve()
  .then(() => {
    return main()
  })
  .catch((err) => {
    console.error(err.message.trim())
    if (err instanceof ArgumentError) {
      console.error(cmd.getUsage())
    }
    process.exit(err.status)
  })

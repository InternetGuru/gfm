'use strict'

const config = require('./packages/config')
const cmd = require('./packages/cmd')

try {
  const options = cmd.getOptions()
  console.log(options)
} catch (err) {
  let exitCode = 1
  switch (err.name) {
    case config.errors.argumentError:
      exitCode = 2
      break
  }
  console.log(err.toString())
  process.exit(exitCode)
}

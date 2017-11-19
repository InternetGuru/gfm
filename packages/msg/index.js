'use strict'

const ora = require('ora')

let verbose = true

function init (verbose) {
  verbose = verbose
}

function startMessage (msg, force) {
  if (!verbose) {
    return
  }
  return ora(msg).start()
}

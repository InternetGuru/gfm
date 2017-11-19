'use strict'

module.exports = class ArgumentError extends require('./AppError') {
  constructor (message) {
    super(`${message}\nGit is not conform with OMGF model (see conform option)`, 3)
  }
}

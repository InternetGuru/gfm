'use strict'

module.exports = class ArgumentError extends require('./AppError') {
  constructor (message) {
    // Overriding status code.
    super(message, 2)
  }
}

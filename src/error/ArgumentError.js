'use strict'

module.exports = class ArgumentError extends require('./AppError') {
  constructor (message) {
    super(message, 2)
  }
}

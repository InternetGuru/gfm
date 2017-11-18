'use strict'

const config = require('../config')

function isValidKeyword (kw) {
  return kw in config.keywords
}

exports.isValidKeyword = isValidKeyword

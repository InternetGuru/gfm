'use strict'

const config = require('../config')

function isValidKeyword (kw) {
  return kw in config.keywords
}

function isValidColor (color) {
  return color in config.colors
}

exports.isValidKeyword = isValidKeyword
exports.isValidColor = isValidColor

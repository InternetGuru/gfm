'use strict'

const config = require('../config')
const inquirer = require('inquirer')

function isValidKeyword (kw) {
  return kw in config.keywords
}

function isValidColor (color) {
  return color in config.colors
}

async function confirm (msg = 'Are you sure?') {
  const questions = {
    type: 'confirm',
    name: 'r',
    message: msg,
  }
  return inquirer.prompt(questions)
    .then(answer => {
      return answer.r
    })
}

exports.isValidKeyword = isValidKeyword
exports.isValidColor = isValidColor
exports.confirm = confirm

'use strict'

const commandLineArgs = require('command-line-args')
const config = require('../config')
const g = require('../globals')

const optionDefinitions = [
  {
    name: 'params',
    type: String,
    multiple: true,
    defaultOption: true,
  },
  {
    name: 'conform',
    alias: 'c',
    type: Boolean,
    description: 'Repair (initialize) project to be conform with OMGF model and proceed.',
  },
  {
    name: 'color',
    type: String,
    description: 'Use markers to highlight command status; WHEN is \'always\', \'never\', or \'auto\'.' +
    ' Empty WHEN sets color to \'always\'. Default color value is \'auto\'.',
  },
  {
    name: 'force',
    alias: 'f',
    type: Boolean,
    description: 'Move (stash and pop) uncommitted changes.',
  },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Print help.',
  },
  {
    name: 'init',
    alias: 'i',
    type: Boolean,
    description: 'Same as conform, but do not proceed.',
  },
  {
    name: 'dry-run',
    alias: 'n',
    type: Boolean,
    description: 'Do not run commands; only parse user options.',
  },
  {
    name: 'request',
    alias: 'r',
    type: Boolean,
    description: 'Instead of merging prepare current branch for pull request and push it to the origin.',
  },
  {
    name: 'verbose',
    alias: 'v',
    type: Boolean,
    description: 'Verbose mode.',
  },
  {
    name: 'version',
    alias: 'V',
    type: Boolean,
    description: 'Print version number.',
  },
  {
    name: 'what-now',
    alias: 'w',
    type: Boolean,
    description: 'Display what to do on current branch.',
  },
  {
    name: 'yes',
    alias: 'y',
    type: Boolean,
    description: 'Assume yes for all questions.',
  },
]

function getOptions () {
  try {
    const options = commandLineArgs(optionDefinitions)
    validateOptions(options)
    return options
  } catch (err) {
    throw new Error(err.message, config.errors.argumentError)
  }
}

function validateOptions (options) {
  if (options.params !== undefined) {
    if (options.params.length > 2) {
      throw new Error('Wrong number of parameters')
    }
    if (options.params.length === 2 && !g.isValidKeyword(options.params[0])) {
      throw new Error(`Parametr '${options.params[0]}' is not a valid keyword`)
    }
  }
  // allow null
  if (options.color && !(options.color in config.colors)) {
    throw new Error(`Option color has wrong value`)
  }
}

exports.getOptions = getOptions

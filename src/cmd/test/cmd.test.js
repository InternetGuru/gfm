'use strict'

const test = require('ava')
const cmd = require('../index')

test('pass with 0/1/2 argument(s)', t => {
  process.argv = ['.', '.']
  let options = cmd.getOptions()
  t.deepEqual(options, {}, 'no argument')
  process.argv = ['.', '.', 'hotfix']
  options = cmd.getOptions()
  t.deepEqual(options, {params: ['hotfix']}, 'one argument')
  process.argv = ['.', '.', 'hotfix', 'unicorn']
  options = cmd.getOptions()
  t.deepEqual(options, {params: ['hotfix', 'unicorn']}, 'two arguments')
})

test('more than two arguments fails', t => {
  process.argv = ['.', '.', 'hotfix', 'unicorn', 'horn']
  const error = t.throws(() => cmd.getOptions(), Error)
  t.is(error.message, 'Wrong number of parameters')
})

test('invalid first argument fails', t => {
  process.argv = ['.', '.', 'invalid', 'unicorn']
  const error = t.throws(() => cmd.getOptions(), Error)
  t.is(error.message, 'Parametr \'invalid\' is not a valid keyword')
})

test('parse known option', t => {
  process.argv = ['.', '.', '--verbose']
  let options = cmd.getOptions()
  t.deepEqual(options, {verbose: true}, 'long option')
  process.argv = ['.', '.', '-v']
  options = cmd.getOptions()
  t.deepEqual(options, {verbose: true}, 'short option')
})

test('parse unknown option fails', t => {
  process.argv = ['.', '.', '--unicorn']
  const error = t.throws(() => cmd.getOptions(), Error)
  t.is(error.message, 'Unknown option: --unicorn')
})

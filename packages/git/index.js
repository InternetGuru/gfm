'use strict'

async function isStatusEmpty (git) {
  const status = await git.raw(['status', '--porcelain'])
  return !!status
}

exports.isStatusEmpty = isStatusEmpty

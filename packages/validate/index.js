'use strict'

const AppError = require('../error/AppError')
const ConformError = require('../error/ConformError')
const g = require('../git')
const ora = require('ora')

async function checkRepository (git, conform) {
  try {
    await git.status()
  } catch (err) {
    if (!conform) {
      throw new ConformError('Git repository does not exist')
    }
    const spinner = ora('Initializing git repository').start()
    return git
      .init()
      .then(() => {
        spinner.succeed()
      })
      .catch(err => {
        spinner.fail()
        throw new AppError(err)
      })
  }
}

async function checkInitialCommit (git, conform) {
  try {
    await git.log()
  } catch (err) {
    if (!conform) {
      throw new ConformError('Git repository without commits')
    }
    const spinner = ora('Commit initial files').start()
    const status = await g.isStatusEmpty(git)
    if (status) {
      await git.add('./*')
    }
    return git
      .commit('Initial commit', [], {'--allow-empty': true})
      .then(() => {
        spinner.succeed()
      })
      .catch(err => {
        spinner.fail()
        throw new AppError(err)
      })
  }
}

async function validateGitRepository (git, conform) {
  await checkRepository(git, conform)
  await checkInitialCommit(git, conform)
  // TODO check master branch
}

module.exports = async function validate (git, conform) {
  // TODO validate_requirements
  // TODO validate_git_repository
  await validateGitRepository(git, conform)
  // TODO validate_gf_files
  // TODO validate_master_tag "$gf_branch"
  // TODO validate_dev
  // TODO validate_status_empty
  // TODO validate_changelog_heading
  // TODO load and validate user params
}

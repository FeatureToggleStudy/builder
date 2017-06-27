/* global process, console */
const fs = require('fs-extra')
const path = require('path')
const ElementsBuilder = require('../lib/elementsBuilder')
// const Spinner = require('cli-spinner').Spinner

/**
 * Build elements budle
 */
exports.build = (dir, repo, accountRepo, elements = []) => {
  dir = path.resolve(dir || process.cwd())
  if (!fs.lstatSync(dir).isDirectory()) {
    console.log("Can't create bundle. Wrong working directory.")
  }
  const b = new ElementsBuilder(dir, repo, accountRepo)
  b.build(elements, () => {
    console.log('Elements bundle zip archive created!')
  })
}
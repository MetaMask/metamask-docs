'use strict'
/**
 * Runs Husky after install when the devDependency is present (normal clone + npm install).
 * No-ops when devDependencies are omitted (e.g. npm ci with NODE_ENV=production) so prepare does not fail.
 */
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const bin = path.join(__dirname, '..', 'node_modules', 'husky', 'bin.js')
if (fs.existsSync(bin)) {
  execFileSync(process.execPath, [bin], { stdio: 'inherit' })
}

require('dotenv').config()

const { dev, build } = require('vuepress')
const config = require('../docs/.vuepress/config')()

const command = process.argv[2]

switch (command) {

  case 'build':
    return build(config)

  case 'dev':
    return dev(config)

  default:
    throw new Error(`Unrecognized command "${command}".`)
}
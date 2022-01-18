require('dotenv').config();

const { dev, build } = require('vuepress');
const config = require('../docs/.vuepress/config')();

const command = process.argv[2];

switch (command) {
  case 'build':
    build(config);
    return;

  case 'dev':
    dev(config);
    return;

  default:
    throw new Error(`Unrecognized command "${command}".`);
}

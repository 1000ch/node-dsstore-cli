#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const ora = require('ora');
const dsstore = require('dsstore');

const argv = minimist(process.argv.slice(2), {
  alias: {
    v: 'version',
    h: 'help',
    s: 'silent'
  }
});

if (argv.v || argv.version) {
  console.log(require('./package').version);
  return;
}

if (argv.h || argv.help) {
  fs.createReadStream(`${__dirname}/usage.txt`)
    .pipe(process.stdout)
    .on('close', () => process.exit(1));
  return;
}

const cwd = process.cwd();
const args = argv._.length ? argv._.map(arg => path.resolve(cwd, arg)) : [cwd];

(async () => {
  try {
    if (argv.s || argv.silent) {
      await dsstore(args);
    } else {
      const spinner = ora('Searching .DS_Store').start();

      await dsstore(args, path => {
        spinner.text = `Deleted ${path}`;
        spinner.succeed();
      });
    }
  } catch (error) {
    console.error(error)
  }
})();

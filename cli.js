#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import minimist from 'minimist';
import ora from 'ora';
import dsstore from 'dsstore';

(async () => {
  try {
    const argv = minimist(process.argv.slice(2), {
      alias: {
        v: 'version',
        h: 'help',
        s: 'silent',
      },
    });

    if (argv.v || argv.version) {
      const data = await fs.readFile(new URL('package.json', import.meta.url), 'utf8');
      const pkg = JSON.parse(data);
      console.log(pkg.version);
      process.exit(0);
    }

    if (argv.h || argv.help) {
      const data = await fs.readFile(new URL('usage.txt', import.meta.url), 'utf8');
      console.log(data);
      process.exit(0);
    }

    const cwd = process.cwd();
    const args = argv._.length === 0 ? [cwd] : argv._.map(arg => path.resolve(cwd, arg));

    if (argv.s || argv.silent) {
      await dsstore(args);
    } else {
      const spinner = ora('Searching .DS_Store');
      spinner.start();

      await dsstore(args, path => {
        spinner.text = `Deleted ${path}`;
        spinner.succeed();
      });

      process.exit(0);
    }
  } catch (error) {
    console.error(error);
  }
})();

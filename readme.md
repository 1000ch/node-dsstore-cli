# dsstore-cli ![GitHub Actions Status](https://github.com/1000ch/node-dsstore-cli/workflows/test/badge.svg?branch=main)

Command line interface for [dsstore](https://github.com/1000ch/node-dsstore).

## Install

```bash
$ npm i -g dsstore-cli
```

## Usage

```bash
Usage
  $ dsstore [<path|glob> ...]

Options
  --version, -v Output version
  --help, -h Output help
  --silent Hide output paths of removed .DS_Store

Examples
  $ dsstore
  $ dsstore path/to/folder
  $ dsstore foo bar
  $ dsstore --silent
```

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)

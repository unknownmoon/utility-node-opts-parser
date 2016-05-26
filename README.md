# utility-node-opts-parser

> Note that this project is still in preview stage

[![GitHub version](https://badge.fury.io/gh/unknownmoon%2Futility-node-opts-parser.svg)](https://badge.fury.io/gh/unknownmoon%2Futility-node-opts-parser)
[![Dependency Status](https://david-dm.org/unknownmoon/utility-node-opts-parser.svg)](https://david-dm.org/unknownmoon/utility-node-opts-parser)
[![devDependency Status](https://david-dm.org/unknownmoon/utility-node-opts-parser/dev-status.svg)](https://david-dm.org/unknownmoon/utility-node-opts-parser#info=devDependencies)

| Master | Develop |
| ------ | ------- |
| [![Build Status Master](https://travis-ci.org/unknownmoon/utility-node-opts-parser.svg?branch=master)](https://travis-ci.org/unknownmoon/utility-node-opts-parser) | [![Build Status Develop](https://travis-ci.org/unknownmoon/utility-node-opts-parser.svg?branch=develop)](https://travis-ci.org/unknownmoon/utility-node-opts-parser) |

Parse the opts feeding from environment variables or arguments. Won't handle `--test-opt="value"` case.

Supporting NodeJS 6 and above.
Basic unit test powered by [Mocha][mocha-link]/[Chai][chai-link]/[Sinon][sinon-link];

__Table of Contents__

<!-- MarkdownTOC -->

- [Initialisation](#initialisation)
- [Clean Up](#clean-up)
- [Test](#test)
- [Build](#build)
- [Generate JSDoc Documentation](#generate-jsdoc-documentation)

<!-- /MarkdownTOC -->

<a name="initialisation"></a>
## Initialisation

```bash
# Have Node ^6.0.0 & NPM ^3.8.6 installed

# install dependencies
npm install
```

<a name="clean-up"></a>
## Clean Up

```bash
# remove the built code, for now only the test result 
npm run clean

# remove the built code and node modules
npm run reset
```

<a name="test"></a>
## Test

Coverage report can be found in `./coverage` folder.

```bash
npm test
```

<a name="build"></a>
## Build

The source code is written in ES2015, hence before NodeJS fully support ES2015, we need to build the code to `es2015-node` using [Babel][babel-link].

The built code can be found in `./dist` folder. 

```bash
npm run build
```

<a name="generate-jsdoc-documentation"></a>
## Generate JSDoc Documentation

```bash
# generate the documentation
npm run doc

# serve the generated documentation using `http-server`
# note that no watch functionality is hooked, hence
# changing code won't trigger documentation regeneration.
npm run serve-doc
```

<!-- links -->
[mocha-link]: http://mochajs.org/
[chai-link]: http://chaijs.com/ 
[sinon-link]: http://sinonjs.org/
[babel-link]: https://babeljs.io/


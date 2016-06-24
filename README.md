# utility-node-opts-parser

> Note that this project is still in preview stage

[![GitHub version](https://badge.fury.io/gh/unknownmoon%2Futility-node-opts-parser.svg)](https://badge.fury.io/gh/unknownmoon%2Futility-node-opts-parser)
[![Dependency Status](https://david-dm.org/unknownmoon/utility-node-opts-parser.svg)](https://david-dm.org/unknownmoon/utility-node-opts-parser)
[![devDependency Status](https://david-dm.org/unknownmoon/utility-node-opts-parser/dev-status.svg)](https://david-dm.org/unknownmoon/utility-node-opts-parser#info=devDependencies)

| Master | Develop |
| ------ | ------- |
| [![Build Status Master](https://travis-ci.org/unknownmoon/utility-node-opts-parser.svg?branch=master)](https://travis-ci.org/unknownmoon/utility-node-opts-parser) | [![Build Status Develop](https://travis-ci.org/unknownmoon/utility-node-opts-parser.svg?branch=develop)](https://travis-ci.org/unknownmoon/utility-node-opts-parser) |
| [![codecov](https://codecov.io/gh/unknownmoon/utility-node-opts-parser/branch/master/graph/badge.svg)](https://codecov.io/gh/unknownmoon/utility-node-opts-parser) | [![codecov](https://codecov.io/gh/unknownmoon/utility-node-opts-parser/branch/develop/graph/badge.svg)](https://codecov.io/gh/unknownmoon/utility-node-opts-parser) |

Parse the opts feeding from environment variables or arguments.

Supported cases:

1. Short/long named options is set/unset
2. Short/long named options with value

Won't handle `--test-opt="value"` (delimiter) case, which using `=` in the middle of the option name and value.

Supporting NodeJS 6 and above.
Basic unit test powered by [Mocha][mocha-link]/[Chai][chai-link]/[Sinon][sinon-link];

__Table of Contents__

<!-- MarkdownTOC -->

- [Usage](#usage)
    - [Install from GitHub Repository](#install-from-github-repository)
    - [APIs](#apis)
        - [Examples](#examples)
- [Development](#development)
    - [Initialisation](#initialisation)
    - [Clean Up](#clean-up)
    - [Test](#test)
    - [Build](#build)
    - [Generate JSDoc Documentation](#generate-jsdoc-documentation)
    - [Release](#release)

<!-- /MarkdownTOC -->

<a name="usage"></a>
## Usage

<a name="install-from-github-repository"></a>
### Install from GitHub Repository

```bash
# command format
npm install --save github:unknownmoon/utility-node-opts-parser#<version>

# example
npm i -S github:unknownmoon/utility-node-opts-parser#v0.0.4
```

<a name="apis"></a>
### APIs

Reference to the JSDoc. [Generate JSDoc Documentation](#generate-jsdoc-documentation)

<a name="examples"></a>
#### Examples

1. Get options values from environment variables

    ```javascript
    // import functions from the module.
    import { getOptsFromArgv } from 'utility-node-opts-parser';

    let opts = getOptsFromArgv(...['OPT1', 'OPT2']);

    // value of OPT1
    opts.get('OPT1');

    // value of OPT2
    opts.get('OPT2');
    ```

2. Get options values from arguments

    ```javascript
    // import functions from the module.
    import { getOptsFromEnv } from 'utility-node-opts-parser';

    let opts = getOptsFromEnv(...['OPT1', 'OPT2']);

    // value of OPT1
    opts.get('OPT1');

    // value of OPT2
    opts.get('OPT2');
    ```

3. Get options values from either environment variables or arguments

    ```javascript
    // import functions from the module.
    import { getOpts } from 'utility-node-opts-parser';

    let opts = getOpts(...['OPT1', 'OPT2']);

    // value of OPT1
    opts.get('OPT1');

    // value of OPT2
    opts.get('OPT2');
    ```

4. Has options APIs `hasOpts`, `hasOptsInEnv`, `hasOptsInArgv` are following the save pattern, but return `true`/`false`

<a name="development"></a>
## Development

<a name="initialisation"></a>
### Initialisation

```bash
# Have Node ^6.0.0 & NPM ^3.8.6 installed

# install dependencies
npm install
```

<a name="clean-up"></a>
### Clean Up

```bash
# remove the built code, for now only the test result 
npm run clean

# remove the built code and node modules
npm run reset
```

<a name="test"></a>
### Test

Coverage report can be found in `./coverage` folder.

```bash
npm test
```

<a name="build"></a>
### Build

The source code is written in ES2015, hence before NodeJS fully support ES2015, we need to build the code to `es2015-node` using [Babel][babel-link].

The built code can be found in `./dist` folder. 

```bash
npm run build
```

<a name="generate-jsdoc-documentation"></a>
### Generate JSDoc Documentation

```bash
# generate the documentation
npm run doc

# serve the generated documentation using `http-server`
# note that no watch functionality is hooked, hence
# changing code won't trigger documentation regeneration.
npm run serve-doc
```

<a name="release"></a>
### Release

Shorthand script to generate release content, including `./coverage`, `./jsdoc` and `./dist`.

```bash
npm run release
```

<!-- links -->
[mocha-link]: http://mochajs.org/
[chai-link]: http://chaijs.com/ 
[sinon-link]: http://sinonjs.org/
[babel-link]: https://babeljs.io/


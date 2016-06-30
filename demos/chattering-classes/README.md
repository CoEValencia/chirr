# Chattering Classes
## Chirr demo chat server

### Prerequisites

Your system needs to have *Node.js*, and its package manager *npm*, installed. Any version higher than 4 should work. Node and npm come together in a single installation package which can be [downloaded here](https://nodejs.org/en/download/).

### Installation dependencies

Install local dependencies, including Babel, with npm:

    $ npm install

Install mocha testing with npm:

    $ npm install ‐g mocha

Optionally install node-inspector for debugging:

    $ npm install ‐g node‐inspector

## Usage

The source files, stored in folder *"src"*, are written in ECMAScript 2015, the latest standard for JavaScript. As even most modern browsers do not fully support all aspects of the standard, the project is configured to use Babel, a so-called *transpiler*, which translates (or compiles) ES2015 code to "old" JavaScript. Unit tests are written in ECMAScript 2015 as well and are stored in the *"test"* folder.

The source fles can be compiled and the unit tests can be run through the `run` module of npm:

    npm run test      - compile and run unit tests
    npm run buildtest - compile source files and then compile and run unit tests
    npm run build     - compile source files
    npm run build     - compile "minified" version of source files

The compiled files are stored in the folder *"lib"*. The service can be run with

    node lib/index.js

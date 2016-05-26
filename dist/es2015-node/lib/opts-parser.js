"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanonicalOptName = getCanonicalOptName;
exports.getEnv = getEnv;
exports.getArgv = getArgv;
exports.hasOptsInEnv = hasOptsInEnv;
exports.hasOptsInArgv = hasOptsInArgv;
exports.hasOpts = hasOpts;
exports.getOptsFromEnv = getOptsFromEnv;
exports.getOptsFromArgv = getOptsFromArgv;
exports.getOpts = getOpts;
/**
 * @module opts-parser
 *
 * @desc Parse the opts feeding from environment variables or arguments. Won't handle `--test-opt="value"` case.
 */

// cache the env and argv since it unlikely to change those info on-the-fly, hopefully...
const cache = {};

/**
 * Get the canonical option name in the arguments.
 * For example, when query `opt`, will return `--opt`; while query `o`, will return `-o`.
 *
 * @param  {String} optName option name in `opt-name`, `--opt-name` or `-o` format
 * @return {String}   corresponding option name in `--opt-name` or `-o` format
 */
function getCanonicalOptName(optName) {

  const prefixedOptReg = new RegExp(`^(?:-{1,2})(.+)$`);

  if (prefixedOptReg.test(optName)) {
    // prefixed argument found,
    // hence verify it directly
    return optName;
  } else if (optName.length === 1) {
    // non-prefixed argument found,
    // hence verify it by appending `-`
    return `-${ optName }`;
  }

  // non-prefixed argument found, and the length is longer than 1,
  // hence verify it by appending `-`
  return `--${ optName }`;
}

/**
 * Get the environment variables from `process.env`.
 *
 * @return {Object} result of `process.env`
 */
function getEnv() {
  if (!cache.env) {
    cache.env = process.env;
  }

  return cache.env;
}

/**
 * Get the arguments when starting the application from `process.argv`.
 * Filtered the `node` command and the name of script.
 *
 * @return {Array} the arguments apart from `node` command and the name of script
 */
function getArgv() {

  if (!cache.argv) {
    const NODE_IDX = 0;
    const SCRIPT_IDX = 1;

    cache.argv = process.argv.filter((val, idx) => {

      if (idx === NODE_IDX || idx === SCRIPT_IDX) {
        return false;
      }

      return true;
    });
  }

  return cache.argv;
}

/**
 * Check if the given options exist in the environment variables.
 *
 * @param  {...String} opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: Boolean }` format.
 */
function hasOptsInEnv(...opts) {

  const env = getEnv();
  const result = new Map();

  for (const opt of opts) {
    result.set(opt, env.hasOwnProperty(opt));
  }

  return result;
}

/**
 * Check if the given options exist in the arguments to start the application.
 *
 * @param  {...String} opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: Boolean }` format.
 */
function hasOptsInArgv(...opts) {

  const argv = getArgv();
  const result = new Map();

  for (const opt of opts) {
    result.set(opt, argv.includes(getCanonicalOptName(opt)));
  }

  return result;
}

/**
 * Check if the given options exist in either the environment variables or the arguments to start the application.
 *
 * @param  {...String} opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: Boolean }` format.
 */
function hasOpts(...opts) {
  const resultInEnv = hasOptsInEnv(...opts);
  const result = hasOptsInArgv(...opts);

  for (const entry of resultInEnv.entries()) {
    // if entry value is true or the result is true, the final value should be true,
    // otherwise should be false.
    result.set(entry[0], entry[1] || result.get(entry[0]) || false);
  }

  return result;
}

/**
 * Retrieve the value of the given options exist in either the environment.
 *
 * @param  {...String} opts opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: value }` format. Non-exist opts will be `null`.
 */
function getOptsFromEnv(...opts) {

  const env = getEnv();
  const result = new Map();

  for (const opt of opts) {

    if (env.hasOwnProperty(opt)) {
      result.set(opt, env[opt]);
    } else {
      result.set(opt, null);
    }
  }

  return result;
}

/**
 * Retrieve the value of the given options exist in the arguments to start the application.
 *
 * @param  {...String} opts opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: value }` format. Non-exist opts will be `null`.
 */
function getOptsFromArgv(...opts) {

  const argv = getArgv();
  const result = new Map();

  for (const opt of opts) {

    const optName = getCanonicalOptName(opt);
    const nextOptIdx = argv.indexOf(optName) + 1;

    if (nextOptIdx < argv.length) {

      const nextOpt = argv[nextOptIdx];

      // if the next opt is an option name
      // then the value of this option is null
      if (getCanonicalOptName(nextOpt) === nextOpt) {
        result.set(opt, null);
      } else {
        result.set(opt, nextOpt);
      }
    } else {
      result.set(opt, null);
    }
  }

  return result;
}

/**
 * Retrieve the value of the given options exist in either the environment variable or the arguments to start the application.
 *
 * @param  {...String} opts opts option name(s).
 * @return {Map}    a map of the results, in `{ optName: value }` format. Non-exist opts will be `null`.
 */
function getOpts(...opts) {

  const resultFromEnv = getOptsFromEnv(...opts);
  const result = getOptsFromArgv(...opts);

  for (const entry of resultFromEnv.entries()) {

    const entryKey = entry[0];
    const entryVal = entry[1];
    const optVal = result.get(entryKey);

    result.set(entryKey, optVal === null ? entryVal : optVal);
  }

  return result;
}
//# sourceMappingURL=opts-parser.js.map

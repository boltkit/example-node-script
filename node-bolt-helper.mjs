/*
  USAGE
    import {getJobResult, getPipelineArg, getJobResultJson, setJobResult} from "./node-bolt-helper.mjs";

    getJobResult(0, default value)
    getPipelineArg(BOLT_ARG_CHANGE_DATA, default value)
    setJobResult(...)
*/

import fs from 'node:fs'; 

/**
 * Returns all pipeline arguments
 */
const __getPipelineArgs = () => {
  const arr = Object.entries(process.env).map(el => ({name: el[0], value: el[1]}));
  const args = arr.filter(el => el.startsWith("BOLT_ARG_") || el.startsWith("bolt_arg_"));
  return args;
};

/**
 * Find pipeline arg by name, attempt to parse and return
 */
const getPipelineArg = (name) => {
  const args = __getPipelineArgs();
  const arg = args[name] || null;
  try {
    return JSON.parse(arg);
  } catch (err) {
    return arg;
  }
};

/**
 * Attempts to parse previous job result and return it as Object, String or null if not found
 */
const getJobResultJson = (jobId) => {
  const resultFilename = process.env[`__JOB_${jobId}_RESULT_FILE__`];
  if (resultFilename) {
    console.log(`job result file = ${resultFilename}`);
    let content = null;

    // try to read the result file
    try {
      content = fs.readFileSync(resultFilename, 'utf8'); 
    } catch (err) {
      console.log(err);
      return null;
    }

    // try to parse it
    try {
      return JSON.parse(content);
    } catch (err) {
      // can't parse, not a json
      return content;
    }
  }
  return null;
};

/**
 * Set current job result
 *
 * @param {Object|String} res
 */
const setJobResult = (res) => {
  if (process.env.__JOB_RESULT_FILE__) {
    if (typeof res === "object") {
      fs.writeFileSync(process.env.__JOB_RESULT_FILE__, JSON.stringify(res), { encoding: "utf8" }); 
    } else {
      fs.writeFileSync(process.env.__JOB_RESULT_FILE__, res);
    }
  }
};

export { getPipelineArg, getJobResultJson, setJobResult };

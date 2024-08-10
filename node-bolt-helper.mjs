
/*
  // rerun: run copy  (see how to run specific version ??? or fuck ???)
  // make better errors
  // before_script
  // prometheus exporter
*/

/*
  USAGE
    bolth = require('bolt-pipeline-helper');

    bolth.getJobResult(0, default value)
    bolth.getPipelineArg(BOLT_ARG_CHANGE_DATA, default value)
    bolth.setJobResult(...)
*/


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
const getJobResult = (jobId) => {
  const raw = process.env[`__JOB_${jobId}_RESULT_FILE__`];
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (err) {
      // can't parse, not a json
      return raw;
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
  if (typeof res === "object") {
    fs.writeFileSync(process.env.__JOB_RESULT_FILE__, JSON.stringify(res)); 
  } else {
    fs.writeFileSync(process.env.__JOB_RESULT_FILE__, res);
  }
  
};



export { getPipelineArg, getJobResult, setJobResult };

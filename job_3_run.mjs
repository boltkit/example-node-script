import {getJobResultJson} from "./node-bolt-helper.mjs"

const color = getJobResultJson(0)
const temp = getJobResultJson(1)
const time = getJobResultJson(2)

console.log(color)
console.log(temp)
console.log(time)
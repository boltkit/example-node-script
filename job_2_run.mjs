import {setJobResult} from "@boltkit/bolt-helper-node";

const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam");
if (!res.ok) {
  throw new Error(`Response status: ${res.status}`);
}
const json = await res.json();
console.log(json.time);

setJobResult(json.time);
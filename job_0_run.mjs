import {setJobResult} from "@boltkit/bolt-helper-node";

const res = await fetch("https://random-data-api.com/api/color/random_color");
if (!res.ok) {
  throw new Error(`Response status: ${res.status}`);
}
const json = await res.json();
console.log(json.color_name);

setJobResult(json.color_name);
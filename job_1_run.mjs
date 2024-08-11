import {setJobResult} from "./node-bolt-helper.mjs";

const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");
if (!res.ok) {
  throw new Error(`Response status: ${res.status}`);
}
const json = await res.json();
console.log(json.current.temperature_2m);

setJobResult(json.current.temperature_2m);
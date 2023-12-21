const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

function mapper(index, map, end){
  for (let i = index + 1; i < input.length - 1; i++){
    if (input[i].includes(end)) return i;

    values = input[i].split(' ');
    dest = Number(values[0]);
    source = Number(values[1]);
    range = Number(values[2]);
    
    //set map values:
    for (let j = 0; j < range; j++){
      map.set(source + j, dest + j);
    }
  }
}

//extract initial seeds
let init_seeds = input[0].replace('seeds: ', '').split(' ');
let index = 2;

//extract seed-to-soil map:
let seed2soil = new Map();
index = mapper(index, seed2soil, 'soil-to-fertilizer');

//extract soil-to-fertilizer map:
let soil2fert = new Map();
index = mapper(index, soil2fert, 'fertilizer-to-water');

//extract fertilizer-to-water map:
let fert2watr = new Map();
index = mapper(index, fert2watr, 'water-to-light');

//extract water-to-light map:
let watr2lite = new Map();
index = mapper(index, watr2lite, 'light-to-temperature');

//extract lite-to-temperature
let lite2temp = new Map();
index = mapper(index, lite2temp, 'temperature-to-humidity');

//extract temperature-to-humidity
let temp2humi = new Map();
index = mapper(index, temp2humi, 'humidity-to-location');

//extract humidity-to-location
let humi2lctn = new Map();
index = mapper(index, humi2lctn, 'end');

//console.log(seed2soil, soil2fert, fert2watr, watr2lite, lite2temp, temp2humi, humi2lctn);

function trace_seed(seed){
  dest = seed2soil.has(seed) ? seed2soil.get(seed) : seed;
  dest = soil2fert.has(dest) ? soil2fert.get(dest) : dest;
  dest = fert2watr.has(dest) ? fert2watr.get(dest) : dest;
  dest = watr2lite.has(dest) ? watr2lite.get(dest) : dest;
  dest = lite2temp.has(dest) ? lite2temp.get(dest) : dest;
  dest = temp2humi.has(dest) ? temp2humi.get(dest) : dest;
  dest = humi2lctn.has(dest) ? humi2lctn.get(dest) : dest;
  return dest;
}

let seed_map = new Map();
for (let i = 0; i < init_seeds.length; i++){
  seed_map.set(Number(init_seeds[i]), trace_seed(Number(init_seeds[i])));
}

console.log(seed_map);


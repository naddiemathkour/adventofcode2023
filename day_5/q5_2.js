const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');
let index = 2;

function mapper(){
  let arr = [];
  for (index++; index < input.length; index++){
    if (input[index] == ''){
      index++;
      return arr;
    }
    arr.push([...input[index].replace('\n', '').split(' ')].map(Number));
  }
}

//extract seed numbers
init_seeds = input[0].replace('seeds: ', '').split(' ').map(Number);

//extract all maps from input:
let seed2soil = mapper();
let soil2fert = mapper();
let fert2watr = mapper();
let watr2lite = mapper();
let lite2temp = mapper();
let temp2humi = mapper();
let humi2lctn = mapper();

let trace_seed = new Map();
const trace_arr = [seed2soil, soil2fert, fert2watr, watr2lite, lite2temp, temp2humi, humi2lctn];

function tracer(source, count){
  if (count == 7) return source;
  let dest_start, source_start, range;
  
  for (let i = 0; i < trace_arr[count].length; i++){
    dest_start = trace_arr[count][i][0];
    source_start = trace_arr[count][i][1];
    range = trace_arr[count][i][2];

    if (source_start <= source && (source_start + range) >= source){
      return (source_start < source) ? tracer(dest_start + (source - source_start), count + 1)
      :
      tracer(source, count + 1);
    }
    else if (i == trace_arr[count].length - 1){
      return tracer(source, count + 1);
    }
  }
}

for (let i = 0; i < init_seeds.length; i++){
  trace_seed.set(init_seeds[i], tracer(init_seeds[i], 0));
}

let solutions = [...trace_seed.values()];

console.log('Part 1:', Math.min(...solutions));

let start, end, min, curr;
min = Infinity;
for (let i = 0; i < init_seeds.length - 1; i+=2){
  start = init_seeds[i];
  end = start + init_seeds[i + 1];
  for (let j = start; j < end; j++){
    curr = tracer(j, 0);
    min = (curr < min) ? curr : min;
  } 
}

console.log('Part 2:', min - 1); //99751241 too high

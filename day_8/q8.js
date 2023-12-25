const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');
const directions = input[0];
let locations = new Map();
let starts = [];
let part2 = false;
let count = 0;

function get_direction(location, direction){
  let temp = locations.get(location);
  if (direction == 'L'){
    return temp.substring(1, 4);
  }
  else {
    return temp.substring(6, 9);
  }
}

function navigate(location){
  let temp = location;
  if (!part2)
  for (let i = 0; i < directions.length; i++){
    temp = get_direction(temp, directions[i]);
    count++;
    if (temp === 'ZZZ') break;
  }
  if (part2)
  for (let i = 0; i < directions.length; i++){
    temp = get_direction(temp, directions[i]);
    count++;
  }
  return temp;
}

function map_input(){
  for (let i = 2; i < input.length - 1; i++)
    locations.set(input[i].substring(0, 3), input[i].substring(6,16));
}

function find_positions(){
  for (let i = 2; i < input.length - 1; i++){
    if (input[i].substring(2, 3) == 'A') starts.push(input[i].substring(0, 3));
  }
}

function GCD(a, b){
  console.log('A:', a, 'B:', b)
  if (!b) return a;
  return GCD(b, a % b);
}

function LCM(a, b){
  return (a * b) / GCD(a, b);
}

function main(){
  count = 0;
  let curr;
  map_input();

  if (part2){
    let start_map = new Map();
    find_positions();
    for (let i = 0; i < starts.length; i++){
      curr = starts[i];
      while (curr[2] != 'Z'){
        curr = navigate(curr);
      }
      start_map.set(starts[i], count);
      count = 0;
    }
    console.log(start_map);
    let values = [...start_map.values()].sort((a, b) => a - b);
    let result = LCM(values[0], values[1]);
    for (let i = 2; i < values.length; i++){
      result = LCM(result, values[i]);
    }
    console.log('Part2: ', result); //13740108158591
  }

  if (!part2){
    curr = 'AAA';
    while(curr !== 'ZZZ'){
      curr = navigate(curr);
    }
  console.log('Part1: ', count);
  }
}

main();
part2 = true;
main();

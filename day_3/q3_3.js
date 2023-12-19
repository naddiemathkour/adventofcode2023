const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

const line_length = input[0].length;

let sum = 0;
let connections = [];
let gear_sum = 0;

function extract_numbers(line, index){
  let temp = '';
  let i = index;
  //while this index is still a number, move cursor left
  while (!isNaN(Number(input[line][i-1]))) i--;
  //while this index is still a number, append to temp and move right
  while (!isNaN(Number(input[line][i]))){
    temp += input[line][i];
    i++;
  }
  console.log("Found Value:", temp);
  connections.push(temp);
  sum += Number(temp);
  return i;
}

function check_collision(sym_line, sym_index){
  for(let line = -1; line < 2; line++){
    for(let i = sym_index - 1; i < sym_index + 2; i++){
      if (!isNaN(Number(input[sym_line + line][i]))){
        i = extract_numbers(sym_line + line, i);
      }
    }
  }
}

for (let i = 0; i < input.length - 2; i++){
  let line = input[i];
  for (let j = 0; j < line_length; j++){
    //find all non-period symbols in current parsed line
    if (line[j] != '.' && isNaN(Number(line[j]))){
      check_collision(i, j); 
    }
  }
}

function check_gear(gear_line, gear_index){
  connections = [];
  for(let line = -1; line < 2; line++){
    for(let i = gear_index - 1; i < gear_index + 2; i++){
      if (!isNaN(Number(input[gear_line + line][i]))){
        i = extract_numbers(gear_line + line, i);
      }
    }
  }
  if (connections.length == 2){
    gear_sum += (connections[0] * connections[1]);
  }
}
const sum_result = sum;

for (let i = 0; i < input.length-2; i++){
  let line = input[i];
  for (let j = 0; j < line_length; j++){
    if (line[j] == '*'){
      check_gear(i, j);
    }
  }
}

console.log('Sum: ', sum_result);// not 543274
console.log('Gear Sum: ', gear_sum);

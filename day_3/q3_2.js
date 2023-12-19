const { warn } = require('console');
const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

let num_map = new Map();
let num = '';
let sum = 0;

function check_collision(line, index){
  let temp, temp2;
  let padding;
  let values = num_map.get(line).sort();
  
  //console.log(values);
  for (let i = 0; i < values.length; i++){
    temp = input[line].indexOf(values[i]);
    temp2 = input[line].lastIndexOf(values[i])
    if (index >= temp-1 && index <= temp + values[i].length
    ||
      index >= temp2-1 && index <= temp2 + values[i].length
    ){
      console.log('Index: ', index, 'Start: ', temp-1, 'End: ', temp+values[i].length, values[i]);
      console.log('Values index: ', input[line].indexOf(values[i]));
      sum += Number(values[i]);
      padding = '';
      for (let j = 0; j < values[i].length; j++){
        padding += '.';
      }
      //input[line] = input[line].replace(values[i], padding);
      //console.log(input[line]);
    }
  }
}

function check_poss(line, index){
  //if the previous line exists in the num_map Map then check for collision:
  if (num_map.get(line-1)) check_collision(line-1, index);
  if (num_map.get(line)) check_collision(line, index);
  if (num_map.get(line+1)) check_collision(line+1, index);
}

//map indexes to the numbers within that index's row as arrays
for (let i = 0; i < input.length - 1; i++){
  let row_arr = [];
  for (let j = 0; j < input[i].length; j++){
    if (input[i][j] != ['.'] && !isNaN(Number(input[i][j]))){
      num = input[i][j];
      while(!isNaN(Number(input[i][++j]))) num += input[i][j];
      row_arr.push(num);
    }
  }
  if (row_arr.length > 0) num_map.set(i, row_arr);
}

//search input for symbols, then check for collision in the num_map Map
for (let i = 0; i < input.length - 1; i++){
  for (let j = 0; j < input[i].length; j++){
    //if the character is a symbol:
    if (input[i][j] != '.' && isNaN(Number(input[i][j]))){
      check_poss(i, j);
    }
  }
}

console.log('Final Sum: ',sum);
//518436 too low

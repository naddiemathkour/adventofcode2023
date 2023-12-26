const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

function parse_future(data){
  //recursively get down to 0 for all indexes
  let temp = [];
  for (let i = data.length - 1; i > 0; i--){
    temp.push(data[i] - data[i - 1]);
  }

  if (Number(temp.join().replace(/,/g, '')) != 0){
    let history = parse_history(temp.reverse());
    data.push(data[data.length-1] + history);
  }

  return data.pop();
}

function parse_history(data){
  //recursively get down to 0 for all indexes
  let temp = []; 
  for (let i = data.length - 1; i > 0; i--){
    temp.push(data[i] - data[i - 1]);
  }

  if (Number(temp.join().replace(/,/g, '')) != 0){
    let history = parse_history(temp.reverse());
    data[0] = data[0] - history;
  }

  return data[0];
}

function part1(){
  let count = 0;
  for (let i = 0; i < input.length - 1; i++){
    count += parse_future(input[i].split(' ').map(Number));
  }
  console.log('Part1: ', count);
}

function part2(){
  let count = 0;
  for (let i = 0; i < input.length - 1; i++){
    count += parse_history(input[i].split(' ').map(Number));
  }
  console.log('Part2: ', count);
}

part1(); //1009737903
part2(); //905

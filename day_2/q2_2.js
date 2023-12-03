const fs = require('fs');

function parse_input(input){
  //remove 'Game x: ' from input string, trim strings, separate games in an array
  return input.slice(input.indexOf(':') + 1).replaceAll(' ', '').split(';');
}

function check_game(input){
  const cubes = {
    blue: 14,
    red: 12,
    green: 13
  };

  let temp = input.join().split(',');

  for (let i = 0; i < temp.length; i++){
    if (temp[i].includes('blue'))
      if (Number(temp[i].replaceAll(/\D/gi, '')) > cubes.blue) return false;
    if (temp[i].includes('red'))
      if (Number(temp[i].replaceAll(/\D/gi, '')) > cubes.red) return false;
    if (temp[i].includes('green'))
      if (Number(temp[i].replaceAll(/\D/gi, '')) > cubes.green) return false;
  }
  return true;
}

function get_mins(input){
  let cubes = [0, 0, 0];
  let temp = input.join().split(',');
  let num;

  for (let i = 0; i < temp.length; i++){
    num = Number(temp[i].replaceAll(/\D/gi, ''));
    if (temp[i].includes('blue') && num > cubes[0]) cubes[0] = num;
    if (temp[i].includes('red') && num > cubes[1]) cubes[1] = num;
    if (temp[i].includes('green') && num > cubes[2]) cubes[2] = num;
  }

  return cubes[0] * cubes[1] * cubes[2];
}

function part_one(input){
  let current_game;
  let sum = 0;

  for (let i = 0; i < input.length - 1; i++){
    current_game = parse_input(input[i]);
    if (check_game(current_game)) sum += i + 1;
  }
  console.log('Part 1 solution: ' + sum);
}

function part_two(input){
  let current_game;
  let power_sum = 0;

  for (let i = 0; i < input.length - 1; i++){
    current_game = parse_input(input[i]);
    power_sum += get_mins(current_game);
  }
  console.log('Part 2 solution: ' + power_sum);
}

function main(input){
  part_one(input);
  part_two(input);
}

main(fs.readFileSync('input', 'utf-8').split('\n'));

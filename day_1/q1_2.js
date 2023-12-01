const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8').split('\n');

function part1(input){
  let curr;
  let sum = 0;
  for (let i = 0; i < input.length - 1; i++){
    curr = input[i].replaceAll(/\D/g, '');
    sum += Number(curr[0] + curr[curr.length - 1]);
  }
  console.log('Part 1 solution: ' + sum);
}

const needles = new Map([
  ['zero', '0'],
  ['one', '1'],
  ['two', '2'],
  ['three', '3'],
  ['four', '4'],
  ['five', '5'],
  ['six', '6'],
  ['seven', '7'],
  ['eight', '8'],
  ['nine', '9']
]);

const strings = [...needles.keys(needles)];
const nums = [...needles.values(needles)];

function parse_ends(line){
  let retval = '';
  let temp;
  let k = 0;
  while (k < line.length){
    temp = line.slice(0, k);

    for (let i = 0; i < 10; i++)
      if (temp.includes(strings[i]) || temp.includes(nums[i])){
        retval += String(i);
        break;
      }

    if (retval != '') break;

    k++;
  }
  
  k = line.length - 1;
  while (k >= 0){
    temp = line.slice(k, line.length);

    for (let i = 0; i < 10; i++)
      if (temp.includes(strings[i]) || temp.includes(nums[i])){
      retval += String(i);
      break;
      }

    if (retval.length == 2) break;

    k--;
  }

  return retval;
}

function part2(input){
  let curr;
  let sum = 0;
  for (let i = 0; i < input.length - 1; i++){
    curr = parse_ends(input[i]);
    sum += Number(curr[0] + curr[curr.length - 1]);
  }
  console.log('Part 2 solution: ' + sum);
}

part1(input);
part2(input);


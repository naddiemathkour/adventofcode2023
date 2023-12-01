const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

function parse_input(line){
  let retval = line.replaceAll('oneight', '18');
  retval = retval.replaceAll('sevenine', '79');
  retval = retval.replaceAll('twone', '21');
  retval = retval.replaceAll('nineight', '98');
  retval = retval.replaceAll('zerone', '01');
  retval = retval.replaceAll('fiveight', '58');
  retval = retval.replaceAll('threeight', '38');
  retval = retval.replaceAll('eightwo', '82');
  retval = retval.replaceAll('one', '1');
  retval = retval.replaceAll('two', '2');
  retval = retval.replaceAll('three', '3');
  retval = retval.replaceAll('four', '4');
  retval = retval.replaceAll('five', '5');
  retval = retval.replaceAll('six', '6');
  retval = retval.replaceAll('seven', '7');
  retval = retval.replaceAll('eight', '8');
  retval = retval.replaceAll('nine', '9');
  retval = retval.replaceAll('zero', '0');

  return retval;
}

let sum = 0;
for (let i = 0; i < input.length - 1; i++){
  console.log(input[i]);
  let curr_vals = parse_input(input[i]);
  curr_vals = curr_vals.replaceAll(/\D/g, '').split('');
  console.log(curr_vals[0], curr_vals[curr_vals.length-1]);
  sum += Number(curr_vals[0] + curr_vals[curr_vals.length-1]);

  console.log('Sum = ' + sum);
}

console.log(sum); //54653 too high

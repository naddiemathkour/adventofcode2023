const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8').split('\n');

let curr;
let sum = 0;
let curr_game;

function check_grab(grabs) {
  let min_arr = [0, 0, 0];
  let curr = grabs.join().split(', ');
  let temp;
  //console.log(curr);
  for (let i = 0; i < curr.length; i++){
    if (curr[i].includes('blue')){
      temp = curr[i].replaceAll(/\D/gi, '');
      if (temp > min_arr[0]) min_arr[0] = Number(temp);
      //if (Number(temp) >= 15) return false;
    }

    else if (curr[i].includes('red')){
      temp = curr[i].replaceAll(/\D/gi, '');
      if (temp > min_arr[1]) min_arr[1] = Number(temp);
      //if (Number(temp) >= 13) return false;
    }

    else if (curr[i].includes('green')){
      temp = curr[i].replaceAll(/\D/gi, '');
      if (temp > min_arr[2]) min_arr[2] = Number(temp);
      //if (Number(temp) >= 14) return false;
    }
  }
  sum += (min_arr[0] * min_arr[1] * min_arr[2]);
  console.log(min_arr);
  console.log(grabs);
  return true;
}


for (let i = 0; i < input.length - 1; i++){
  //parse out game id 
  curr_game = input[i].slice(4, input[i].indexOf(':'));

  //parse out 'Game %d: ' from line
  curr = input[i].slice(input[i].indexOf(':') + 2, input[i].length);

  //split each grab sample into into its own array index
  curr = curr.split(';');

  //console.log(curr);
  
  if (!check_grab(curr)) continue;
  console.log(sum);
  //else sum += Number(curr_game);
}

console.log(sum);

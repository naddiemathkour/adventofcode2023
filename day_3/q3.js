const fs = require('fs');
const input = fs.readFileSync('input_sample', 'utf-8').split('\n');


let symbols = [];
let numbers = [];

for (let i = 0; i < input.length - 1; i++){
  symbols.push(input[i].replace(/[0-9]/g, '.'));
}

for (let i = 0; i < input.length - 1; i++){
  numbers.push(input[i].replace(/\D/g, '.'));
}

let part_numbers = new Map();
let temp;
for (let i = 0; i < numbers.length; i++){
  temp = numbers[i].match(/(\d+)/gi);
  if (!temp) continue;
  for (let j = 0; j < temp.length; j++){
    if (!part_numbers.has(i))
      part_numbers.set(i, [temp[j], numbers[i].indexOf(temp[j]) - 1, numbers[i].indexOf(temp[j]) + temp[j].length]);
    else{
      let arr_to_splice = [...part_numbers.get(i)];
      part_numbers.set(
        i,
        arr_to_splice.splice(
          arr_to_splice.length,
          0,
          temp[j], numbers[i].indexOf(temp[j]) - 1, numbers[i].indexOf(temp[j]) + temp[j.length]
        )
      );
    }
  } 
}
//console.log(symbols);
//console.log(numbers);

console.log(part_numbers);
console.log(symbols)
for (let i = 0; i < symbols.length; i++){
  for (let j = 0; j < symbols[i].length; j++){
    if (symbols[i][j] != '.'){
      console.log(i, j, symbols[i][j]);
      
    }
  }
}

//console.log([...part_numbers.values(part_numbers)])

//console.log(numbers[2].includes(test[1]));

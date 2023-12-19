const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

let card, temp, winning_numbers, card_nums, card_points, total_points;

total_points = 0;

for (let i = 0; i < input.length - 1; i++){
  temp = input[i].split(':');
  card = temp[1].split('|');

  winning_numbers = card[0].trim().replaceAll('  ', ' ').split(' ');
  card_nums = card[1] + ' ';
  card_points = 0;

  for (let j = 0; j < winning_numbers.length; j++){
    if (card_nums.includes(' ' + winning_numbers[j] + ' ')){
      card_points++;
    }
  }
  if (card_points == 0) continue;
  else total_points += 2 ** (card_points - 1);
}

let multiplier = [0];
let card_map = new Map();

for (let i = 0; i < input.length - 1; i++){
  card_map.set(i, 1);
}

for (let i = 0; i < input.length - 1; i++){
  console.log('i: ', i);
  temp = input[i].split(':');
  card = temp[1].split('|');

  winning_numbers = card[0].trim().replaceAll('  ', ' ').split(' ');
  card_nums = card[1] + ' ';
  card_points = 0;

  for (let j = 0; j < card_map.get(i); j++){
    for (let k = 0; k < winning_numbers.length; k++){
      if (card_nums.includes(' ' + winning_numbers[k] + ' ')){
        card_points++;
      }
    }

    if (card_points > 0){
      for (let k = 0; card_points > 0; card_points--){
        card_map.set(i + k + 1, card_map.get(i + k + 1) + 1);
        k++;
      }
    }
  }
}
let total = 0;
for (let i = 0; i < input.length - 1; i++){
  total += card_map.get(i);
}

console.log("Total Points: ", total_points)
console.log("Total Cards: ", total);

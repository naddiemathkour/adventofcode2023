const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

let race_time = input[0].replace('Time: ', '').trim().replace(/ +/g, ' ').split(' ');
let distance = input[1].replace('Distance: ', '').trim().replace(/ +/g, ' ').split(' ');

let time, dist, count, win_count;
win_count = [];
count = 0;
for (let i = 0; i < race_time.length; i++){
  time = race_time[i];
  dist = distance[i];
  for (let hold = 1; hold < time; hold++){
    if (((time - hold) * hold) > dist) count++;
  }
  win_count.push(count);
  count = 0;
}

let solution = 1;
for (let i = 0; i < win_count.length; i++){
  solution *= win_count[i];
}
console.log('Part 1: ', solution);
race_time = Number(input[0].replace('Time: ', '').replace(/ +/g, ''));
distance = Number(input[1].replace('Distance: ', '').replace(/ +/g, ''));

for (let hold = 1; hold < race_time; hold++){
  if (((race_time - hold) * hold) > distance) count++;
}


console.log(count)

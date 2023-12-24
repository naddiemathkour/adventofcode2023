const fs = require('fs');
const input = fs.readFileSync('input', 'utf8').split('\n');

const strength = {
  'High Card'       : 0,
  'One Pair'        : 1,
  'Two Pair'        : 2,
  'Three Of A Kind' : 3,
  'Full House'      : 4,
  'Four of a Kind'  : 5,
  'Five of a Kind'  : 6
};

const card_weight = [
  ['A', 14],
  ['K', 13],
  ['Q', 12],
  ['J', 11],
  ['T', 10]
];

let part2 = false;

let weight_map = new Map(card_weight);

function parse_jacks(hand){
  return ((hand.match(/J/g) || []).length > 0) ? true : false;
}

function check_strength(hand){
  let temp;
  let distinct_cards = new Set(hand);

  if (distinct_cards.size == 5) {
    if (part2)
    if (parse_jacks(hand)) return strength['One Pair'];
    return strength['High Card']; //high card
  }

  if (distinct_cards.size == 4) {
    if (part2)
    if (parse_jacks(hand)) return strength['Three Of A Kind'];
    return strength['One Pair']; //one pair
  }

  if (distinct_cards.size == 3) {//continue working here
    //XYJJJ XXYJJ XXYYJ XXXYJ
    for (let i = 0; i < hand.length; i++){
      temp = hand.split(hand[i]).length - 1;
      if (temp == 2 || temp == 3) break;
    }
    if (part2)
    switch((hand.match(/J/g) || []).length){
      case 1: return (temp == 2) ? strength['Full House'] : strength['Four of a Kind'];
      case 2: return strength['Four of a Kind'];
      case 3: return strength['Four of a Kind'];
      default: return (temp == 2) ? strength['Two Pair'] : strength['Three Of A Kind'];
    }
    return (temp == 2) ? strength['Two Pair'] : strength['Three Of A Kind'];
  }

  if (distinct_cards.size == 2){
    //XXXXJ XXXJJ XXJJJ XJJJJ
    for (let i = 0; i < hand.length; i++){
      temp = hand.split(hand[i]).length - 1;
      if (temp >= 2) break; //four of a kind
    }
    if (part2)
    if (parse_jacks(hand)) return strength['Five of a Kind'];
    return (temp < 4) ? strength['Full House'] : strength['Four of a Kind'];
  }

  if (distinct_cards.size == 1) return strength['Five of a Kind']; //five of a kind
}

function compare_strength(chall, def){
  let challtemp, deftemp;
  for (let i = 0; i < chall.length; i++){
    challtemp = (isNaN(Number(chall[i]))) ? weight_map.get(chall[i]) : Number(chall[i]);
    deftemp = (isNaN(Number(def[i]))) ? weight_map.get(def[i]) : Number(def[i]);
    if (challtemp == deftemp) continue;
    return (challtemp <= deftemp) ? true : false;
  }
}

function check_rank(hand, rank_arr){
  let cards, bid, strength, temp;
  cards = hand[0];
  bid = hand[1];
  strength = hand[2];

  for (let i = 0; i < rank_arr.length; i++){
    temp = rank_arr[i];
    if (strength > temp[2]){
      continue;
    }
    if (strength == temp[2]){
      if (compare_strength(cards, temp[0])){
        return i;
      }
    }
    if (strength < temp[2]){
      return i;
    }
  }
  return rank_arr.length;
}

function final_solution(rankings){
  let total = 0;
  for (let i = 0; i < rankings.length; i++){
    total += Number(rankings[i][1]) * (i + 1);
  }
  return total;
}

function main(){
  if (part2) weight_map.set('J', 1);
  let hand, rankings, index, temp;
  rankings = [];
  hand = input[0].split(' ');
  temp = check_strength(hand[0]);
  rankings.push([...hand, temp]);
  for (let i = 1; i < input.length - 1; i++){
    hand = input[i].split(' ');
    temp = check_strength(hand[0]);
    index = check_rank([...hand, temp], rankings);
    rankings.splice(index, 0, [...hand, temp]);
  }

  console.log(final_solution(rankings)); //Part1: 245794640 Part2: 247899149
}

main();
part2 = true;
main();

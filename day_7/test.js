let hand = 'JKKQJ';
match = (hand.match(/J/g) || []).length;

console.log(hand.replace(/J/g, ''));

console.log(match);

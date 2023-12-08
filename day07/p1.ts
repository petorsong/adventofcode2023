// p1: 248179786
// assumptions: no dupe hands
const input = await Deno.readTextFile('./input');

const addToHash = (hash:any, key:string) => {
  if (hash.hasOwnProperty(key)) {
      hash[key]++; // If the key exists in the hashmap, increment the count
  } else {
    hash[key] = 1; // If the key doesn't exist, initialize the count to 1
  }
  return hash;
}

const groupedByType = input.split('\n').map(line => line.split(' ')).reduce((handTypes, line) => {
  const hash = [...line[0]].reduce((hash, char) => addToHash(hash, char), {}); // generate hash of card freqs
  const sortedValues = Object.values(hash).toSorted((a, b) => b-a); // sort ASC
  switch(Object.keys(hash).length) { // group by type
    case 1:
      handTypes.five.push(line);
      break;
    case 2:
      if (sortedValues[0] == 3) {
        handTypes.full.push(line);
      } else {
        handTypes.four.push(line);
      }
      break;
    case 3:
      if (sortedValues[0] == 3) {
        handTypes.three.push(line);
      } else {
        handTypes.two.push(line);
      }
      break;
    case 4:
      handTypes.one.push(line);
      break;
    case 5:
      handTypes.high.push(line);
      break;
    default:
      break;
  }
  return handTypes;
}, {
  high: [],
  one: [],
  two: [],
  three: [],
  full: [],
  four: [],
  five: [],
});

const order = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const result = Object.values(groupedByType).filter(val => val.length > 0)
  .map(group => group.toSorted((a, b) => {
    for (let i = 0; i < 5; ++i) {
      if (order[a[0][i]] != order[b[0][i]]) { // find first not equal char pair
        // console.log(`${b[0][i]} (${order[b[0][i]]}) vs ${a[0][i]} (${order[a[0][i]]})`);
        return order[a[0][i]] - order[b[0][i]];
      }
    }
  }))
  .reduce((flat, group) => flat.concat(group), [])
  .reduce((sum, hand, i) => sum+parseInt(hand[1], 10)*(i+1), 0);

console.log(result);
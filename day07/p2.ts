// p2: 247337755
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
  const hash = [...line[0]].reduce((hash, char) => addToHash(hash, char), {});
  const jValue = hash['J']; // count J freq
  delete hash['J']; // but don't count it with the rest of the cards
  const sortedValues = Object.values(hash).toSorted((a, b) => b-a); // sort ASC
  if (jValue) {
    sortedValues[0] += jValue; // if there is a J count, add it to the highest freq card - doesn't matter which even if dupes
  }
  switch(Object.keys(hash).length) {
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
      handTypes.five.push(line); // only possible if Object.keys(hash).length == 0, which is 'JJJJJ'
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
  T: 11,
  9: 10,
  8: 9,
  7: 8,
  6: 7,
  5: 6,
  4: 5,
  3: 4,
  2: 3,
  J: 2,
};
const result = Object.values(groupedByType).filter(val => val.length > 0)
  .map(group => group.toSorted((a, b) => {
    for (let i = 0; i < 5; ++i) {
      if (order[a[0][i]] != order[b[0][i]]) {
        return order[a[0][i]] - order[b[0][i]];
      }
    }
  }))
  .reduce((flat, group) => flat.concat(group), [])
  .reduce((sum, hand, i) => sum+parseInt(hand[1], 10)*(i+1), 0);

console.log(result);
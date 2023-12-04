// p2: 19499881
const input = await Deno.readTextFile('./input');

// track number of matches per count - length hardcoded
const hash = Object.fromEntries(Array.from({ length: 203 }).map((_, i) => [i+1, 1]));
// console.log(hash)

const result = input.split('\n') // split by line
  .map(line => line.split(' | ') // split in half
    .map(half => half.split(' ') // split into chunks
      .filter(str => /^\d+$/.test(str)) // drop non-numbers
      .map(str => parseInt(str, 10))) // convert to numbers
    .map(half => half.toSorted((a, b) => a - b))) // sort asc
  .map(line => line[0].filter(item => line[1].indexOf(item) !== -1).length) // find # matches
  .reduce((sum, numMatches, i) => {
    // console.log(numMatches)
    // for (let m = 1; m < numMatches+1; ++m) { // for loop uglier alt version
    //   // console.log(`hash[${i+m+1}] += hash[${i+1}]`)
    //   hash[i+m+1] += hash[i+1];
    // } // v space inefficient alt version
    Array.from({ length: numMatches }).forEach((_, m) => hash[i+2+m] += hash[i+1]);
    // console.log(hash);
    return sum + hash[i+1];
  }, 0)
;

console.log(result);
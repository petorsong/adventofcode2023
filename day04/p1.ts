// p1: 25651
const input = await Deno.readTextFile('./input');

const result = input.split('\n') // split by line
  .map(line => line.split(' | ') // split in half
    .map(half => half.split(' ') // split into chunks
      .filter(str => /^\d+$/.test(str)) // drop non-numbers
      .map(str => parseInt(str, 10))) // convert to numbers
    .map(half => half.toSorted((a, b) => a - b))) // sort asc
  .map(line => line[0].filter(item => line[1].indexOf(item) !== -1)) // find matches
  .filter(matches => matches.length > 0) // drop 0 matches
  .reduce((sum, matches) => sum + 2**(matches.length - 1), 0) // sum point values
;

console.log(result);
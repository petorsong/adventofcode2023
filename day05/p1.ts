// p1: 323142486
const input = await Deno.readTextFile('./input');

const rawChunks = input.split('\n\n');
const maps = rawChunks.slice(1).map(chunk =>
  chunk.split('\n').slice(1).map(line =>
    line.split(' ').map(str => parseInt(str, 10)))); // clean up maps
const seeds = rawChunks.slice(0, 1)[0].split(' ').slice(1).map(seed => parseInt(seed, 10))
  .map(seed => maps.reduce((locNum, mapGroup) => { // for each group
    // console.log()
    return mapGroup.reduce((newLoc, line) => { // for each line
      // console.log(`${locNum} | [${line[1]} - ${line[1]+line[2]}] | ${locNum-line[1]+line[0]}`)
      // console.log(locNum >= line[1] && locNum < line[1]+line[2])
      return locNum >= line[1] && locNum < line[1]+line[2] ? locNum-line[1]+line[0] : newLoc; // if within range, do calc
    }, locNum);
  }, seed))
  .reduce((min, num) => num > min ? min : num, Infinity); // find min

// console.log()
// console.log(maps);
console.log(seeds);
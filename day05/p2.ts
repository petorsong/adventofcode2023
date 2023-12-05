// p2: 79874951 - unoptimized and took ~6min to run
const input = await Deno.readTextFile('./input');

const rawChunks = input.split('\n\n');
const maps = rawChunks.slice(1).map(chunk =>
  chunk.split('\n').slice(1).map(line =>
    line.split(' ').map(str => parseInt(str, 10)))); // clean up maps
const result = rawChunks.slice(0, 1)[0].split(' ').slice(1).map(seed => parseInt(seed, 10))
  .reduce((min, num, i, arr) => {
    if (i%2 == 1) {
      console.log(`seeds ${arr[i-1]} ${num}`)
      let tempMin = min, currNum = 0;
      for (let j = arr[i-1]; j < arr[i-1]+num; ++j) { // optimize by comparing ranges instead of creating new arrays
        currNum = maps.reduce((locNum, mapGroup) =>
          mapGroup.reduce((newLoc, line) =>
            locNum >= line[1] && locNum < line[1]+line[2] ? locNum-line[1]+line[0] : newLoc
          , locNum)
        , j);
        tempMin = tempMin > currNum ? currNum : tempMin;
        // console.log(`tempMin: ${tempMin}`)
      }
      console.log(`currMin: ${min > tempMin ? tempMin : min}`)
      return min > tempMin ? tempMin : min;
    }
    return min;
  }, Infinity);

// console.log()
// console.log(maps);
console.log(result);
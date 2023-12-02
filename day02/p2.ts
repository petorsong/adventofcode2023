// p2: 77607 deno run --allow-all --watch p1.ts
const input = await Deno.readTextFile('./input');

const lines = input.split('\n');

const result = lines.map(line => line.split(': ')[1].split('; ')
  .map(round => round.split(', ')
    .map(cubes => cubes.split(' '))
    .map(cubes => ({[cubes[1]]: parseInt(cubes[0],10)}))
  ).map(round => Object.assign({}, ...round))
).map(subarray => subarray.reduce((minValues, obj) => { // this chunk from chatgpt
    Object.keys(obj).forEach(key => {
      minValues[key] = Math.max(minValues[key] || -Infinity, obj[key]);
    });
    return minValues;
  }, {})
).map(minValues => Object.values(minValues).reduce((x,y) => (x*y), 1))
.reduce((a,b) => a+b, 0);

console.log(result);

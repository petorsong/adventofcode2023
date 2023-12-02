// p1: 2679 deno run --allow-all --watch p1.ts
const input = await Deno.readTextFile('./input');

const lines = input.split('\n');

const result = lines.map(line => line.split(': ')[1].split('; ')
  .map(round => round.split(', ')
    .map(cubes => {
      const draw = cubes.split(' ');
      return draw[1].length > 4 ? parseInt(draw[0]) <= 13
        : draw[1].length > 3 ? parseInt(draw[0]) <= 14 : parseInt(draw[0]) <= 12
    }).reduce((a,b) => a && b, true)
  ).reduce((a,b) => a && b, true)
).reduce((a,b,i) => b ? a+i+1 : a, 0);

console.log(result);

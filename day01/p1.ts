// p1: 55447 deno run --allow-all --watch p1.ts
const input = await Deno.readTextFile('./input');

const grouped = input.split('\n');

const lineNums = grouped.map(line => line.split('').filter(str => /^\d$/.test(str)));

const sum = lineNums.reduce((acc, cur) => {
  console.log(parseInt(cur[0]+cur[cur.length-1],10));
  return acc + parseInt(cur[0]+cur[cur.length-1],10);
}, 0);

console.log(sum);

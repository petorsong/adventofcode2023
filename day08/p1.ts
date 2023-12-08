// p1: 20093
const input = await Deno.readTextFile('./input');

type Map = {
  [i: string]: string[];
}

const splitInput = input.split('\n\n');
const rawOrders = splitInput[0].split('').map(char => char == 'L' ? 0 : 1);
const maps = splitInput[1].split('\n')
  .map(line => line.split(/[^A-Z]/).filter(chunk => chunk.length > 0))
  .reduce((map: Map, row) => {
    map[row[0] as keyof Map] = row.slice(1);
    return map;
  }, {});

let nextNode = 'AAA';
let step = 0;
while (nextNode != 'ZZZ') {
  nextNode = maps[nextNode][rawOrders[step % rawOrders.length]];
  ++step;
}
console.log(step)

// abandoned recursive solution - wouldn't halt on input and couldn't figure out why
// const traverse = (node:string, orderIndex: number): number => {
//   if (orderIndex >= rawOrders.length) {
//     orderIndex = 0;
//   }
//   if (maps[node][rawOrders[orderIndex]] == 'AAA') {
//     return 1;
//   }
//   if (maps[node][rawOrders[orderIndex]] == 'ZZZ') {
//     return 1;
//   }
//   // if (steps < 10)
//   // console.log(`${node}: ${maps[node]} => [${rawOrders[orderIndex]}]${maps[node][rawOrders[orderIndex]]}`)
//   // console.log(maps[node][rawOrders[orderIndex]])
//   return 1 + traverse(maps[node][rawOrders[orderIndex]], orderIndex+1);
// }

// // console.log(rawOrders)
// // console.log(maps);
// console.log(traverse('AAA', 0));
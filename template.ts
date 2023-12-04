// p1: 
const input = await Deno.readTextFile('./test');

const result = input.split('\n');

console.log(result);
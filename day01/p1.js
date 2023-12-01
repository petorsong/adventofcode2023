// p1: 55447
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let sum = 0;
let nums = [];
rl.on('line', (line) => { // per line
  nums = line.split('').filter(str => /^\d$/.test(str)); //simple regex test for char isnum
  // console.log(nums);
  // console.log(nums[0]+nums[nums.length-1]);
  sum += parseInt(nums[0]+nums[nums.length-1],10);
});

rl.once('close', () => { // at end
  console.log(sum);
 });

// p1: 
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => { // per line
});

rl.once('close', () => { // at end
  console.log();
 });

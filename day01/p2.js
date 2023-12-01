// p2: 54706
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const digitStrs = [
  ['z','e','r','o'],
  ['o','n','e'],
  ['t','w','o'],
  ['t','h','r','e','e'],
  ['f','o','u','r'],
  ['f','i','v','e'],
  ['s','i','x'],
  ['s','e','v','e','n'],
  ['e','i','g','h','t'],
  ['n','i','n','e'],
]
let sum = 0;
let nums = [];
let i = 0,j = 0, k = 0;
let firstDigit = -1, lastDigit = -1;
rl.on('line', (line) => { // per line
  firstDigit = -1;

  for (i = 0; i < line.length; ++i) {
    if(/^\d$/.test(line.charAt(i))) { // if char is num, pretty easy
      firstDigit = firstDigit < 0 ? parseInt(line.charAt(i), 10) : firstDigit;
      lastDigit = parseInt(line.charAt(i), 10);
    } else {
      for (j = 0; j < 10; ++j) {
        if (line.charAt(i) == digitStrs[j][0]) { // this could be removed? not a necessary check
          k = 0;
          if (digitStrs[j].reduce((acc, cur) => { // if it matches as a char digit
            // console.log(cur + '|' + line.charAt(i+k)); // could short circuit earlier but not with reduce?
            return acc && (cur == line.charAt(i+(k++)))
          },
          true)) {
            firstDigit = firstDigit < 0 ? j : firstDigit;
            lastDigit = j;
            break;
          };
          // console.log();
        }
      }
    }
  }

  // console.log(firstDigit);
  // console.log(lastDigit);
  // console.log();
  sum += firstDigit*10 + lastDigit;
});

rl.once('close', () => { // at end
  console.log(sum);
 });

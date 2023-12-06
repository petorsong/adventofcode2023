// p1: 1084752
const input = await Deno.readTextFile('./input');

const lines = input.split('\n').map(line => line.split(' ').slice(1).filter(str => str.length > 0).map(num => parseInt(num, 10)));
const result = lines[0].map((_, colIndex) => lines.map(row => row[colIndex])) // invert for easier access
  .map(data => {
    const r = data[0] / 2;
    let l = Math.floor((data[0]-Math.sqrt(data[0]**2-4*data[1]))/2)+1;
    let range = 0; // starting from l, count all x where y is an integer
    for (; l < r; ++l) {
      if (Number.isInteger(-1*(l-data[0]/2)**2+data[0]**2/4)) {
        ++range;
      }
    }
    return 2*(range) + (Number.isInteger(r) ? 1 : 0);
  }).reduce((prod, num) => prod*num,1);

console.log(result);
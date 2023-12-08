// p2: 22103062509257
const input = await Deno.readTextFile('./input');

type Map = {
  [i: string]: string[];
}

let nextNodes: string[] = [];
const splitInput = input.split('\n\n');
const rawOrders = splitInput[0].split('').map(char => char == 'L' ? 0 : 1);
const maps = splitInput[1].split('\n')
  .map(line => line.split(/[^A-Z]/).filter(chunk => chunk.length > 0))
  .reduce((map: Map, row) => {
    if (row[0][2] == 'A') {
      nextNodes.push(row[0]);
    }
    map[row[0] as keyof Map] = row.slice(1);
    return map;
  }, {});

// console.log(rawOrders)
// console.log(maps)
// console.log(nextNodes)

// after reading reddit it's a LCM problem, so calculate each multiple separately then find LCM
const multiples = nextNodes.map(node => {
  let nextNode = node;
  let step = 0;
  while (nextNode[2] != 'Z') {
    nextNode = maps[nextNode][rawOrders[step % rawOrders.length]];
    ++step;
  }
  return step;
})

function findLCM(numbers: number[]): number {
  // Ensure all numbers are positive integers
  if (numbers.some(num => num <= 0 || !Number.isInteger(num))) {
      throw new Error('All numbers in the array must be positive integers.');
  }

  // Calculate the prime factors for each number in the array
  const primeFactorsArray = numbers.map(getPrimeFactors);

  // Merge prime factors and calculate the product
  const mergedFactors = mergePrimeFactors(primeFactorsArray);
  const lcm = calculateProduct(mergedFactors);

  return lcm;
} // chatGPT produced - uses prime factorization

function getPrimeFactors(num: number): Map<number, number> {
  const factors = new Map<number, number>();
  let divisor = 2;

  while (num > 1) {
      while (num % divisor === 0) {
          factors.set(divisor, (factors.get(divisor) || 0) + 1);
          num /= divisor;
      }
      divisor++;
  }

  return factors;
} // chatGPT produced

function mergePrimeFactors(factorsArray: Map<number, number>[]): Map<number, number> {
  const mergedFactors = new Map<number, number>();

  factorsArray.forEach(factors => {
      factors.forEach((count, prime) => {
          if (!mergedFactors.has(prime) || mergedFactors.get(prime)! < count) {
              mergedFactors.set(prime, count);
          }
      });
  });

  return mergedFactors;
} // chatGPT produced

function calculateProduct(factors: Map<number, number>): number {
  let product = 1;

  factors.forEach((count, prime) => {
      product *= Math.pow(prime, count);
  });

  return product;
} // chatGPT produced

console.log(findLCM(multiples))
// p1: 550064
const input = await Deno.readTextFile('./input');

const addToHash = (hash:any, key:string) => {
    if (hash.hasOwnProperty(key)) {
        hash[key]++; // If the key exists in the hashmap, increment the count
    } else {
      hash[key] = 1; // If the key doesn't exist, initialize the count to 1
    }
  }

const directions = [
    { row: 0, col: -1, first: true }, // Left
    { row: 0, col: 1, first: false },   // Right
    { row: -1, col: -1, first: true }, // Diagonal Up-Left
    { row: -1, col: 1, first: false },  // Diagonal Up-Right
    { row: 1, col: -1, first: true },  // Diagonal Down-Left
    { row: 1, col: 1, first: false },    // Diagonal Down-Right
    { row: -1, col: 0, multiple: true }, // Above
    { row: 1, col: 0, multiple: true },  // Below
];
const calcPartNum:number = (grid, partNum, first, last, row) => { // not sure how to get rid of this error
    const hash = {}; // hash count is unnecessary but nice for prelim debug
    for (const dir of directions) {
        const newRow = row + dir.row;
        const newCol = (dir.first ? first : last) + dir.col; // use appropriate left/right bound
    
        // Check if the new position is within bounds and perform operation
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            if (dir.multiple) { // if above or down, cover as many as number length
                Array.from({length: last-first+1}, (_, i) => grid[newRow][first+i])
                    .forEach(char => addToHash(hash, char));
            } else {
                addToHash(hash, grid[newRow][newCol]); // directly save char to hash
            }
        }
      }

    return Object.keys(hash).length > 1 ? parseInt(partNum, 10) : 0; // if length>1, there must be some symbol

};

const grid:string[][] = input.split('\n').map(line => line.split(''));

const sum = grid.reduce((a, line, j) => {
    let partNum = '', first = -1, last = -1;
    return a + line.reduce((b, char, i) => {
        if (/^\d$/.test(char)) { // if number then we're at some point of partNum
            first = first < 0 ? i : first;
            last = i;
            partNum += char;
            return i+1 == line.length || /^\D$/.test(line[i+1]) // if next digit is end of num
                ? b + calcPartNum(grid, partNum, first, last, j) // check if part number
                : b;
        } else { // if not number then reset values
            partNum = '', first = -1, last = -1;
            return b;
        }
    }, 0);
}, 0);

console.log(sum);

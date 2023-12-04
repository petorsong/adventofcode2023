// p2: 85010461
// assumptions: no stars on edges
const input = await Deno.readTextFile('./input');

const directions = [ // each group can have at most 2 nums
    { row: -1, col: -1 }, // Diagonal Up-Left, Above, Diagonal Up-Right
    { row: -1, col: 0 },
    { row: -1, col: 1 },
    { row: 0, col: -1 }, // Left, Right
    { row: 0, col: 1 },
    { row: 1, col: -1 }, // Diagonal Up-Right, Below, Diagonal Down-Right
    { row: 1, col: 0 },
    { row: 1, col: 1 }, 
];
function getStarPos<starPos>(grid: string[][], row: number, col: number) {
    const around: string[] = [];
    for (const dir of directions) { // scans all 8 adjacent tiles
        const newRow = row + dir.row;
        const newCol = col + dir.col;
        if (newRow >= 0 && newRow < grid.length && newCol >= 0 && newCol < grid[0].length) {
            around.push(grid[newRow][newCol]); // if inbounds, add to around
        }
      }
    return ({ row: row, col: col, around: around });

};

function countParts<number>(...adj:string[]) { // counts how many parts are on 1 line relative to *
    const tempSum = adj.reduce((sum, a) => (/^\d$/.test(a) ? sum+1 : sum), 0);
    // if there's 2 on the line, it could be 11. 1.1 .11 or 1*1 - check middle digit to distinguish first 3
    return tempSum == 2 ? (adj.length > 2 && /^\d$/.test(adj[1]) ? 1 : 2) : (tempSum == 0 ? 0 : 1);
}

function getPartNum<number>(grid: string[][], row: number, col: number) {
    let partNum = '', newCol = col; // we know the current coord is a number
    while (newCol-1 >= 0 && /^\d$/.test(grid[row][newCol-1])) { --newCol } // backtrack until first non-digit
    partNum += grid[row][newCol]; // start with full digit and keep capturing until non-digit
    while (++newCol < grid[row].length && /^\d$/.test(grid[row][newCol])) { partNum += grid[row][newCol]; }
    console.log(`[${row} , ${col}]: ${grid[row][col]}`);
    console.log(parseInt(partNum, 10));
    return parseInt(partNum, 10);
}

const grid:string[][] = input.split('\n').map(line => line.split(''));

interface starPos {
    row: number;
    col: number;
    around: string[];
};

const result = grid.reduce((stars, line, row) => {
    const starPosList = line.reduce((lineStars, char, col) => (
        /^\*$/.test(char) ? lineStars.concat([getStarPos(grid, row, col)]) : lineStars
    ), []); // compile list of *
    return starPosList.length > 0 ? stars.concat(starPosList) : stars;
}, []).reduce((sum, starPos) => { // for each * split adjacents (around) by row
    const splitAround = [
        starPos.around.slice(0,3),
        starPos.around.slice(3,5),
        starPos.around.slice(-3),
    ];

    const rowsCount = [
        countParts(...splitAround[0]),
        countParts(...splitAround[1]),
        countParts(...splitAround[2]),
    ];
    return rowsCount.reduce((sum, row) => sum + row, 0) == 2
        ? sum + splitAround.reduce((ratios, rowChars, i) => {
            // console.log(rowChars);
            // console.log(rowsCount);
            if (rowsCount[i] == 2) { // if 2 parts on row, get each
                return ratios * rowChars.reduce((product, rowChar, colIndex) => {
                    if (/^\d$/.test(rowChar)) {
                        // godawful way to coalesce from splitAround (1 array per row [3] [2] [3]) to around ([8] in clockwise order from NW)
                        // need it to be in around form so it's easier to work with directions and iterate over
                        const aroundIndex = colIndex + (i == 1 ? 3 : 0) + (i == 2 ? 5 : 0);
                        const newRow = starPos.row + directions[aroundIndex].row;
                        const newCol = starPos.col + directions[aroundIndex].col;
                        return product * getPartNum(grid, newRow, newCol);
                    }
                    return product;
                }, 1);
            } else if (rowsCount[i] == 1) { // if only 1 part num, fetch via findindex
                // console.log(starPos.around);
                const colIndex = rowChars.findIndex((item: string) => /^\d$/.test(item));
                const aroundIndex = colIndex + (i == 1 ? 3 : 0) + (i == 2 ? 5 : 0);
                // console.log(aroundIndex);
                const newRow = starPos.row + directions[aroundIndex].row;
                const newCol = starPos.col + directions[aroundIndex].col;
                // console.log(newCol);
                return ratios * getPartNum(grid, newRow, newCol);
            }
            return ratios;
        }, 1) : sum;
}, 0);

console.log(result);

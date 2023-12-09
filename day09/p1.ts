// p1: 1806615041
// pattern: adding the existing last values of each sequence will give you the same result as
//   adding the next values of each sequence after the first
const input = await Deno.readTextFile('./input');

const result = input.split('\n').map(line => line.split(' ').map(num => parseInt(num,10)))
  .reduce((allSeq:number[][][], history: number[]) => { // generate all sequences per history
    let seq:number[] = history;
    allSeq.push([ history ]);
    while (seq.reduce((allZero, val) => allZero || val != 0, false)) {
      seq = seq.reduce((nextSeq, _, i) => {
        if (i < seq.length-1) {
          nextSeq.push(seq[i+1]-seq[i]);
        }
        return nextSeq;
      }, []);
      allSeq[allSeq.length-1].push(seq);
    }
    return allSeq;
  }, [])
  .map(allSeq => allSeq.reduce((sum, seq) => sum+seq[seq.length-1], 0)) // sum all last values of sequences
  .reduce((sum, nextVal) => sum+nextVal, 0) // sum all next values for result

console.log(result);
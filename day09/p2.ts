// p2: 1211
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
  }, []) // p1 pattern breaks so we'll do it the naive way - actually calculate each next step
  .map(allSeq => allSeq.reduceRight((map, seq, i) => {
    // console.log(seq)
    if (i == allSeq.length-1) {
      map.push([0].concat(seq));
    } else {
      map.push([seq[0] - map[map.length-1][0]].concat(seq));
    }
    // console.log(map)
    return map;
  }, [])) // sum all next values for result
  .map(finalSeqs => finalSeqs[finalSeqs.length-1]).reduce((sum, seq) => sum+seq[0], 0)

console.log(result);
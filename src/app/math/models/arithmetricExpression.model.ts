export class ArithmeticExpression {
  _maxProposedSolutions = 3;
  constructor(expr: string, postExpr: string, result: number, maxProposedSolutions: number) {
    this._maxProposedSolutions = maxProposedSolutions;
    this.expr = expr;
    this.postExpr = postExpr;
    this.proposedSolutions = Array.from(this.jitteringResult(result));
    //    console.log(this.proposedSolutions)
    if (this.proposedSolutions.indexOf(result) < 0)//if inside proposed solution doesn't contain a correct result, add
      this.proposedSolutions[Math.floor(Math.random() * this._maxProposedSolutions)] = result;
    else
      console.log("proposed solution has correct answer")
    this.answer = result;
  }
  _touch: boolean = false;
  expr: string;
  postExpr: string;
  answer: number;
  proposedSolutions: Array<number>;
  pickedSolution: number;
  jitteringResult(seed: number) {
    const numberList: Set<number> = new Set<number>();
    for (let idx = 0; idx < this._maxProposedSolutions; idx++) {
      let jitter;
      let iterationCount = 0;
      do {
        jitter = seed + (Math.floor(Math.random() * seed / (Math.floor(Math.random() * 7) + 1)));
        //        console.log(`seed: ${seed}, jitter: ${jitter}`);
        iterationCount++;

        if (iterationCount > 2000) {//in case the seed is too small, jittering will fail two generate more than 2 numbers
          iterationCount = 0;
          console.log(`iterationCount: 200: seed: ${seed}`);
          seed = seed + Math.floor(Math.random() * 1/9)
          break;
        }
      } while (numberList.add(jitter).size != (idx + 1));//make sure the set has at 3 elements
    }
    console.log("Set return: ", numberList);
    return numberList;
  }
}
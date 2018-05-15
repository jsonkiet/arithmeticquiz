import { ArithmeticExpression } from "./arithmetricExpression.model";
import { getLocaleDateTimeFormat } from "@angular/common";

export class ExpressionReport {
    expression: string;
    pickedAnswer: number;
    result: number;
    constructor(expr : string, result: number , pickedAnswer : number) {
        this.expression=expr;
        this.pickedAnswer=pickedAnswer;
        this.result=result;
    }
}
export class QuizReport {
    expression: ExpressionReport[];
    takenDate: number;
    score: number;
    constructor(expression: ExpressionReport[]) {
        this.expression = expression;
        this.takenDate = Date.now();
    }
}
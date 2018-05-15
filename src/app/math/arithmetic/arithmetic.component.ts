import { Component, OnInit } from '@angular/core';
import { ArithmeticExpression } from '../models/arithmetricExpression.model';
import { Store, select } from '@ngrx/store';
import { getUserProfile } from '../../auth/reducers/auth.reducers';
//import { AngularFireDatabase } from 'angularfire2/database';
import { QuizReport, ExpressionReport } from '../models/quiz-report.model';
import { User } from '../../auth/models/user.model';
import { SpinnerService } from '../../core/services/spinner.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-arithmetic',
  template: `
      <app-spinner *ngIf="spinner.isLoading()|async"> </app-spinner>
      <app-simple-arithmetic-expression
        *ngFor="let expr of _arithExpr; let idx=index"
        [arithExpr] = "expr"
        [idx]="idx"
        (pickedAnAnswer)="onPickedAnAnswer($event)"
      >
      </app-simple-arithmetic-expression>
      <button mat-raised-button color="primary" [disabled]=" _quizProgress != _profile?.quizSettings?.maxExpressionPerQuiz" (click)="onSave(_arithExpr)">Save</button>
      <button mat-raised-button color="primary" [disabled]="!_moreQuiz" (click)="genQuiz()">More</button>
  `,
  styles: [`
    button {
      margin-top:15px;
    }
  `]
})
export class ArithmeticComponent implements OnInit {
  constructor(/*private fbdb: AngularFireDatabase,*/ private store: Store<any>, public spinner: SpinnerService) { }
  _arithExpr: ArithmeticExpression[] = [];
  _profile: User = null;
  _operators: string[];
  _quizProgress: number = 0;
  _moreQuiz: boolean = false;
  ngOnInit() {
    this.spinner.show();
    this.store.pipe(select(getUserProfile)).subscribe(profile => {
      if (profile != null) {
        this._profile = profile;
        this._operators = Object.keys(this._profile.quizSettings.operators).filter(x => this._profile.quizSettings.operators[x]); //need to work on 
      }
      this.genQuiz();
      this.spinner.off();
    })
  }
  genQuiz() {
    this._moreQuiz = false;
    this._arithExpr.length = 0;
    this._quizProgress = 0;
    let idx = 0;
    const maxProposedSolution = this._profile.quizSettings.maxProposedSolutions;
    while (idx < this._profile.quizSettings.maxExpressionPerQuiz) {
      const maxOperator = this.genNumber(this._profile.quizSettings.minOperatorsPerExpression, this._profile.quizSettings.maxOperatorsPerExpression);
      let infixExpr = this.genExpr(maxOperator);
      let postfixExpr = this.toPostfix(infixExpr);
      console.log("Postfix Expression: ", postfixExpr);
      let result = this.evalPostfix(postfixExpr);
      while (!isFinite(result) || (result < 0 && !this._profile.quizSettings.allowNegative)) {
        console.log("Result is negative ", result)
        infixExpr = this.genExpr(maxOperator);
        postfixExpr = this.toPostfix(infixExpr);
        result = this.evalPostfix(postfixExpr);
        //        console.log("generate expression")
      }
      const arth = new ArithmeticExpression(infixExpr, postfixExpr.join(''), result, maxProposedSolution);
      //console.log(arth.postExpr);
      //console.log(result);
      this._arithExpr.push(arth);
      idx++;
    }
  }
  genOperator() {
    const op = this.genNumber(0, this._operators.length);
    console.log(op);
    switch (this._operators[op]) {
      case 'plus': return '+';
      case 'minus': return '-';
      case 'div': return '/';
      case 'mult': return 'x';
      case 'exp': return '^';
    }
  }
  genExpr(maxOperator: number) {
    let idx = 0;
    let expr: string = "";
    let expFlag = false;
    const minExponentialNumber = 1;
    const maxExponentialNumber = 4;
    while (idx < maxOperator) {
      let x = this.genNumber();
      if (expFlag) {
        x = this.genNumber(minExponentialNumber, maxExponentialNumber);
        expFlag = false;
      }
      const operator = this.genOperator();
      if (operator === '^')
        expFlag = true;
      expr = expr + x + " " + operator + " ";
      idx++;
    }
    let expNumber = 1;
    if (expFlag) {
      expr = expr + this.genNumber(minExponentialNumber, maxExponentialNumber);
    }
    else
      expr = expr + this.genNumber();
    //    console.log(expr);
    return expr;
  }
  genNumber(min?: number, max?: number) {
    let tmpMin = this._profile.quizSettings.minNumber, tmpMax = this._profile.quizSettings.maxNumber
    if (min >= 0)
      tmpMin = min;
    if (max)
      tmpMax = max;
    //return Math.floor(Math.random() * tmpMax) + tmpMin;
    return Math.floor(Math.random() * Math.floor(tmpMax)) + tmpMin;
  }
  toPostfix(infix: string) {
    var pfixString = [];
    var stack = [];

    for (var c of infix.split(' ')) {
      if (!isNaN(parseInt(c))) {
        pfixString.push(c);
      } else if (c === "+" || c === "-" || c === "x" || c === "/" || c === "^") {
        while (c != "^" && !(stack.length <= 0) && (this.getPriority(c) <= this.getPriority(stack[stack.length - 1]))) {
          pfixString.push(stack.pop());
        }
        stack.push(c);
      }
    }
    while (stack.length > 0) {
      pfixString.push(stack.pop());
    }
    return pfixString;
  }
  evalPostfix(postExpr: string[]) {
    const operands: number[] = [];
    for (const v of postExpr) {
      if (parseInt(v)) {
        operands.push(parseInt(v));
      }
      else {
        const x = operands.pop();
        const y = operands.pop();
        operands.push(this.evalSimpleExpr(y, x, v.toString()));
      }
    }
    return operands[0];
  }
  getPriority(op: string) {
    switch (op) {
      case '^': return 3;
      case 'x': return 2;
      case '/': return 2;
      case '+': return 1;
      case '-': return 1;
    }
  }
  evalSimpleExpr(x: number, y: number, op: string): number {
    switch (op) {
      case 'x': return x * y;
      case '/': return x / y;
      case '+': return x + y;
      case '-': return x - y;
      case '^': return Math.pow(x, y);
    }

  }
  onSave(exprs: ArithmeticExpression[]) {
    debugger;
    this._quizProgress = 0;
    this._moreQuiz = true;
    const expressions: ExpressionReport[] = [];
    let score: number = 0;
    for (const expr of exprs) {
      expressions.push(new ExpressionReport(expr.expr, expr.answer, expr.pickedSolution));
      if (expr.answer == expr.pickedSolution) {
        score++;
      }
    }
    score = (score / this._profile.quizSettings.maxExpressionPerQuiz)*100;
    const quizReports = new QuizReport(expressions);
    quizReports.score = score;
    //    this.fbdb.list(`reports/${this._profile.uid}/${Date.now()}`).push(quizReports).
    //    firebase.database.ref.set(`reports/${this._profile.uid}/${Date.now()}`,quizReports)
    firebase.database().ref(`reports/${this._profile.uid}/${Date.now()}`).set({
      expr: quizReports.expression,
      score: quizReports.score
    }).then(
      () => this._moreQuiz = true
    ).catch((error) => console.log(error));

  }
  onPickedAnAnswer(res: { idx: number; pickedSol: number }) {
    this._quizProgress++;
    this._arithExpr[res.idx].pickedSolution = res.pickedSol;

    //  console.log("Picked Solution:", res.pickedSol)
  }
}

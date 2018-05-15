import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArithmeticExpression } from '../models/arithmetricExpression.model';

@Component({
    selector: 'app-simple-arithmetic-expression',
    template: `
        <mat-card>
            <mat-card-title><span>{{arithExpr.expr}}</span></mat-card-title>
            <mat-card-content>
                <mat-radio-group>
                    <mat-radio-button [disabled]="_touch" *ngFor="let sol of arithExpr.proposedSolutions" 
                        [value]="sol"
                        (change)="onPickedAnswer(sol, arithExpr.answer)"
                    >
                        {{sol}}
                    </mat-radio-button>
                </mat-radio-group>
                <mat-icon color="primary" *ngIf="_touch && _isPickedARightAnswer">check</mat-icon>
                <mat-icon color="secondary" *ngIf="_touch && ! _isPickedARightAnswer">clear</mat-icon>
            </mat-card-content>
        </mat-card>
    `,
    styles: []
})
export class SimpleArithmeticExpressionComponent implements OnInit {
    @Output() pickedAnAnswer : EventEmitter<any> =new EventEmitter();
    @Input() idx : number;
    @Input() arithExpr: ArithmeticExpression
    constructor() { }
    _touch: boolean = false;
    _isPickedARightAnswer: boolean = false;
    ngOnInit(): void { }
    onPickedAnswer(sol: number, answer: number) {
        this._touch = true;
        if (sol === answer)
            this._isPickedARightAnswer = true;
        else {
            this._isPickedARightAnswer = false;
        }
        this.pickedAnAnswer.emit({idx:this.idx,pickedSol:sol});
    }
}

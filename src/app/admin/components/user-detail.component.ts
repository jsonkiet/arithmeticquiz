import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  template: `
    <mat-card>
      <mat-card-title>{{user.givenName}}</mat-card-title>
      <mat-card-content>
        <p> {{user.email}}</p>
        <p>
          <span>Allow opertors</span>
          <mat-checkbox [(ngModel)]="user.quizSettings.operators.plus">Plus</mat-checkbox> 
          <mat-checkbox [(ngModel)]="user.quizSettings.operators.minus">Minus</mat-checkbox> 
          <mat-checkbox [(ngModel)]="user.quizSettings.operators.mult">Multiply</mat-checkbox> 
          <mat-checkbox [(ngModel)]="user.quizSettings.operators.div">Divide</mat-checkbox> 
          <mat-checkbox [(ngModel)]="user.quizSettings.operators.exp">Exponential</mat-checkbox> 
        </p>
        <p>
          <span>Minimum number</span>
          <mat-slider [(ngModel)]="user.quizSettings.minNumber"  thumbLabel min="1" max="1000" step="1"></mat-slider>
          {{user.quizSettings.minNumber}}
        </p>
        <p>
          <span>Maximum number</span>
          <mat-slider [(ngModel)]="user.quizSettings.maxNumber"  thumbLabel min="1" max="2000" step="1"></mat-slider>
          {{user.quizSettings.maxNumber}}
        </p>
        <p>
          <span>Allow negative expression</span>
          <mat-checkbox [(ngModel)]="user.quizSettings.allowNegative">Negative</mat-checkbox> 
        </p>
        <p>
          <span>Max expression per quiz</span>
          <mat-slider [(ngModel)]="user.quizSettings.maxExpressionPerQuiz" thumbLabel min="5" max="50" step="5"></mat-slider>
          {{user.quizSettings.maxExpressionPerQuiz}}
        </p>
        <p>
          <span>Min operators per expression</span>
          <mat-slider [(ngModel)]="user.quizSettings.minOperatorsPerExpression"  thumbLabel min="1" max="20" step="1"></mat-slider>
          {{user.quizSettings.minOperatorsPerExpression}}
        </p>
        <p>
          <span>Max operators per expression</span>
          <mat-slider [(ngModel)]="user.quizSettings.maxOperatorsPerExpression"  thumbLabel min="1" max="20" step="1"></mat-slider>
          {{user.quizSettings.maxOperatorsPerExpression}}
        </p>
        <p>
          <span>Max proposed solution</span>
          <mat-slider [(ngModel)]="user.quizSettings.maxProposedSolutions"  thumbLabel min="2" max="10" step="1"></mat-slider>
          {{user.quizSettings.maxProposedSolutions}}
        </p>

        <p>
          <button mat-raised-button color="primary" [disabled]="isModified()" (click)="onUpdate(user)">Update</button>
          <button mat-raised-button color="primary" [routerLink]="['/reports',user.uid]">View Quiz Results</button>
        </p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
  `]
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  userCopy: string;
  constructor(private router: Router, private fbdb: AngularFireDatabase) { }
  onUpdate(user: User) {

    this.fbdb.list("users/").update(user.uid, user).then(
    ).catch( (error) => console.log(error));
  }
  ngOnInit() {
    this.userCopy = JSON.stringify(this.user);
  }
  isModified() { 
   return this.userCopy===JSON.stringify(this.user);
  }
}
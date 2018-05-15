import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store, select } from '@ngrx/store';
import { AuthLogin } from '../actions/auth.actions';
import { Observable } from 'rxjs/Observable';
import { getErrMsg, getIsLoading } from '../reducers/auth.reducers';

@Component({
  selector: 'app-login-page',
  template: `
    <app-spinner *ngIf="(isLoading$|async)"></app-spinner>
    <mat-card>
      <mat-card-title>Authenticate using google account</mat-card-title>
      <mat-card-content>
        <button  color="primary" mat-raised-button (click)="loginGoogle()">Google</button>
        <span [style.background]="red" *ngIf="errMsg$|async">{{errMsg$|async}}</span>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }
    mat-card {
      margin: 10px;
      text-align: center;
    }
  `]
})
export class LoginPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  errMsg$: Observable<string>;
  constructor(private store : Store<any>){}
  ngOnInit() {
    this.errMsg$=this.store.pipe(select(getErrMsg));
    this.isLoading$=this.store.pipe(select(getIsLoading));
  }
  loginGoogle() {
    this.store.dispatch(new AuthLogin());
  }
}

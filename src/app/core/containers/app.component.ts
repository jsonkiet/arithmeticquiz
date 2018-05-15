import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getUserProfile, getLoggedIn } from '../../auth/reducers/auth.reducers';
import { User } from '../../auth/models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar [userInfo]="user$|async" [loggedIn]="loggedIn$|async">Arithmetic Expression</app-toolbar>
      <router-outlet>
      </router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  user$: Observable<User>;
  loggedIn$: Observable<boolean>;
  constructor(private store: Store<any>){}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getUserProfile));
    this.loggedIn$ = this.store.pipe(select(getLoggedIn));
  }

}

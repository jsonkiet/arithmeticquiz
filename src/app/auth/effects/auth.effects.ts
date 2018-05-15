import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthLogin, AuthActionTypes, AuthLoginSuccessful, AuthLoginFailure, AuthLogoutSuccessful, AuthLogoutFailure, AuthLoginGetUserInfo, AuthLogout } from '../actions/auth.actions';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { catchError, map, tap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operator/switchMap';
import { User, Roles } from '../models/user.model';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthEffects {
    constructor(
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private actions$: Actions,
        private router: Router
    ) { }

    @Effect() login$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN),
        exhaustMap(login => {
            const provider = new firebase.auth.GoogleAuthProvider();
            /*
            return this.afAuth.authState.pipe(
                switchMap(user => {
                    return new AuthLoginSuccessfull(this.db.object('users'+user.uid));
                })
            );*/
            return Observable.fromPromise(this.afAuth.auth.signInWithPopup(provider)).pipe(
                map((authData: any) => {
                    return new AuthLoginGetUserInfo(new User(authData))
                }),
                catchError(error => of(new AuthLoginFailure(error)))
            )
        })
    );
    @Effect() loginGetUserInfo$ = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN_GET_USER_INFO),
        map((action: AuthLoginGetUserInfo) => action.user),
        exhaustMap((googleUser: User) => {
            const ref = this.db.object('users/' + googleUser.uid);
                        debugger;
            return ref.valueChanges().pipe(
                map((user: User) => {
                        debugger;
                    if (!user) {
                        debugger;
                        console.log("Is a new user:", googleUser);
                        //ref.set(googleUser);
                        ref.update(googleUser)
                        return new AuthLoginSuccessful(googleUser)
                    }
                    return new AuthLoginSuccessful(user)
                }),
                catchError(error => {debugger; return of(new AuthLoginFailure(error)) })
            )
        })
    );
    @Effect({ dispatch: false }) loginSuccessful$ = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_LOGIN_SUCCESSFUL),
        map((action: AuthLoginSuccessful) => action.user.roles),
        tap((roles) => {
            if (this.isInRole(roles, ["admin"])) {
                //                console.log("Effect loginSuccessful -> redirect to math"); 
                this.router.navigateByUrl('/admin');
            }
            else {
                //                console.log("Effect loginSuccessful -> redirect to math"); 
                this.router.navigateByUrl('/math');
            }
        })
    )
    @Effect() logout$ = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_LOGOUT),
        exhaustMap(() =>
            Observable.fromPromise(this.afAuth.auth.signOut()).pipe(
                map(() => { debugger; return new AuthLogoutSuccessful() }),
                catchError((error) => { debugger; return of(new AuthLogoutFailure(error)) })
            )
        )
    )
    @Effect({ dispatch: false }) logoutSuccessful$ = this.actions$.pipe(
        ofType(AuthActionTypes.AUTH_LOGOUT_SUCCESSFUL),
        tap(() => this.router.navigateByUrl('/home'))
    )
    isInRole(roles: Roles, isInRoles: string[]): boolean {
        for (const role of Object.keys(roles)) {
            for (let i = 0; i < isInRoles.length; i++) {
                if (role.toLocaleLowerCase() === isInRoles[i].toLocaleLowerCase())
                    return true;
            }
        }
        return false;
    }
}
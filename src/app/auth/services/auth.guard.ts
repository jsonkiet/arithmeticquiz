import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { map, take } from 'rxjs/operators';
import { getLoggedIn, selectAuthState, AuthState } from '../reducers/auth.reducers';
import { Roles } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private store: Store<any>) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(selectAuthState),
            map((authState: AuthState) => {
                if (authState.loggedIn) {
                    return true;
                }
                // this.authService.destinedURL = state.url;//save destine url, will redirect user when auth success
                this.router.navigateByUrl('/login');
                return false;
            })
        )
        //return of(true);
    }
}
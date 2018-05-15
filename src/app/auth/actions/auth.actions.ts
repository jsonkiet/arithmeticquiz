import { Action } from '@ngrx/store';
import { User } from './../models/user.model';

export enum AuthActionTypes {
    AUTH_LOGIN = '[AUTH] login',
    AUTH_LOGIN_GET_USER_INFO = '[AUTH] login get user info from firebase',
    AUTH_LOGIN_SUCCESSFUL = '[AUTH] login successful',
    AUTH_LOGIN_FAILURE = '[AUTH] login failure',
    AUTH_LOGOUT = '[AUTH] logout',
    AUTH_LOGOUT_SUCCESSFUL = '[AUTH] logout successful',
    AUTH_LOGOUT_FAILURE = '[AUTH] logout failure'
}

export class AuthLogin implements Action {
    readonly type=AuthActionTypes.AUTH_LOGIN;
}
export class AuthLoginSuccessful implements Action {
    readonly type=AuthActionTypes.AUTH_LOGIN_SUCCESSFUL;
    constructor(public user: User) {}
}
export class AuthLoginFailure implements Action {
    readonly type=AuthActionTypes.AUTH_LOGIN_FAILURE;
    constructor(public error :any) {}
}
export class AuthLogout implements Action {
    readonly type=AuthActionTypes.AUTH_LOGOUT;
}
export class AuthLogoutSuccessful implements Action {
    readonly type=AuthActionTypes.AUTH_LOGOUT_SUCCESSFUL;
}
export class AuthLogoutFailure implements Action {
    readonly type=AuthActionTypes.AUTH_LOGOUT_FAILURE;
    constructor(error : any){}
}
export class AuthLoginGetUserInfo implements Action {
    readonly type=AuthActionTypes.AUTH_LOGIN_GET_USER_INFO;
    constructor(public user: User) {}
}

export type AuthActions= AuthLogin | AuthLoginFailure | AuthLoginSuccessful  | AuthLoginGetUserInfo 
            | AuthLogout | AuthLogoutSuccessful | AuthLogoutFailure;
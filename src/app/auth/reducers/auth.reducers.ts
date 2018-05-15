import { AuthActionTypes, AuthLoginSuccessful, AuthActions } from "../actions/auth.actions";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../models/user.model";

export interface AuthState {
    isLoading: boolean;
    errMsg : string;
    loggedIn: boolean;
    user: User | null;
}

    const initState: AuthState = {
        isLoading: false,
        errMsg : "",
        loggedIn: false,
        user: null
    }
    /*
        const fakeAuthData = {
            user: {
                uid: "uyz2pWPVQEcKab3C7OP5PaSzYhI3",
                displayName: "",
                email: "dummy@gmail.com",
                roles: { admin: true },
                quizSettings: {
                    operators: { plus: '+', minus: '-' },
                    allowNegative: false,
                    maxExpressionPerQuiz: 8,
                    maxOpratorsPerQuiz: 8,
                }
            },
            additionalUserInfo: {
                profile: {
                    given_name: "dummy"
                }
            }
        }

        const initState: AuthState = {
            loggedIn: true,
            user: new User(fakeAuthData)
        }
   */ 
    export function authReducer(state: AuthState = initState, action: AuthActions) {
        switch (action.type) {
            case AuthActionTypes.AUTH_LOGIN:
                return {...initState, isLoading: true}
            case AuthActionTypes.AUTH_LOGIN_FAILURE:
                return {...initState, errMsg : action.error, isLoading: false }
            case AuthActionTypes.AUTH_LOGOUT_SUCCESSFUL:
                return initState;
            case AuthActionTypes.AUTH_LOGIN_SUCCESSFUL:
                return { loggedIn: true, user: action.user, errMsg: "", isLoading: false }
        }
        return state;
    }

    //export const selectAuthState = createFeatureSelector<AuthState>('auth');
    export const selectAuthState = createFeatureSelector<AuthState>('status');
    export const getLoggedIn = createSelector(selectAuthState, (s: AuthState) => s.loggedIn);
    export const getUserProfile = createSelector(selectAuthState, (s: AuthState) => s.user);
    export const getErrMsg= createSelector(selectAuthState, (s: AuthState) => s.errMsg);
    export const getIsLoading= createSelector(selectAuthState, (s: AuthState) => s.isLoading);
import { MetaReducer, ActionReducer, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/reducers/auth.reducers';
//import * as fromLoginPage from '../auth/reducers/login-page.reducer';

export interface rootState{
    status: fromAuth.AuthState
//    loginPage: fromLoginPage.State;
}

export const rootReducer : ActionReducerMap<rootState> = {
    status: fromAuth.authReducer
//    loginPage: fromLoginPage.reducer,
}
// console.log all actions
export function logger(reducer: ActionReducer<rootState>): ActionReducer<rootState> {
    return function(state: rootState, action: any): rootState {
      console.log('state', state);
      console.log('action', action);
  
      return reducer(state, action);
    };
  }
  export const metaReducers: MetaReducer<rootState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
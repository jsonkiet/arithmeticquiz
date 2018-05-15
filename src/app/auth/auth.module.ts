import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './containers/login-page.component';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthGuard } from './services/auth.guard';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
//    StoreModule.forFeature('auth',authReducer),
    EffectsModule.forFeature([AuthEffects]),
    CoreModule
  ],
  declarations: [LoginPageComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthGuard]
    }
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatCardModule, MatButtonModule } from '@angular/material';

import { MathModule } from './math/math.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './core/components/home.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthGuard } from './auth/services/auth.guard';
import { rootReducer, metaReducers } from './reducers';
import { ArithmeticComponent } from './math/arithmetic/arithmetic.component';
import { LogoutComponent } from './core/containers/logout.component';
import { NotFoundComponent } from './core/containers/not-found.component';
//import { SpinnerService } from './core/services/spinner.service';

/* 
  Resolved that Issue by downgrading the CLI to v1.6.8.
  Alternate Workaround is using ng serve --aot suggested by @stanleyeosakul
*/
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'math', loadChildren: './math/math.module#MathModule', canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  { path: 'reports', loadChildren: './reports/reports.module#ReportsModule', canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    //    StoreModule.forRoot({}), //use empty {} not for creating a state
    EffectsModule.forRoot([]),
    RouterModule.forRoot(routes),
    CoreModule.forRoot(),
    AuthModule.forRoot(),
  ],
  bootstrap: [AppComponent],
//  providers: [SpinnerService]
})
export class AppModule { }

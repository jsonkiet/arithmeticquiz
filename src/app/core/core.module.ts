import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './containers/app.component';
import { HomeComponent } from './components/home.component';
import { ToolbarComponent } from './components/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LogoutComponent } from './containers/logout.component';
import { SpinnerComponent } from './components/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { NotFoundComponent } from './containers/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  declarations: [AppComponent, HomeComponent, ToolbarComponent, LogoutComponent, SpinnerComponent, NotFoundComponent],
  exports: [AppComponent, HomeComponent, ToolbarComponent, LogoutComponent,SpinnerComponent, NotFoundComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [SpinnerService]
    }
  }
}

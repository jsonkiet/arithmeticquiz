import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent },
    ]),
    CoreModule
  ],
  declarations: [UserListComponent, UserDetailComponent]
})
export class AdminModule { }

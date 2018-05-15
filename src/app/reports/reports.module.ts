import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      /*{ path: ':id', component: QuizListComponent },
      { path: 'details/:id', component: QuizDetailsComponent },*/
      {
        path: ':id', component: QuizListComponent,
      }
    ]),
  ],
  declarations: [QuizListComponent]
})
export class ReportsModule { }

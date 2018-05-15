import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArithmeticComponent } from './arithmetic/arithmetic.component';
import { MatCardModule, MatRadioModule, MatIconModule } from '@angular/material';
import { SimpleArithmeticExpressionComponent } from './arithmetic/simple-arithmetic-expression.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      //{path: 'math', component: ArithmeticComponent, canActivate: [AuthGuard]}
      {path: '', component: ArithmeticComponent}
    ]),
    CoreModule,
  ],
  declarations: [ArithmeticComponent,SimpleArithmeticExpressionComponent],
//  exports: [ArithmeticComponent,SimpleArithmeticExpressionComponent]
})
export class MathModule { }

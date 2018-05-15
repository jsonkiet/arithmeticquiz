import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, 
    MatMenuModule, MatListModule, MatRadioModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSnackBarModule, 
    MatPaginatorModule, MatProgressSpinnerModule, 
    MatTableModule, MatToolbarModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const COMPS=[MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule, CdkTableModule, 
  MatMenuModule, MatListModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSidenavModule, MatSnackBarModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatToolbarModule];

@NgModule({
  imports:  COMPS, 
  exports: COMPS
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  declarations: [],
  exports: [MatButtonModule, MatCheckboxModule, MatSelectModule]
})
export class MaterialModule { }

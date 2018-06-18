import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RcAddButtonComponent } from './components/rc-add-button/rc-add-button.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { RcIngredientFormComponent } from './components/rc-ingredient-form/rc-ingredient-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [
    RcAddButtonComponent,
    RcIngredientFormComponent,
  ],
  exports: [
    RcAddButtonComponent,
  ]
})
export class RcSharedModule { }

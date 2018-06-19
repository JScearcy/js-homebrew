import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RcAddButtonComponent } from './components/rc-add-button/rc-add-button.component';
import { MatButtonModule, MatIconModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { RcIngredientFormComponent } from './components/rc-ingredient-form/rc-ingredient-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RcAddButtonComponent,
    RcIngredientFormComponent,
  ],
  exports: [
    RcAddButtonComponent,
    RcIngredientFormComponent,
  ]
})
export class RcSharedModule { }

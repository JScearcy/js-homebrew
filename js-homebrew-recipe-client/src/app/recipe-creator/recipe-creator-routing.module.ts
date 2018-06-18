import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';

const routes: Route[] = [
  { path: '', component: RecipeCreatorComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RecipeCreatorRoutingModule { }

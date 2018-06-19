import { Component, Input } from '@angular/core';
import { RecipeModel } from '../../models/recipe-model';

@Component({
  selector: 'rc-recipe-stats',
  templateUrl: './recipe-stats.component.html',
  styleUrls: ['./recipe-stats.component.css']
})
export class RecipeStatsComponent {
  @Input() recipe: RecipeModel;
}

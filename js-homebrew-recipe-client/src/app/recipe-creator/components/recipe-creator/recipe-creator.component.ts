import { Component, OnInit } from '@angular/core';

import { GrainModel } from '../../../../../../models/grain-model'
import { HopModel } from '../../../../../../models/hop-model'
import { YeastModel } from '../../../../../../models/yeast-model'
import { RecipeModel } from '../../../../../../js-homebrew-recipe-client/src/app/recipe-creator/models/recipe-model'
import { MatTableDataSource } from '@angular/material';
import { IngredientAdditionModel } from '@models/ingredient-addition.model';

@Component({
    selector: 'rc-recipe-creator',
    templateUrl: './recipe-creator.component.html',
    styleUrls: ['./recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {
    public grainDataSource = new MatTableDataSource<IngredientAdditionModel<GrainModel>>();
    public hopsDataSource = new MatTableDataSource<IngredientAdditionModel<HopModel>>();
    public yeastDataSource = new MatTableDataSource<IngredientAdditionModel<YeastModel>>();
    public recipe: RecipeModel;
    public displayedGrainsColumns = ['name', 'flavor', 'PPG', 'weight', 'lovi'];
    public displayedHopsColumns = [ 'name', 'origin', 'alpha-acid', 'weight' ];
    public displatedYeastColumns = ['name', 'attenuation'];

    constructor() {}

    ngOnInit() {
        this.recipe = new RecipeModel(5);
    }

    addIngredient(ingredient) {
        this.recipe.addIngredient(ingredient);
        if (ingredient.ingredient.constructor === GrainModel) {
            this.grainDataSource.data = this.recipe.ingredients.grains;
        } else if (ingredient.ingredient.constructor === HopModel) {
            this.hopsDataSource.data = this.recipe.ingredients.hops;
        } else if (ingredient.ingredient.constructor === YeastModel) {
            this.yeastDataSource.data = this.recipe.ingredients.yeasts;
        }
    }

    rowClicked(row) {
        console.log(row);
    }
}

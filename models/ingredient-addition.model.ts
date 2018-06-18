import { HopModel } from "./hop-model";
import { GrainModel } from "./grain-model";
import { YeastModel } from "./yeast-model";

export type Ingredient = HopModel | GrainModel | YeastModel;

export class IngredientAdditionModel<Ingredient> {
    constructor(public ingredient: Ingredient, public weight: number) {}
}
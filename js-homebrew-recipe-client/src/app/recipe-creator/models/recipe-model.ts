import { GrainModel } from '@models/grain-model';
import { HopModel } from '@models/hop-model';
import { IngredientAdditionModel, Ingredient } from '@models/ingredient-addition.model';
import { YeastModel } from '@models/yeast-model';

/**
 * A model to track additions to the recipe by the user and update the recipe stats
 * @class RecipeModel
 */
export class RecipeModel {
    og: number = 1.000; // Original Gravity estimate
    fg: number; // Final Gravity estimate
    ibu: number; // IBU estimate
    alc: number; // ABV estimate
    mcu: number = 0; // initial color estimate used for calculating SRM
    srm: number = 0; // final color estimate
    efficiency: number = 0.7; // Brewers efficiency
    ingredients: {
        grains: { grain: GrainModel, weight: number }[],
        hops: { hop: HopModel, weight: number }[],
        yeasts: { yeast: YeastModel }[],
    } =
        {
            grains: [],
            hops: [],
            yeasts: [],
        };

    /**
     * Creates an instance of RecipeModel.
     * 
     * @param {number} volume: volume in gallons for the recipe
     * @memberof RecipeModel
     */
    constructor(public volume: number = 5) { }

    /**
     * Add an ingreddient to the given recipe
     * @param {IngredientAdditionModel<Ingredient>} ingredientAddition: The ingredient and weight (if hop or grain) to add to the recipe
     * @memberof RecipeModel
     */
    addIngredient(ingredientAddition: IngredientAdditionModel<Ingredient>) {
        // A helper to allow sending the same model into the mode and allow recipe to add it as needed to the correct list
        if (ingredientAddition.ingredient.constructor === GrainModel) {
            this.addGrain({ grain: ingredientAddition.ingredient as GrainModel, weight: ingredientAddition.weight });
        } else if (ingredientAddition.ingredient.constructor === HopModel) {
            this.addHop({ hop: ingredientAddition.ingredient as HopModel, weight: ingredientAddition.weight });
        } else if (ingredientAddition.ingredient.constructor === YeastModel) {
            this.addYeast({ yeast: ingredientAddition.ingredient as YeastModel });
        }
    }

    private addGrain({ grain, weight }: { grain: GrainModel, weight: number }) {
        // ppgActual is calculated using the 1.XXX reading, multiplied by 1000 and subtracting 1000 to get an int of XXX
        const ppgActual = grain.PPG * 1000 - 1000;
        // recipePPG is calculated using this equation: recipePPG = weight(lbs) x ppgActual / volume
        const recipePPG = weight * ppgActual * this.efficiency / this.volume;
        // add the PPG added to the recipe by adding these grains (divide by 1000 to add to a form of 1.XXX)
        this.og = Number((this.og + recipePPG / 1000).toFixed(4));
        // calculating SRM involves calculating MCU: MCU = (grain_color * grain_weight_lbs)/volume_gallons
        this.mcu += grain.lovi * weight / this.volume;
        // calculating SRM takes MCU and creates the final color estimate (better for darker beers) SRM_Color = 1.4922 * [MCU ^ 0.6859] 
        this.srm = 1.4922 * (this.mcu ** 0.6859);
        // if srm is greater than 50 then it is considered black, so max at 50
        this.srm = this.srm > 50 ? 50 : this.srm;

        this.ingredients.grains.push({ grain, weight });
    }

    private addHop({ hop, weight }: { hop: HopModel, weight: number }) {
        // TODO: Add logic for calculating IBU and update recipe model
        this.ingredients.hops.push({ hop, weight });
    }

    private addYeast({ yeast }: { yeast: YeastModel }) {
        // TODO: Add logic for calculating estimated ABV/FG and updating recipe
        this.ingredients.yeasts.push({ yeast });
        console.log(yeast);
    }
}
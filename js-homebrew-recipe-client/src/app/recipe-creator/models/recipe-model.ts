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
    ibu: number = 0; // IBU estimate
    abv: number; // ABV estimate
    mcu: number = 0; // initial color estimate used for calculating SRM
    srm: number = 0; // final color estimate
    efficiency: number = 0.7; // Brewers efficiency
    ingredients: {
        grains: IngredientAdditionModel<GrainModel>[],
        hops: IngredientAdditionModel<HopModel>[],
        yeasts: IngredientAdditionModel<YeastModel>[],
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

        this.ingredients.grains.push({ ingredient: grain, weight });

        this.calculateFgAndAbv();
    }

    private addHop({ hop, weight }: { hop: HopModel, weight: number }) {
        // AAUs calculated using this formula: AAU = Weight (oz) x % Alpha Acids
        const aauActual = weight * hop.Alpha_Acid;
        // approx eulers number for following formula
        const euler = 2.71828;
        // Utilization = f(G) x f(T)
        // where: 
        // f(G) = 1.65 x 0.000125^(Gb - 1) 
        // f(T) = [1 - e^(-0.04 x T)] / 4.15
        // Add in time to be user selectable
        const baseTime = 30;
        const gravityFactor = 1.65 * (0.000125 ** (this.og - 1));
        const timeFactor = (1 - (euler ** (-0.04 * baseTime))) / 4.15;
        const utilization = gravityFactor * timeFactor;
        // finally IBU calculations using this formula: IBU = AAU x U x 75 / Volume
        this.ibu += (aauActual * utilization * 75) / this.volume;

        this.ingredients.hops.push({ ingredient: hop, weight });
    }

    private addYeast({ yeast }: { yeast: YeastModel }) {
        this.ingredients.yeasts.push({ ingredient: yeast, weight: null });
        this.calculateFgAndAbv();
    }

    private calculateFgAndAbv() {
        // Helper fn to pick max attentuation to be optimistic, or default to 75
        const attentuationGetter = (yeast) => yeast.Attenuation[1] || 75;
        // Add together all yeast as a start to get average attentuation
        const attenuationSum = this.ingredients.yeasts.reduce((attenuation, { ingredient }) => {
            const currAttenuation = attentuationGetter(ingredient);
            return attenuation + currAttenuation;
        }, 0);
        // get avg attentuation and convert to the estimated % left over after fermentation
        const avgAttenuation = (100 - attenuationSum / this.ingredients.yeasts.length) / 100;
        // fg is just ogGravityPoints * the estimated % left over after fermentation
        // ogGravityPoints is the ending decimal as a whole number 
        const ogGravityPoints = (this.og * 1000) - 1000;
        const fgGravityPoints = avgAttenuation * ogGravityPoints;
        // turn FG back into standard gravity notation by dividing by 1000 and adding 1
        // if fd is NaN we use the og since the math didn't work out
        this.fg = 1 + fgGravityPoints / 1000 || this.og;

        // calculating abv now that we have fg - the formula: ABV = 1.3291 x ((OG – FG) / FG)  x 100
        this.abv = 1.3291 * ((this.og - this.fg) / this.fg) * 100;
    }
}
import { RecipeModel } from './recipe-model';
import { GrainModel } from '../../../../../models/grain-model';
import { IngredientAdditionModel } from '../../../../../models/ingredient-addition.model';
import { HopModel } from '../../../../../models/hop-model';
import { YeastModel } from '@models/yeast-model';

describe('RecipeModel', () => {
    let model: RecipeModel;
    const testGrain = new GrainModel({
        id: 1,
        lovi: 1.8,
        flavor: '',
        name: 'TestGrain',
        PPG: 1.037,
    });

    const testHop = new HopModel({
        id: 1,
        Name: 'TestHop',
        Origin: '',
        Type: '',
        Alpha_Acid: 14.75,
        Beta_Acid: 5.6,
        Notes: ''
    });

    const testYeast = new YeastModel({
        Name: 'TestYeast',
        Attenuation: [73, 77],
    });

    beforeEach(() => {
        model = new RecipeModel(5);
    });

    it('should calculate og, and srm', () => { 
        const ingredientToAdd = new IngredientAdditionModel<GrainModel>(testGrain, 10);

        model.addIngredient(ingredientToAdd);

        expect(model.og.toFixed(3)).toBe('1.052');
        expect(model.srm.toFixed(1)).toBe('3.6');
    });

    it('should calculate ibu', () => { 
        const grainToAdd = new IngredientAdditionModel<GrainModel>(testGrain, 10);
        const hopToAdd = new IngredientAdditionModel<HopModel>(testHop, 1);

        model.addIngredient(grainToAdd);
        model.addIngredient(hopToAdd);

        expect(model.ibu.toFixed(2)).toBe('38.59');
    });

    it('should calculate fg and abv', () => { 
        const grainToAdd = new IngredientAdditionModel<GrainModel>(testGrain, 10);
        const hopToAdd = new IngredientAdditionModel<HopModel>(testHop, 1);
        const yeastToAdd = new IngredientAdditionModel<YeastModel>(testYeast, null);

        model.addIngredient(grainToAdd);
        model.addIngredient(hopToAdd);
        model.addIngredient(yeastToAdd);

        expect(model.fg.toFixed(3)).toBe('1.013');
        expect(model.abv.toFixed(2)).toBe('5.10');
    });
});
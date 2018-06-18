import { RecipeCreatorModule } from './recipe-creator.module';

describe('RecipeCreatorModule', () => {
  let recipeCreatorModule: RecipeCreatorModule;

  beforeEach(() => {
    recipeCreatorModule = new RecipeCreatorModule();
  });

  it('should create an instance', () => {
    expect(recipeCreatorModule).toBeTruthy();
  });
});

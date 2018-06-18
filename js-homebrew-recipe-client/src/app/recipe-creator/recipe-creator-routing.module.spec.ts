import { RecipeCreatorRoutingModule } from './recipe-creator-routing.module';

describe('RecipeCreatorRoutingModule', () => {
  let recipeCreatorRoutingModule: RecipeCreatorRoutingModule;

  beforeEach(() => {
    recipeCreatorRoutingModule = new RecipeCreatorRoutingModule();
  });

  it('should create an instance', () => {
    expect(recipeCreatorRoutingModule).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap, map, startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { GrainModel } from '../../../../../../models/grain-model'
import { HopModel } from '../../../../../../models/hop-model'
import { YeastModel } from '../../../../../../models/yeast-model'
import { RecipeModel } from '../../../../../../js-homebrew-recipe-client/src/app/recipe-creator/models/recipe-model'
import { DataPortalService } from '../../services/data-portal/data-portal.service';

@Component({
    selector: 'rc-recipe-creator',
    templateUrl: './recipe-creator.component.html',
    styleUrls: ['./recipe-creator.component.css']
})
export class RecipeCreatorComponent implements OnInit {
    public grainOptions: Observable<GrainModel[]>;
    public hopOptions: Observable<HopModel[]>;
    public yeastOptions: Observable<YeastModel[]>;
    public grainFilterValueGetter: (val) => string;
    public hopFilterValueGetter: (val) => string;
    public yeastFilterValueGetter: (val) => string;
    public recipe: RecipeModel;

    constructor(private dataPortal: DataPortalService, private fb: FormBuilder) { 
        this.recipe = new RecipeModel(5);
    }

    ngOnInit() {
        this.grainOptions = this.dataPortal.getGrains();
        this.grainFilterValueGetter = this.filterValueGetter('name');

        this.hopOptions = this.dataPortal.getHops();
        this.hopFilterValueGetter = this.filterValueGetter('Name');

        this.yeastOptions = this.dataPortal.getYeasts();
        this.yeastFilterValueGetter = this.filterValueGetter('Name');
    }

    addIngredient(ingredient) {
        this.recipe.addIngredient(ingredient);
    }

    displayGrain(grain?: GrainModel): string | undefined {
        return grain ? `${grain.name} | ${grain.PPG} | ${grain.lovi}` : undefined;
    }

    displayHop(hop?: HopModel): string | undefined {
        return hop ? hop.Name : undefined;
    }

    displayYeast(yeast?: YeastModel): string | undefined {
        return yeast ? yeast.Name : undefined;
    }

    filterValueGetter(propertyName: string): (val) => string {
        return (val) => {
            let name = null;
            if (val) {
                name = val[propertyName] || val;
            }
            return name;
        }
    }
}

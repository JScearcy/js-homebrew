import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { GrainModel } from '../../../../../../models/grain-model';
import { HopModel } from '../../../../../../models/hop-model';
import { YeastModel } from '../../../../../../models/yeast-model';
import { DataPortalService } from 'src/app/recipe-creator/services/data-portal/data-portal.service';
import { AddIngredientModel } from '../../../rc-shared/models/add-ingredient.model';

@Component({
    selector: 'rc-recipe-forms',
    templateUrl: './recipe-forms.component.html',
    styleUrls: ['./recipe-forms.component.css']
})
export class RecipeFormsComponent implements OnInit {
    public grainOptions: Observable<GrainModel[]>;
    public hopOptions: Observable<HopModel[]>;
    public yeastOptions: Observable<YeastModel[]>;
    public grainFilterValueGetter: (val) => string;
    public hopFilterValueGetter: (val) => string;
    public yeastFilterValueGetter: (val) => string;
    @Output() ingredientAdded: EventEmitter<AddIngredientModel> = new EventEmitter();

    constructor(private dataPortal: DataPortalService) { }

    ngOnInit() {
        this.grainOptions = this.dataPortal.getGrains();
        this.grainFilterValueGetter = this.filterValueGetter('name');

        this.hopOptions = this.dataPortal.getHops();
        this.hopFilterValueGetter = this.filterValueGetter('Name');

        this.yeastOptions = this.dataPortal.getYeasts();
        this.yeastFilterValueGetter = this.filterValueGetter('Name');
    }

    addIngredient(ingredient) {
        this.ingredientAdded.emit(ingredient);
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

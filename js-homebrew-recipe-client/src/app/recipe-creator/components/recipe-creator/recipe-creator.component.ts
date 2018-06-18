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
    public grainForm: FormGroup;
    public hopForm: FormGroup;
    public yeastForm: FormGroup;
    public recipe: RecipeModel;

    constructor(private dataPortal: DataPortalService, private fb: FormBuilder) { 
        this.grainForm = fb.group({
            grain: [null, Validators.required],
            weight: [null, Validators.required],
        });
        this.hopForm = fb.group({
            hop: [null, Validators.required],
            weight: [null, Validators.required],
        });
        this.yeastForm = fb.group({
            yeast: [null, Validators.required],
        });
        this.recipe = new RecipeModel(5);
    }

    ngOnInit() {
        this.grainOptions = this.filterHandler(this.dataPortal.getGrains(), this.grainForm, (val) => {
                let name = null;
                if (val && val.grain) {
                    name = val.grain.name || val.grain;
                }
                return name;
        });

        this.hopOptions = this.filterHandler(this.dataPortal.getHops(), this.hopForm, (val) => {
            let name = null;
            if (val && val.hop) {
                name = val.hop.Name || val.hop;
            }
            return name;
        });
        this.yeastOptions = this.filterHandler(this.dataPortal.getYeasts(), this.yeastForm, (val) => {
            let name = null;
            if (val && val.yeast) {
                name = val.yeast.Name || val.yeast;
            }
            return name;
        });
    }

    addGrain() {
        if (this.grainForm.valid) {
            this.recipe.addIngredient({
                ingredient: this.grainForm.get('grain').value,
                weight: this.grainForm.get('weight').value,
            });
            this.grainForm.reset();
        }
    }

    addHop() {
        if (this.hopForm.valid) {
            this.recipe.addIngredient({
                ingredient: this.hopForm.get('hop').value,
                weight: this.hopForm.get('weight').value,
            })
            this.hopForm.reset();
        }
    }

    addYeast() {
        if (this.yeastForm.valid) {
            this.recipe.addIngredient({
                ingredient: this.yeastForm.get('yeast').value,
                weight: null,
            });
        }
    }

    displayGrain(grain?: GrainModel): string | undefined {
        return grain ? grain.name : undefined;
    }

    displayHop(hop?: HopModel): string | undefined {
        return hop ? hop.Name : undefined;
    }

    displayYeast(yeast?: YeastModel): string | undefined {
        return yeast ? yeast.Name : undefined;
    }

    autoCompleteFilter(val: string, options) {
        if (val) {
            return options.filter(option => {
                const name = option.name || option.Name;
                return name.toLowerCase().includes(val.toLowerCase());
            });
        } else {
            return options;
        }
    }

    filterHandler(obs, control: AbstractControl, valueGetter: (val) => string) {
        return obs
        .pipe(
            flatMap(grains => {
                return control.valueChanges
                .pipe(
                    startWith(null),
                    map(val => {
                        let name = valueGetter(val);
                        return this.autoCompleteFilter(name, grains);
                    })
                )
            })
        );
    }
}

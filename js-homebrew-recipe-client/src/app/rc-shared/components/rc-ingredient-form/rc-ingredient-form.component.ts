import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';
import { AddIngredientModel } from '../../models/add-ingredient.model';

@Component({
    selector: 'rc-ingredient-form',
    templateUrl: './rc-ingredient-form.component.html',
    styleUrls: ['./rc-ingredient-form.component.css']
})
export class RcIngredientFormComponent implements OnInit, OnChanges {
    @Input() weightUnit;
    @Input() displayFn;
    @Input() options = [];
    @Input() filterValueGetter;
    @Input() placeholder = '';
    @Output() addedIngredient = new EventEmitter<AddIngredientModel>();
    public displayOptions;
    public ingredientForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.displayOptions = this.options;

        const ingredientFormOptions: any = {
            ingredient: [null, Validators.required]
        }

        if (this.weightUnit) {
            ingredientFormOptions.weight = [null, Validators.required];
        }

        this.ingredientForm = this.fb.group(ingredientFormOptions);
    
        if (this.filterValueGetter) {
            this.ingredientForm.controls['ingredient'].valueChanges
                .pipe(
                    startWith(null),
                ).subscribe(val => this.filter(val, this.filterValueGetter));
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes && changes.options && changes.options.currentValue) {
            this.displayOptions = changes.options.currentValue;
        }
    }

    addIngredient() {
        if (this.ingredientForm.valid) {
            const ingredient: AddIngredientModel = {
                ingredient: this.ingredientForm.get('ingredient').value,
                weight: this.ingredientForm.get('weight') ? this.ingredientForm.get('weight').value : null,
            }
            this.addedIngredient.emit(ingredient);
        }
    }

    filter(val, filterValueGetter) {
        if (val) {
            val = filterValueGetter(val);
            this.displayOptions = this.options.filter(option => {
                const optionVal = filterValueGetter(option);
                return optionVal.toLowerCase().includes(val.toLowerCase())
            });
        } else {
            this.displayOptions = this.options;
        }
    }

}

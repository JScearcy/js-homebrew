import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcIngredientFormComponent } from './rc-ingredient-form.component';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RcAddButtonComponent } from '../rc-add-button/rc-add-button.component';

describe('RcIngredientFormComponent', () => {
    let component: RcIngredientFormComponent;
    let fixture: ComponentFixture<RcIngredientFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                NoopAnimationsModule,
            ],
            declarations: [
                RcIngredientFormComponent,
                RcAddButtonComponent,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RcIngredientFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

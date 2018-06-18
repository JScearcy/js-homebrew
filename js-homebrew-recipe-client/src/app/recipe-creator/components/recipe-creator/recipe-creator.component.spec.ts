import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { RecipeCreatorComponent } from './recipe-creator.component';
import { RcSharedModule } from '../../../rc-shared/rc-shared.module';
import { RecipeStatsComponent } from '../recipe-stats/recipe-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RecipeCreatorComponent', () => {
    let component: RecipeCreatorComponent;
    let fixture: ComponentFixture<RecipeCreatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MatAutocompleteModule,
                MatFormFieldModule,
                MatInputModule,
                RcSharedModule,
                HttpClientTestingModule,
                NoopAnimationsModule,
            ],
            declarations: [
                RecipeCreatorComponent,
                RecipeStatsComponent,
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeCreatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

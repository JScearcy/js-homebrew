import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { RecipeCreatorComponent } from './recipe-creator.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeCreatorModule } from '../../recipe-creator.module';
import { MockDataPortalService } from '../../services/data-portal/__mocks__/mock-data-portal.service';
import { DataPortalService } from '../../services/data-portal/data-portal.service';

describe('RecipeCreatorComponent', () => {
    let component: RecipeCreatorComponent;
    let fixture: ComponentFixture<RecipeCreatorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RecipeCreatorModule,
                NoopAnimationsModule,
            ],
            providers: [
                { provide: DataPortalService, useClass: MockDataPortalService },
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

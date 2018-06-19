import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { RecipeCreatorComponent } from './recipe-creator.component';
import { RcSharedModule } from '../../../rc-shared/rc-shared.module';
import { RecipeStatsComponent } from '../recipe-stats/recipe-stats.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataPortalService } from '../../services/data-portal/data-portal.service';
import { MockDataPortalService } from '../../services/data-portal/__mocks__/mock-data-portal.service';

describe('RecipeCreatorComponent', () => {
    let component: RecipeCreatorComponent;
    let fixture: ComponentFixture<RecipeCreatorComponent>;
    const mockDataPortal = new MockDataPortalService();

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
            providers: [
                { provide: DataPortalService, useValue: mockDataPortal }
            ]
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

    it('should provide grains from service', () => {
        component.grainOptions.subscribe(grains => {
            expect(grains.length).toBe(mockDataPortal['grains'].length);
        });
    });

    it('should provide hops from service', () => {
        component.hopOptions.subscribe(hops => {
            expect(hops.length).toBe(mockDataPortal['hops'].length);
        });
    });

    it('should provide yeasts from service', () => {
        component.yeastOptions.subscribe(yeasts => {
            expect(yeasts.length).toBe(mockDataPortal['yeasts'].length);
        });
    });

    it('should return undefined when displayFns are provided no value', () => {
        const grainDisplay = component.displayGrain(null);
        const hopDisplay = component.displayHop(null);
        const yeastDisplay = component.displayYeast(null);

        expect(grainDisplay).toBeFalsy();
        expect(hopDisplay).toBeFalsy();
        expect(yeastDisplay).toBeFalsy();
    });

    it('should format the grain model as a string', () => {
        component.grainOptions.subscribe(grains => {
            const grain = grains[0];
            const grainDisplay = component.displayGrain(grain);
            expect(grainDisplay).toBe(`${grain.name} | ${grain.PPG} | ${grain.lovi}`)
        });
    });

    it('should format the hop model as a string', () => {
        component.hopOptions.subscribe(hops => {
            const hop = hops[0];
            const hopDisplay = component.displayHop(hop);
            expect(hopDisplay).toBe(hop.Name);
        });
    });

    it('should format the yeast model as a string', () => {
        component.yeastOptions.subscribe(yeasts => {
            const yeast = yeasts[0];
            const yeastDisplay = component.displayYeast(yeast);
            expect(yeastDisplay).toBe(yeast.Name);
        });
    });

    it('should be able to return the proper value from filterValueGetter', () => {
        const propertyName = 'name';
        const filterValueGetter = component.filterValueGetter(propertyName);
        const stringValue = 'StringValue';
        const objectValue = {
            [propertyName]: stringValue,
        }

        expect(filterValueGetter(null)).toBe(null);
        expect(filterValueGetter(stringValue)).toBe(stringValue);
        expect(filterValueGetter(objectValue)).toBe(stringValue);
    });
});

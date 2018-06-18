import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStatsComponent } from './recipe-stats.component';
import { RcSharedModule } from '../../../rc-shared/rc-shared.module';

describe('RecipeStatsComponent', () => {
    let component: RecipeStatsComponent;
    let fixture: ComponentFixture<RecipeStatsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RcSharedModule,
            ],
            declarations: [RecipeStatsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecipeStatsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { RecipeCreatorRoutingModule } from './recipe-creator-routing.module';
import { RcSharedModule } from '../rc-shared/rc-shared.module';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';
import { DataPortalService } from './services/data-portal/data-portal.service';
import { RecipeStatsComponent } from './components/recipe-stats/recipe-stats.component';

@NgModule({
    imports: [
        CommonModule,
        RecipeCreatorRoutingModule,
        RcSharedModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RecipeCreatorComponent,
        RecipeStatsComponent,
    ],
    providers: [
        DataPortalService,
    ]
})
export class RecipeCreatorModule { }

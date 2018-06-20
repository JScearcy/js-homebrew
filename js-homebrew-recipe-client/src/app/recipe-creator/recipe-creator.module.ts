import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeCreatorComponent } from './components/recipe-creator/recipe-creator.component';
import { RecipeCreatorRoutingModule } from './recipe-creator-routing.module';
import { RcSharedModule } from '../rc-shared/rc-shared.module';
import { MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatExpansionModule, MatTabsModule, MatTableModule } from '@angular/material';
import { DataPortalService } from './services/data-portal/data-portal.service';
import { RecipeStatsComponent } from './components/recipe-stats/recipe-stats.component';
import { RecipeFormsComponent } from './components/recipe-forms/recipe-forms.component';

@NgModule({
    imports: [
        CommonModule,
        RecipeCreatorRoutingModule,
        RcSharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        ReactiveFormsModule,
    ],
    declarations: [
        RecipeCreatorComponent,
        RecipeStatsComponent,
        RecipeFormsComponent,
    ],
    providers: [
        DataPortalService,
    ]
})
export class RecipeCreatorModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GrainModel } from '../../../../../../models/grain-model'
import { HopModel } from '../../../../../../models/hop-model'
import { YeastModel } from '../../../../../../models/yeast-model'
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DataPortalService {
    private grains: GrainModel[] = null;
    private hops: HopModel[] = null;
    private yeasts: YeastModel[] = null;
    private baseUrl = environment.baseUrl || '';

    constructor(private http: HttpClient) { }

    getGrains(): Observable<GrainModel[]> {
        return this.getIngredientObservable(this.grains, `${this.baseUrl}/api/v1/grains`, grains => {
            this.grains = grains.map(grain => new GrainModel(grain));
            return this.grains;
        });
    }

    getHops(): Observable<HopModel[]> {
        return this.getIngredientObservable(this.hops, `${this.baseUrl}/api/v1/hops`, hops => {
            this.hops = hops.map(hop => new HopModel(hop));
            return this.hops
        });
    }

    getYeasts(): Observable<YeastModel[]> {
        return this.getIngredientObservable(this.yeasts, `${this.baseUrl}/api/v1/yeasts`, yeasts => {
            this.yeasts = yeasts.map(yeast => new YeastModel(yeast));
            return this.yeasts;
        });
    }

    getIngredientObservable<T>(ingredientList: T, url: string, mapCb): Observable<T> {
        if (ingredientList !== null) {
            return Observable.create(observer => {
                observer.next(ingredientList);
                observer.complete();
            });
        } else {
            return this.http.get<T[]>(url)
                .pipe(
                    map(mapCb)
                );
        }
    }
}

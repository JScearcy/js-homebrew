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
    // TODO: Extract helper function in order to reduce duplication
    getGrains(): Observable<GrainModel[]> {
        if (this.grains !== null) {
            return Observable.create((observer) => {
                observer.next(this.grains);
                observer.complete();
            });
        }
        return this.http.get<GrainModel[]>(`${this.baseUrl}/api/v1/grains`)
            .pipe(
                map(grains => {
                    this.grains = grains.map(grain => new GrainModel(grain));
                    return this.grains;
                })
            );
    }

    getHops(): Observable<HopModel[]> {
        if (this.hops !== null) {
            return Observable.create((observer) => {
                observer.next(this.hops);
                observer.complete();
            });
        }
        return this.http.get<HopModel[]>(`${this.baseUrl}/api/v1/hops`)
            .pipe(
                map(hops => {
                    this.hops = hops.map(hop => new HopModel(hop));
                    return this.hops
                })
            );
    }

    getYeasts(): Observable<YeastModel[]> {
        if (this.yeasts !== null) {
            return Observable.create((observer) => {
                observer.next(this.yeasts);
                observer.complete();
            });
        }
        return this.http.get<YeastModel[]>(`${this.baseUrl}/api/v1/yeasts`)
            .pipe(
                map(yeasts => {
                    this.yeasts = yeasts.map(yeast => new YeastModel(yeast));
                    return this.yeasts;
                })
            );
    }
}

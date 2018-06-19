import { Observable } from "rxjs";

import { YeastModel } from "@models/yeast-model";
import { HopModel } from "@models/hop-model";
import { GrainModel } from "@models/grain-model";

export class MockDataPortalService {
    private grains: GrainModel[] = [
        new GrainModel({
            id: 1,
            lovi: 1.8,
            flavor: '',
            name: 'TestGrain',
            PPG: 1.037,
        })
    ];
    private hops: HopModel[] = [
        new HopModel({
            id: 1,
            Name: 'TestHop',
            Origin: '',
            Type: '',
            Alpha_Acid: 14.75,
            Beta_Acid: 5.6,
            Notes: ''
        })
    ];
    private yeasts: YeastModel[] = [
        new YeastModel({
            Name: 'TestYeast',
            Attenuation: [73, 77]
        })
    ];

    constructor() { }
    getGrains(): Observable<GrainModel[]> {
        return this.liftObservable(this.grains);
    }

    getHops(): Observable<HopModel[]> {
        return this.liftObservable(this.hops);
    }

    getYeasts(): Observable<YeastModel[]> {
        return this.liftObservable(this.yeasts);
    }

    private liftObservable<T>(val: T): Observable<T> {
        return Observable.create((observer) => {
            observer.next(val);
            observer.complete();
        })
    }
}
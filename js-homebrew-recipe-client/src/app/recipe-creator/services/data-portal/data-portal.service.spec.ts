import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { DataPortalService } from './data-portal.service';
import { GrainModel } from '@models/grain-model';
import { HopModel } from '@models/hop-model';
import { YeastModel } from '@models/yeast-model';

describe('DataPortalService', () => {
    const mockGrains = [
        new GrainModel({id: 1, lovi: 1, flavor: 'test', name: 'test', PPG: 1}),      
    ];
    const mockHops = [
        new HopModel({id: 1, Name: 'TestHop', Type: '', Alpha_Acid: 5.6, Beta_Acid: 0, Notes: '', Origin: ''}),
    ];
    const mockYeasts = [
        new YeastModel({Name: 'TestYeast', Attenuation: [73,77]}),
    ];
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [DataPortalService]
        });
    });

    it('should be created', inject([DataPortalService], (service: DataPortalService) => {
        expect(service).toBeTruthy();
    }));

    it('should return grains as provided', inject([HttpTestingController, DataPortalService], (
        httpMock: HttpTestingController,
        service: DataPortalService
    ) => {
        service.getGrains().subscribe(grainCall => {
            expect(grainCall.length).toBe(mockGrains.length);
            expect(grainCall[0].id).toBe(mockGrains[0].id);
            expect(grainCall[0].lovi).toBe(mockGrains[0].lovi);
            expect(grainCall[0].flavor).toBe(mockGrains[0].flavor);
            expect(grainCall[0].name).toBe(mockGrains[0].name);
            expect(grainCall[0].PPG).toBe(mockGrains[0].id);
        });

        const mockReq = httpMock.expectOne(`${service['baseUrl']}/api/v1/grains`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockGrains);

        httpMock.verify();
    }));

    it('should return grains without call if already set', inject([HttpTestingController, DataPortalService], (
        httpMock: HttpTestingController,
        service: DataPortalService
    ) => {
        service['grains'] = mockGrains;

        service.getGrains().subscribe(grainCall => {
            expect(grainCall.length).toBe(mockGrains.length);
            expect(grainCall[0].id).toBe(mockGrains[0].id);
            expect(grainCall[0].lovi).toBe(mockGrains[0].lovi);
            expect(grainCall[0].flavor).toBe(mockGrains[0].flavor);
            expect(grainCall[0].name).toBe(mockGrains[0].name);
            expect(grainCall[0].PPG).toBe(mockGrains[0].id);
        });

        httpMock.expectNone(`${service['baseUrl']}/api/v1/grains`);

        httpMock.verify();
    }));
    
    it('should return hops as provided', inject([HttpTestingController, DataPortalService], (
        httpMock: HttpTestingController,
        service: DataPortalService
    ) => {
        service.getHops().subscribe(hopCall => {
            expect(hopCall.length).toBe(mockHops.length);
            expect(hopCall[0].id).toBe(mockHops[0].id);
            expect(hopCall[0].Alpha_Acid).toBe(mockHops[0].Alpha_Acid);
            expect(hopCall[0].Beta_Acid).toBe(mockHops[0].Beta_Acid);
            expect(hopCall[0].Name).toBe(mockHops[0].Name);
            expect(hopCall[0].Notes).toBe(mockHops[0].Notes);
        });

        const mockReq = httpMock.expectOne(`${service['baseUrl']}/api/v1/hops`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockHops);

        httpMock.verify();
    }));
    
    it('should return yeast as provided', inject([HttpTestingController, DataPortalService], (
        httpMock: HttpTestingController,
        service: DataPortalService
    ) => {
        service.getYeasts().subscribe(yeastCall => {
            expect(yeastCall.length).toBe(mockYeasts.length);
            expect(yeastCall[0].Name).toBe(mockYeasts[0].Name);
        });

        const mockReq = httpMock.expectOne(`${service['baseUrl']}/api/v1/yeasts`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockYeasts);

        httpMock.verify();
    }));
});

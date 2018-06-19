import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { DataPortalService } from './data-portal.service';
import { GrainModel } from '@models/grain-model';

describe('DataPortalService', () => {
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
        const mockGrains = [
            new GrainModel({id: 1, lovi: 1, flavor: 'test', name: 'test', PPG: 1}),      
        ];
        service.getGrains().subscribe(grainCall => {
            expect(mockGrains.length).toBe(grainCall.length);
            expect(mockGrains[0].id).toBe(grainCall[0].id);
            expect(mockGrains[0].lovi).toBe(grainCall[0].lovi);
            expect(mockGrains[0].flavor).toBe(grainCall[0].flavor);
            expect(mockGrains[0].name).toBe(grainCall[0].name);
            expect(mockGrains[0].id).toBe(grainCall[0].PPG);
        });

        const mockReq = httpMock.expectOne(`${service['baseUrl']}/api/v1/grains`);
        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockGrains);

        httpMock.verify();
    }));
});

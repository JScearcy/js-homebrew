import 'jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Database } from 'sqlite3';
import { SQLITE_DB_TOKEN } from '../../providers/database.tokens';
import { DataPortalService } from './data-portal.service';
import { GrainModel } from '../../models/grain-model';
jest.mock('sqlite3');

describe('DataPortalService', () => {
    let service: DataPortalService;
    // tests work on the premise that this array is all the same type
    const allResponse = [
        new GrainModel(),
        new GrainModel(),
        new GrainModel(),
    ];

    const singleResponse = new GrainModel();
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DataPortalService,
                {
                    provide: SQLITE_DB_TOKEN, useFactory: () => {
                        const db: any = new Database('');
                        db.prepare.mockReturnValue({
                            all: (cb) => setTimeout(() => cb(null, allResponse), 0),
                            get: (cb) => setTimeout(() => cb(null, singleResponse), 0),
                        });
                        return db;
                    },
                },
            ],
        }).compile();
        service = module.get<DataPortalService>(DataPortalService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return db response unchanged on getGrains call', done => {
        const getGrainObservable = service.getGrains();
        return getGrainObservable.toPromise().then(response => {
            expect(response.length).toBe(allResponse.length);
            const typeName = allResponse[0].constructor.name;
            expect(response.every(item => item.constructor.name === typeName)).toBeTruthy();
            done();
        });
    });

    it('should return db response unchanged on getHops call', done => {
        const getGrainObservable = service.getHops();
        return getGrainObservable.toPromise().then(response => {
            expect(response.length).toBe(allResponse.length);
            const typeName = allResponse[0].constructor.name;
            expect(response.every(item => item.constructor.name === typeName)).toBeTruthy();
            done();
        });
    });

    it('should return db response unchanged on getYeasts call', done => {
        const getGrainObservable = service.getYeasts();
        return getGrainObservable.toPromise().then(response => {
            expect(response.length).toBe(allResponse.length);
            const typeName = allResponse[0].constructor.name;
            expect(response.every(item => item.constructor.name === typeName)).toBeTruthy();
            done();
        });
    });

    it('should return db response unchanged on getGrain (single) call', done => {
        const getGrainObservable = service.getGrain(1);
        return getGrainObservable.toPromise().then(response => {
            expect(typeof response).toBe(typeof singleResponse);
            expect(response.constructor.name).toBe(singleResponse.constructor.name);
            done();
        });
    });

    it('should return db response unchanged on getHop (single) call', done => {
        const getGrainObservable = service.getHop(1);
        return getGrainObservable.toPromise().then(response => {
            expect(typeof response).toBe(typeof singleResponse);
            expect(response.constructor.name).toBe(singleResponse.constructor.name);
            done();
        });
    });

    it('should return db response unchanged on getYeast (single) call', done => {
        const getGrainObservable = service.getYeast(1);
        return getGrainObservable.toPromise().then(response => {
            expect(typeof response).toBe(typeof singleResponse);
            expect(response.constructor.name).toBe(singleResponse.constructor.name);
            done();
        });
    });
});

describe('DataPortalService with error', () => {
    let service: DataPortalService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DataPortalService,
                {
                    provide: SQLITE_DB_TOKEN, useFactory: () => {
                        const db: any = new Database('');
                        db.prepare.mockReturnValue({
                            all: (cb) => setTimeout(() => cb('all error'), 0),
                            get: (cb) => setTimeout(() => cb('get error'), 0),
                        });
                        return db;
                    },
                },
            ],
        }).compile();
        service = module.get<DataPortalService>(DataPortalService);
    });

    it('should return an error if the db responds with an error', done => {
        return service.getGrains()
            .toPromise()
            // if this is called then it has a response, it should have failed
            .then(_ => done.fail())
            .catch(err => {
                expect(err).toBeTruthy();
                done();
            });
    });
});
import 'jest';
import { Test, TestingModule } from '@nestjs/testing';
import { HopsController } from './hops.controller';
import { DataPortalService } from '../../services/data-portal/data-portal.service';
import { HopModel } from '../../models/hop-model';

describe('Hops Controller', () => {
    let module: TestingModule;
    let controller: HopsController;
    const hopsResponse = [
        new HopModel(),
        new HopModel(),
    ];
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [HopsController],
            providers: [
                {
                    provide: DataPortalService,
                    useFactory: () => {
                        const dataPortalService = {
                            getHops: () => {
                                return hopsResponse;
                            },
                            getHop: (id: number) => {
                                expect(isNaN(id)).toBeFalsy();
                                return new HopModel();
                            },
                        };
                        return dataPortalService;
                    },
                },
            ],
        }).compile();
    });

    beforeEach(() => {
        controller = module.get<HopsController>(HopsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return hops provided from dataportal', () => {
        const results = controller.getHops();

        expect(results).toBeTruthy();
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBe(hopsResponse.length);
    });

    it('should return hops provided from dataportal and pass id', () => {
        const results = controller.getHop({ id: 1 });

        expect(results).toBeTruthy();
    });
});

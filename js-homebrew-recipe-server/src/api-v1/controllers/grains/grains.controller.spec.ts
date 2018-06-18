import 'jest';
import { Test, TestingModule } from '@nestjs/testing';
import { GrainsController } from './grains.controller';
import { DataPortalService } from '../../services/data-portal/data-portal.service';
import { GrainModel } from '../../models/grain-model';

describe('Grains Controller', () => {
    let module: TestingModule;
    let controller: GrainsController;
    const grainsResponse = [
        new GrainModel(),
        new GrainModel(),
    ];
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [GrainsController],
            providers: [
                {
                    provide: DataPortalService,
                    useFactory: () => {
                        const dataPortalService = {
                            getGrains: () => {
                                return grainsResponse;
                            },
                            getGrain: (id: number) => {
                                expect(isNaN(id)).toBeFalsy();
                                return new GrainModel();
                            },
                        };
                        return dataPortalService;
                    },
                },
            ],
        }).compile();
    });

    beforeEach(() => {
        controller = module.get<GrainsController>(GrainsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return grains proovided from dataportal', () => {
        const results = controller.getGrains();

        expect(results).toBeTruthy();
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBe(grainsResponse.length);
    });

    it('should return grain provided from dataportal', () => {
        const results = controller.getGrain({ id: 1 });

        expect(results).toBeTruthy();
    });
});

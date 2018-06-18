import { Test, TestingModule } from '@nestjs/testing';
import { YeastsController } from './yeasts.controller';
import { DataPortalService } from '../../services/data-portal/data-portal.service';
import { YeastModel } from '../../models/yeast-model';

describe('Yeasts Controller', () => {
    let module: TestingModule;
    let controller: YeastsController;
    const yeastsResponse = [
        new YeastModel(),
        new YeastModel(),
    ];
    beforeAll(async () => {
        module = await Test.createTestingModule({
            controllers: [YeastsController],
            providers: [
                {
                    provide: DataPortalService,
                    useFactory: () => {
                        const dataPortalService = {
                            getYeasts: () => {
                                return yeastsResponse;
                            },
                            getYeast: (id: number) => {
                                expect(isNaN(id)).toBeFalsy();
                                return new YeastModel();
                            },
                        };
                        return dataPortalService;
                    },
                },
            ],
        }).compile();
    });

    beforeEach(() => {
        controller = module.get<YeastsController>(YeastsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return yeasts provided from dataportal', () => {
        const results = controller.getYeasts();

        expect(results).toBeTruthy();
        expect(Array.isArray(results)).toBeTruthy();
        expect(results.length).toBe(yeastsResponse.length);
    });

    it('should return yeast provided from dataportal and pass id', () => {
        const results = controller.getYeast({ id: 1 });

        expect(results).toBeTruthy();
    });
});

import { Controller, Get, Param } from '@nestjs/common';

import { DataPortalService } from '../../services/data-portal/data-portal.service';

@Controller('grains')
export class GrainsController {
    constructor(private readonly dataPortal: DataPortalService) {}

    @Get()
    getGrains() {
        return this.dataPortal.getGrains();
    }

    @Get(':id')
    getGrain(@Param() params) {
        return this.dataPortal.getGrain(params.id);
    }
}

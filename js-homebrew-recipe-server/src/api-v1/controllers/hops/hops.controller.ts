import { Controller, Get, Param } from '@nestjs/common';

import { DataPortalService } from '../../services/data-portal/data-portal.service';

@Controller('hops')
export class HopsController {
    constructor(private readonly dataPortal: DataPortalService) {}

    @Get()
    getHops() {
        return this.dataPortal.getHops();
    }

    @Get(':id')
    getHop(@Param() { id }) {
        return this.dataPortal.getHop(id);
    }
}

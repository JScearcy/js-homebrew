import { Controller, Get, Param } from '@nestjs/common';
import { DataPortalService } from '../../services/data-portal/data-portal.service';

@Controller('yeasts')
export class YeastsController {
    constructor(private readonly dataPortal: DataPortalService) {}

    @Get()
    getYeasts() {
        return this.dataPortal.getYeasts();
    }

    @Get(':id')
    getYeast(@Param() { id }) {
        return this.dataPortal.getYeast(id);
    }
}

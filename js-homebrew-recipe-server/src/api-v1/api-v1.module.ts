import { Module } from '@nestjs/common';
import { GrainsController } from './controllers/grains/grains.controller';
import { DataPortalService } from './services/data-portal/data-portal.service';
import { databaseProviders } from './providers/database.providers';
import { HopsController } from './controllers/hops/hops.controller';
import { YeastsController } from './controllers/yeasts/yeasts.controller';

@Module({
  controllers: [GrainsController, HopsController, YeastsController],
  providers: [
    DataPortalService,
    ...databaseProviders,
  ],
})
export class ApiV1Module {}

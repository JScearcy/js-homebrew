import { Module } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { ApiV1Module } from '../api-v1/api-v1.module';
import { SpaModule } from '../spa/spa.module';

const routes: Routes = [
  { path: '/api/v1', module: ApiV1Module },
  { path: '/', module: SpaModule },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    ApiV1Module,
    SpaModule,
  ],
})
export class AppModule {}

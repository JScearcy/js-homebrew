import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { Routes, RouterModule } from 'nest-router';
import { ApiV1Module } from '../api-v1/api-v1.module';
import { SpaModule } from '../spa/spa.module';
import { cors } from '../utilities/cors-middleware/cors.middleware';

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
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(cors).forRoutes('/api/v1');
    }
}

import * as express from 'express';
import { NestFactoryStatic } from '@nestjs/core/nest-factory';
import * as cors from 'cors';
import { ApiV1Module } from './api-v1/api-v1.module';

declare const module: any;
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const server = express();
  const apiV1Factory = new NestFactoryStatic();
  const apiV1 = await apiV1Factory.create(ApiV1Module, server);
  apiV1.setGlobalPrefix('/api/v1');
  apiV1.use(cors());
  await apiV1.init();

  server.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => apiV1.close());
  }
}
bootstrap();

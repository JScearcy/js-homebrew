import { NestFactory } from '@nestjs/core/nest-factory';
import * as path from 'path';

import { AppModule } from './app/app.module';
import { FastifyAdapter } from '@nestjs/core/adapters/fastify-adapter';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new FastifyAdapter());
    app.useStaticAssets({
        root: path.resolve(__dirname + '/../dist/js-homebrew-recipe-client'),
    });

    app.listen(PORT);
}
bootstrap();

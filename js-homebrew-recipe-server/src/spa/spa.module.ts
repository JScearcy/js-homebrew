import { Module } from '@nestjs/common';
import { SpaController } from './components/spa/spa.controller';

@Module({
  controllers: [SpaController],
})
export class SpaModule {}

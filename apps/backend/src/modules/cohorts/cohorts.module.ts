import { Module } from '@nestjs/common';
import { CohortsController } from './cohorts.controller';
import { CohortsService } from './cohorts.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
  controllers: [CohortsController],
  providers: [CohortsService, PrismaService],
})
export class CohortsModule {}

import { Module } from '@nestjs/common';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { PrismaService } from '../../shared/prisma.service';

@Module({
  controllers: [SubmissionsController],
  providers: [SubmissionsService, PrismaService],
})
export class SubmissionsModule {}

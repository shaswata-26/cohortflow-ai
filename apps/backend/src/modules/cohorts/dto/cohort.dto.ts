import { ApiProperty } from '@nestjs/swagger';
import { CohortStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateCohortDto {
  @ApiProperty({ example: 'MERN + Next.js Jan 2026' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  courseId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  mentorId?: string;

  @ApiProperty({ example: '2026-01-10' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-07-10' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: CohortStatus, required: false })
  @IsOptional()
  @IsEnum(CohortStatus)
  status?: CohortStatus;
}

export class UpdateCohortDto extends CreateCohortDto {}

export class AddStudentToCohortDto {
  @ApiProperty()
  @IsString()
  studentId: string;
}

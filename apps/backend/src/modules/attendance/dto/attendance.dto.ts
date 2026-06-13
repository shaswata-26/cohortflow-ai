import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '@prisma/client';
import { IsArray, IsDateString, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AttendanceRecordDto {
  @ApiProperty()
  @IsString()
  studentId: string;

  @ApiProperty({ enum: AttendanceStatus })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note?: string;
}

export class MarkAttendanceDto {
  @ApiProperty()
  @IsString()
  cohortId: string;

  @ApiProperty({ example: '2026-01-25' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: [AttendanceRecordDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}

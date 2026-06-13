import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'Build a React Counter App' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Use useState and create a reusable component.' })
  @IsString()
  instructions: string;

  @ApiProperty({ example: '2026-02-01' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({ example: 100 })
  @IsInt()
  @Min(1)
  maxMarks: number;

  @ApiProperty()
  @IsString()
  cohortId: string;
}

export class UpdateAssignmentDto extends CreateAssignmentDto {}

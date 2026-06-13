import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty()
  @IsString()
  assignmentId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  answerText?: string;
}

export class ReviewSubmissionDto {
  @ApiProperty({ example: 85 })
  @IsInt()
  @Min(0)
  @Max(100)
  marks: number;

  @ApiProperty({ example: 'Good logic, improve component naming.' })
  @IsString()
  feedback: string;
}

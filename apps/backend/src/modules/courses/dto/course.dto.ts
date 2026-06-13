import { ApiProperty } from '@nestjs/swagger';
import { CourseStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Full Stack Web Development' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'full-stack-web-development' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Learn frontend, backend and deployment.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Web Development' })
  @IsString()
  category: string;

  @ApiProperty({ example: '24 weeks' })
  @IsString()
  duration: string;

  @ApiProperty({ enum: CourseStatus, required: false })
  @IsOptional()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class UpdateCourseDto extends CreateCourseDto {}

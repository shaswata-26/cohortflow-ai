import { Body, Controller, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, AuthUser } from '../../shared/decorators/current-user.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { CreateSubmissionDto, ReviewSubmissionDto } from './dto/submission.dto';
import { SubmissionsService } from './submissions.service';

@ApiBearerAuth()
@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  findAll() {
    return this.submissionsService.findAll();
  }

  @Roles(Role.STUDENT)
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        assignmentId: { type: 'string' },
        answerText: { type: 'string' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.UPLOAD_DIR || 'uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  submit(
    @Body() dto: CreateSubmissionDto,
    @UploadedFile() file: Express.Multer.File | undefined,
    @CurrentUser() user: AuthUser,
  ) {
    const fileUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.submissionsService.submit(dto, fileUrl, user);
  }

  @Roles(Role.MENTOR, Role.ADMIN)
  @Patch(':id/review')
  review(@Param('id') id: string, @Body() dto: ReviewSubmissionDto) {
    return this.submissionsService.review(id, dto);
  }
}

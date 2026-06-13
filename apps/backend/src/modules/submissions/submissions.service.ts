import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { AuthUser } from '../../shared/decorators/current-user.decorator';
import { CreateSubmissionDto, ReviewSubmissionDto } from './dto/submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.submission.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        assignment: true,
        student: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async submit(dto: CreateSubmissionDto, fileUrl: string | undefined, user: AuthUser) {
    return this.prisma.submission.upsert({
      where: { assignmentId_studentId: { assignmentId: dto.assignmentId, studentId: user.sub } },
      update: {
        answerText: dto.answerText,
        fileUrl,
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
      create: {
        assignmentId: dto.assignmentId,
        studentId: user.sub,
        answerText: dto.answerText,
        fileUrl,
      },
    });
  }

  async review(id: string, dto: ReviewSubmissionDto) {
    const submission = await this.prisma.submission.findUnique({ where: { id } });
    if (!submission) throw new NotFoundException('Submission not found');

    return this.prisma.submission.update({
      where: { id },
      data: {
        marks: dto.marks,
        feedback: dto.feedback,
        status: 'REVIEWED',
        reviewedAt: new Date(),
      },
    });
  }
}

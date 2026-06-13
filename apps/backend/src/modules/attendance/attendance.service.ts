import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { MarkAttendanceDto } from './dto/attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async mark(dto: MarkAttendanceDto) {
    const date = new Date(dto.date);
    const operations = dto.records.map((record) =>
      this.prisma.attendance.upsert({
        where: {
          cohortId_studentId_date: {
            cohortId: dto.cohortId,
            studentId: record.studentId,
            date,
          },
        },
        update: { status: record.status, note: record.note },
        create: {
          cohortId: dto.cohortId,
          studentId: record.studentId,
          date,
          status: record.status,
          note: record.note,
        },
      }),
    );
    return this.prisma.$transaction(operations);
  }

  findByCohort(cohortId: string) {
    return this.prisma.attendance.findMany({
      where: { cohortId },
      include: { student: { select: { id: true, name: true, email: true } } },
      orderBy: { date: 'desc' },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { AddStudentToCohortDto, CreateCohortDto, UpdateCohortDto } from './dto/cohort.dto';

@Injectable()
export class CohortsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.cohort.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        course: true,
        mentor: { select: { id: true, name: true, email: true } },
        _count: { select: { students: true, lessons: true, assignments: true } },
      },
    });
  }

  async findOne(id: string) {
    const cohort = await this.prisma.cohort.findUnique({
      where: { id },
      include: {
        course: true,
        mentor: { select: { id: true, name: true, email: true } },
        students: { include: { student: { select: { id: true, name: true, email: true } } } },
        lessons: true,
        assignments: true,
      },
    });
    if (!cohort) throw new NotFoundException('Cohort not found');
    return cohort;
  }

  create(dto: CreateCohortDto) {
    return this.prisma.cohort.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async update(id: string, dto: UpdateCohortDto) {
    await this.findOne(id);
    return this.prisma.cohort.update({
      where: { id },
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async addStudent(id: string, dto: AddStudentToCohortDto) {
    await this.findOne(id);
    return this.prisma.cohortStudent.upsert({
      where: { cohortId_studentId: { cohortId: id, studentId: dto.studentId } },
      update: {},
      create: { cohortId: id, studentId: dto.studentId },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.cohort.delete({ where: { id } });
  }
}

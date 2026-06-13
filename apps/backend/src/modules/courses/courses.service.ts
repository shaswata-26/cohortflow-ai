import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { cohorts: true } } },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { cohorts: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  create(dto: CreateCourseDto) {
    return this.prisma.course.create({ data: dto });
  }

  async update(id: string, dto: UpdateCourseDto) {
    await this.findOne(id);
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }
}

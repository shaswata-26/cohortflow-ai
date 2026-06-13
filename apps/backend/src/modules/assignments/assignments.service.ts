import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma.service';
import { AuthUser } from '../../shared/decorators/current-user.decorator';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto/assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.assignment.findMany({
      orderBy: { createdAt: 'desc' },
      include: { cohort: { include: { course: true } }, _count: { select: { submissions: true } } },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: { submissions: { include: { student: { select: { id: true, name: true, email: true } } } } },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  create(dto: CreateAssignmentDto, user: AuthUser) {
    return this.prisma.assignment.create({
      data: {
        ...dto,
        dueDate: new Date(dto.dueDate),
        createdById: user.sub,
      },
    });
  }

  async update(id: string, dto: UpdateAssignmentDto) {
    await this.findOne(id);
    return this.prisma.assignment.update({
      where: { id },
      data: { ...dto, dueDate: new Date(dto.dueDate) },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.assignment.delete({ where: { id } });
  }
}

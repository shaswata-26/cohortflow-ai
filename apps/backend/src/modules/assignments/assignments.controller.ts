import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CurrentUser, AuthUser } from '../../shared/decorators/current-user.decorator';
import { Roles } from '../../shared/decorators/roles.decorator';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto/assignment.dto';
import { AssignmentsService } from './assignments.service';

@ApiBearerAuth()
@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Roles(Role.MENTOR, Role.ADMIN)
  @Post()
  create(@Body() dto: CreateAssignmentDto, @CurrentUser() user: AuthUser) {
    return this.assignmentsService.create(dto, user);
  }

  @Roles(Role.MENTOR, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, dto);
  }

  @Roles(Role.MENTOR, Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}

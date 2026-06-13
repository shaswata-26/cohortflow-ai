import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorator';
import { AddStudentToCohortDto, CreateCohortDto, UpdateCohortDto } from './dto/cohort.dto';
import { CohortsService } from './cohorts.service';

@ApiBearerAuth()
@ApiTags('Cohorts')
@Controller('cohorts')
export class CohortsController {
  constructor(private readonly cohortsService: CohortsService) {}

  @Get()
  findAll() {
    return this.cohortsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cohortsService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateCohortDto) {
    return this.cohortsService.create(dto);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCohortDto) {
    return this.cohortsService.update(id, dto);
  }

  @Roles(Role.ADMIN)
  @Post(':id/students')
  addStudent(@Param('id') id: string, @Body() dto: AddStudentToCohortDto) {
    return this.cohortsService.addStudent(id, dto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cohortsService.remove(id);
  }
}

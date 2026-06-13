import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Roles } from '../../shared/decorators/roles.decorator';
import { MarkAttendanceDto } from './dto/attendance.dto';
import { AttendanceService } from './attendance.service';

@ApiBearerAuth()
@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Roles(Role.MENTOR, Role.ADMIN)
  @Post('mark')
  mark(@Body() dto: MarkAttendanceDto) {
    return this.attendanceService.mark(dto);
  }

  @Get('cohort/:cohortId')
  findByCohort(@Param('cohortId') cohortId: string) {
    return this.attendanceService.findByCohort(cohortId);
  }
}

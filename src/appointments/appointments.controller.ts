import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsQueryDto } from './dto/appointments-query.dto';
import { ApiDocCreateAppointment, ApiDocGetAppointments, ApiDocGetAvailableHours, ApiDocGetOneAppointment, ApiDocUpdateAppointment } from './decorators/appointments.decorators';
import { AppointmentResponseDto } from './dto/appointment-response.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { AvailableAppointmentsDto } from './dto/available-appointments-query.dto';
import { AvailabilityResponse } from './dto/availability-response.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';

@ApiTags('Appointments')
@ApiExtraModels(AppointmentResponseDto, AvailabilityResponse)
@Controller('appointments')
@CatchErrors()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @ApiDocGetAvailableHours(AvailabilityResponse)
  @Get('available')
  getAvailableTime(@Query() query: AvailableAppointmentsDto) {
    return this.appointmentsService.getAvailableAppointments(query);
  }

  @ApiDocCreateAppointment(AppointmentResponseDto)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiDocGetAppointments(AppointmentResponseDto)
  @Get()
  findAll(@Query() query: AppointmentsQueryDto) {
    return this.appointmentsService.findAllOrFilter(query);
  }

  @ApiDocGetOneAppointment(AppointmentResponseDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiDocUpdateAppointment(AppointmentResponseDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }
}

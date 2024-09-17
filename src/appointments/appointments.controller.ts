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
import { User } from 'src/common/decorators/user-payload-param.decorator';
import { JwtPayload } from '../common/interfaces/index';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';


@ApiTags('Appointments')
@ApiExtraModels(AppointmentResponseDto, AvailabilityResponse)
@PathName(Path.APPOINTMENTS)
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
  @VerifyAuthService(Leave.CAN_CREATE)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto, @User() user: JwtPayload ) {
    console.log(user);
    
    return this.appointmentsService.create(createAppointmentDto, user.email);
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

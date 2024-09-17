import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocCreatePatient, ApiDocDeletePatient, ApiDocGetOnePatient, ApiDocGetPatients, ApiDocUpdatePatient } from './decorators/patients.decorators';
import { Patient } from './entities/patient.entity';
import { PatientQueryDto } from './dto/patient-query.dto';
import { CatchErrors } from 'src/common/decorators/catch-errors.decorator';
import { PathName, VerifyAuthService } from 'src/common/decorators/auth.decorator';
import { Leave, Path } from 'src/common/enums';

@ApiTags('Patients')
@PathName(Path.PATIENTS)
@Controller('patients')
@CatchErrors()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiDocCreatePatient(CreatePatientDto)
  @VerifyAuthService(Leave.CAN_CREATE)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiDocGetPatients(CreatePatientDto)
  @VerifyAuthService(Leave.CAN_READ_OWN)
  @Get()
  findWithQueryParams(@Query() query: PatientQueryDto) {
    return this.patientsService.findWithQueryParams(query);
  }

  @ApiDocGetOnePatient(CreatePatientDto)
  @VerifyAuthService(Leave.CAN_READ_OWN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiDocUpdatePatient(CreatePatientDto)
  @VerifyAuthService(Leave.CAN_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }
  
  @ApiDocDeletePatient(CreatePatientDto)
  @VerifyAuthService(Leave.CAN_DELETE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}

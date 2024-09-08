import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocCreatePatient, ApiDocDeletePatient, ApiDocGetOnePatient, ApiDocGetPatients, ApiDocUpdatePatient } from './decorators/patients.decorators';
import { Patient } from './entities/patient.entity';
import { PatientQueryDto } from './dto/patient-query.dto';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiDocCreatePatient(CreatePatientDto)
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }
  @ApiDocGetPatients(CreatePatientDto)
  @Get()
  findWithQueryParams(@Query() query: PatientQueryDto) {
    return this.patientsService.findWithQueryParams(query);
  }

  @ApiDocGetOnePatient(CreatePatientDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiDocUpdatePatient(CreatePatientDto)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiDocDeletePatient(CreatePatientDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}

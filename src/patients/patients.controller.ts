import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocCreatePatient, ApiDocGetOnePatient, ApiDocGetPatients, ApiDocGetTutorPatient } from './decorators/patients.decorators';
import { Patient } from './entities/patient.entity';

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
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiDocGetOnePatient(CreatePatientDto)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiDocGetTutorPatient(CreatePatientDto)
  @Get('tutor/:id')
  findByTutorId(@Param('id') id: string) {
    return this.patientsService.findByTutorId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}

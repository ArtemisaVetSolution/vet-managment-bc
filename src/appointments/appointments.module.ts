import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Service } from './entities/service.entity';
import { Collaborator } from './entities/collaborator.entity';
import { PatientsService } from 'src/patients/patients.service';
import { Tutor } from 'src/tutors/entities/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Service, Collaborator, Tutor])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PatientsService],
})
export class AppointmentsModule {}

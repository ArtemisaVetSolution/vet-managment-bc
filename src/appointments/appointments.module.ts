import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { PatientsService } from 'src/patients/patients.service';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Service, Collaborator, Tutor])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PatientsService],
})
export class AppointmentsModule {}

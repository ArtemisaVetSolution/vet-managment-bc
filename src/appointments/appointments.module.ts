import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PatientsService } from 'src/patients/patients.service';

import { Service } from 'src/services/entities/service.entity';
import { Collaborator } from 'src/collaborators/entities/collaborator.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { MailsenderserviceModule } from 'src/mail-sender/mail-sender-service.module';
import { CommonModule } from 'src/common/common.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Patient, Service, Collaborator, Tutor]),
    MailsenderserviceModule,
    CommonModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, PatientsService],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}

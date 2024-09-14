import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
// import { AppointmentsService } from 'src/appointments/appointments.service';
// import { TutorsService } from 'src/tutors/tutors.service';
// import { PatientsService } from 'src/patients/patients.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { TutorsModule } from 'src/tutors/tutors.module';
import { PatientsModule } from 'src/patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Module({
  // imports: [AppointmentsModule, TutorsModule, PatientsModule, TypeOrmModule.forFeature([Payment])],
  // controllers: [PaymentsController],
  // providers: [PaymentsService],
})
export class PaymentsModule {}

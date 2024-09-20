import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { CommonModule } from 'src/common/common.module';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Appointment, Patient, Tutor]), CommonModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, LoggerService, ExceptionHandlerService],
})
export class PaymentsModule {}

import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { LoggerService } from 'src/common/services';
import { ExceptionHandlerService } from 'src/common/services/exception-handler.service';


@Module({
  imports: [TypeOrmModule.forFeature([Patient, Tutor])],
  controllers: [PatientsController],
  providers: [PatientsService, LoggerService, ExceptionHandlerService],
  exports: [PatientsService],
})
export class PatientsModule {}

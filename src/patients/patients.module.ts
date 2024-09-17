import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Tutor } from 'src/tutors/entities/tutor.entity';
import { CommonModule } from 'src/common/common.module';


@Module({
  imports: [TypeOrmModule.forFeature([Patient, Tutor]), CommonModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
